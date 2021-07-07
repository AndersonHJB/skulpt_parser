import token
from typing import Any, Dict, Optional, IO, Text, Tuple
from io import StringIO
from pegen.grammar import (
    Cut,
    GrammarVisitor,
    NameLeaf,
    StringLeaf,
    Rhs,
    NamedItem,
    Lookahead,
    PositiveLookahead,
    NegativeLookahead,
    Opt,
    Repeat0,
    Repeat1,
    Gather,
    Group,
    Rule,
    Alt,
)
from pegen import grammar
from pegen.parser_generator import ParserGenerator
import ast
import re

MODULE_PREFIX = """\
// @generated by pegen from {filename}
// deno-lint-ignore-file camelcase no-unused-vars

import type {{ mod, expr, stmt, alias, withitem, excepthandler, arguments_, arg, comprehension, Name, Call, ClassDef, FunctionDef, AsyncFunctionDef, Starred }} from "../ast/astnodes.ts";
import type {{ Tokenizer }} from "../tokenize/Tokenizer.ts";
import type {{ TokenInfo }} from "../tokenize/tokenize.ts";
import * as astnodes from "../ast/astnodes.ts";
import {{ pyNone, pyTrue, pyFalse, pyEllipsis }} from "../ast/constants.ts";
import {{ StartRule, CmpopExprPair, KeyValuePair, KeywordToken, KeywordOrStarred, NameDefaultPair, SlashWithDefault, StarEtc, AugOperator, STAR_TARGETS, DEL_TARGETS, FOR_TARGETS  }} from "./pegen_types.ts";
import {{ pegen }} from "./pegen_proxy.ts";
import {{ pySyntaxError, pyIndentationError }} from "../ast/errors.ts";

import {{ memoize, memoizeLeftRec, logger, Parser}} from "./parser.ts";

/** @todo */
function CHECK<A>(...args: A[]) {{
    return args[0];
}}

/** @todo */
function CHECK_VERSION<R>(i: number, msg: string, ret: R) {{
    return ret;
}}

/** @todo */
function CHECK_NULL_ALLOWED<R>(result: R) {{
    return result;
}}

"""

MODULE_SUFFIX = """

"""

# todo mangle names like await - taken from https://www.w3schools.com/js/js_reserved.asp
reserved = {
    "arguments",
    "await",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "eval",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "implements",
    "import",
    "in",
    "instanceof",
    "interface",
    "let",
    "new",
    "null",
    "package",
    "private",
    "protected",
    "public",
    "return",
    "static",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
}


def fix_reserved(name):
    return name + "_" if name in reserved else name


def clean_type(type):
    # because grammar doesn't allow certain characters
    return type.replace("_UNION_", "|").replace("_ARRAY", "[]").replace("_LT_", "<").replace("_GT_", ">")


def clean_action(action):
    if not action.startswith("RAISE"):
        return action
    if action.startswith("RAISE_SYNTAX_ERROR ("):
        return action.replace("RAISE_SYNTAX_ERROR (", "this.raise_error ( pySyntaxError,")
    elif action.startswith("RAISE_SYNTAX_ERROR_KNOWN_LOCATION ( a"):
        return action.replace(
            "RAISE_SYNTAX_ERROR_KNOWN_LOCATION ( a",
            "this.raise_error_known_location ( pySyntaxError, a.lineno, a.col_offset + 1",
        )
    elif action.startswith("RAISE_INDENTATION_ERROR ("):
        return action.replace("RAISE_INDENTATION_ERROR (", "this.raise_error ( pyIndentationError,")
    elif action.startswith("RAISE_SYNTAX_ERROR_INVALID_TARGET"):
        return action.replace("RAISE_SYNTAX_ERROR_INVALID_TARGET (", "this.raise_error_invalid_target (")
    return action


non_exact_tok = (
    "AWAIT",
    "OP",
    "ERRORTOKEN",
    "TYPE_IGNORE",
    "TYPE_COMMENT",
    "NL",
    "NUMBER",
    "STRING",
    "NAME",
    "ASYNC",
    "COMMENT",
    "ENCODING",
    "ENDMARKER",
    "NEWLINE",
    "INDENT",
    "DEDENT",
)


class PythonCallMakerVisitor(GrammarVisitor):
    def __init__(self, parser_generator: ParserGenerator):
        self.gen = parser_generator
        self.cache: Dict[Any, Any] = {}
        self.keyword_cache: Dict[Any, Any] = {}

    def visit_NameLeaf(self, node: NameLeaf) -> Tuple[Optional[str], str]:
        name = node.value
        if name in ("NAME", "NUMBER", "STRING", "OP"):
            name = name.lower()
            return name, f"this.{name}()"
        if name in non_exact_tok:
            return name.lower(), f"this.expect({name!r})"
        return name, f"this.{name}()"

    def keyword_helper(self, keyword):
        if keyword not in self.keyword_cache:
            self.keyword_cache[keyword] = self.gen.keyword_type()

        return "keyword", f"this.expect({keyword!r})"

    def visit_StringLeaf(self, node: StringLeaf) -> Tuple[str, str]:
        val = ast.literal_eval(node.value)
        if re.match(r"[a-zA-Z_]\w*\Z", val):  # This is a keyword
            if node.value.endswith("'"):
                return self.keyword_helper(val)
            else:
                return self.soft_keyword_helper(node.value)
        else:
            # @TODO: figure out what exact_tokens is
            # assert val in self.exact_tokens, f"{node.value} is not a known literal"
            # type = self.exact_tokens[val]
            # return FunctionCall(
            #     assigned_variable="_literal",
            #     function=f"_PyPegen_expect_token",
            #     arguments=["p", type],
            #     nodetype=NodeTypes.GENERIC_TOKEN,
            #     return_type="Token *",
            #     comment=f"token='{val}'",
            # )
            return "literal", f"this.expect({node.value})"

    def visit_Rhs(self, node: Rhs) -> Tuple[Optional[str], str]:
        if node in self.cache:
            return self.cache[node]
        if len(node.alts) == 1 and len(node.alts[0].items) == 1:
            self.cache[node] = self.visit(node.alts[0].items[0])
        else:
            name = self.gen.name_node(node)
            self.cache[node] = name, f"this.{name}()"
        return self.cache[node]

    def visit_NamedItem(self, node: NamedItem) -> Tuple[Optional[str], str]:
        name, call = self.visit(node.item)
        if node.name:
            name = node.name
        return name, call

    def lookahead_call_helper(self, node: Lookahead) -> Tuple[str, str]:
        name, call = self.visit(node.node)
        head, tail = call.split("(", 1)
        assert tail[-1] == ")"
        tail = tail[:-1]
        return head, tail

    def visit_PositiveLookahead(self, node: PositiveLookahead) -> Tuple[None, str]:
        head, tail = self.lookahead_call_helper(node)
        return None, f"this.positive_lookahead({head}, {tail})"

    def visit_NegativeLookahead(self, node: NegativeLookahead) -> Tuple[None, str]:
        head, tail = self.lookahead_call_helper(node)
        return None, f"this.negative_lookahead({head}, {tail})"

    def visit_Opt(self, node: Opt) -> Tuple[str, str]:
        name, call = self.visit(node.node)
        # Note trailing comma (the call may already have one comma
        # at the end, for example when rules have both repeat0 and optional
        # markers, e.g: [rule*])
        if call.endswith(","):
            return "opt", call
        else:
            return "opt", f"{call}, 1"

    def visit_Repeat0(self, node: Repeat0) -> Tuple[str, str]:
        if node in self.cache:
            return self.cache[node]
        name = self.gen.name_loop(node.node, False)
        self.cache[node] = name, f"this.{name}()"  # Also a trailing comma!
        # in python they end with a comma like in visit_Opt
        # But I don't think skulpt needs one since arrays are truthy
        return self.cache[node]

    def visit_Repeat1(self, node: Repeat1) -> Tuple[str, str]:
        if node in self.cache:
            return self.cache[node]
        name = self.gen.name_loop(node.node, True)
        self.cache[node] = name, f"this.{name}()"  # But no trailing comma here!
        return self.cache[node]

    def visit_Gather(self, node: Gather) -> Tuple[str, str]:
        if node in self.cache:
            return self.cache[node]
        name = self.gen.name_gather(node)
        self.cache[node] = name, f"this.{name}()"  # No trailing comma here either!
        return self.cache[node]

    def visit_Group(self, node: Group) -> Tuple[Optional[str], str]:
        return self.visit(node.rhs)

    def visit_Cut(self, node: Cut) -> Tuple[str, str]:
        self.gen.has_cut = True
        self.gen.has_local_cut = True
        return "cut", "true"


class PythonParserGenerator(ParserGenerator, GrammarVisitor):
    def __init__(
        self,
        grammar: grammar.Grammar,
        file: Optional[IO[Text]],
        tokens: Dict[int, str] = token.tok_name,
    ):
        super().__init__(grammar, tokens, file)
        self.suffix = MODULE_SUFFIX
        self.callmakervisitor = PythonCallMakerVisitor(self)

    def generate(self, filename: str) -> None:
        header = self.grammar.metas.get("header", MODULE_PREFIX)
        if header is not None:
            self.print(header.rstrip("\n").format(filename=filename))
        subheader = self.grammar.metas.get("subheader", "")
        if subheader:
            self.print(subheader.format(filename=filename))
        self.print(
            """
type ParseResult<T> = T extends typeof StartRule.FSTRING_INPUT | typeof StartRule.EVAL_INPUT ? expr : mod;

export class GeneratedParser<T extends StartRule = typeof StartRule.FILE_INPUT> extends Parser {
    start_rule: StartRule;
    flags: number;

    constructor(T: Tokenizer, start_rule: T = StartRule.FILE_INPUT as T, flags = 0) {
        super(T);
        this.start_rule = start_rule;
        this.flags = flags; // unused
    }

    parse(): ParseResult<T> {
        let ret = null;
        switch (this.start_rule) {
            case StartRule.FILE_INPUT:
                ret = this.file();
                break;
            case StartRule.SINGLE_INPUT:
                ret = this.interactive();
                break;
            case StartRule.EVAL_INPUT:
                ret = this.eval();
                break;
            case StartRule.FUNC_TYPE_INPUT:
                ret = this.func_type();
                break;
            case StartRule.FSTRING_INPUT:
                ret = this.fstring();
                break;
        }
        if (ret === null) {
            return this.make_syntax_error();
        }
        return ret as ParseResult<T>;
    }
"""
        )

        while self.todo:
            for rulename, rule in list(self.todo.items()):
                del self.todo[rulename]
                self.print()
                with self.indent():
                    self.visit(rule)
        self.print("}")
        self.print()
        self.print("GeneratedParser.prototype.keywords = new Map([")
        with self.indent():
            for name, token_type in self.callmakervisitor.keyword_cache.items():
                self.print(f'["{name}", new KeywordToken("{name}", {token_type})],')
        self.print("]);")
        self.print()

        self.print(self.suffix)

        # trailer = self.grammar.metas.get("trailer", "")
        # if trailer is not None:
        #     self.print(trailer.rstrip("\n"))

    def _set_up_token_metadata_extraction(self) -> None:
        self.print("const EXTRA = this.extra(mark)")

    def visit_Rule(self, node: Rule) -> None:
        is_loop = node.is_loop()
        is_gather = node.is_gather()
        rhs = node.flatten()
        if node.left_recursive:
            if node.leader:
                self.print("@memoizeLeftRec")
            else:
                # Non-leader rules in a cycle are not memoized,
                # but they must still be logged.
                self.print("@logger")
        else:
            self.print("@memoize")
        node_type = clean_type(node.type or "")
        node_type = node_type and f": {node_type} | null"  # let typescript infer the type rather than using any
        self.print(f"{node.name}(){node_type} {{")  # -> Optional[{node_type}] {{")
        with self.indent():
            self.print(f"// {node.name}: {rhs}")
            if node.nullable:
                self.print(f"// # nullable={node.nullable}")
            self.args = set()  # {"mark"}
            self.has_cut = False
            self.has_local_cut = False
            orig_file, tmp_file = (
                self.file,
                StringIO(),
            )  # a bit of a hack to get state the args at the top of the file
            self.file = tmp_file

            self.visit(rhs, is_loop=is_loop, is_gather=is_gather)
            self.file = orig_file

            self.print(f"let {', '.join(sorted(self.args))};")
            if self.has_cut:
                self.print("let cut = false;")
            if is_loop:
                self.print("const children = [];")
            self.print(f"{'let' if is_loop else 'const'} mark = this.mark();")

            self.print(tmp_file.getvalue())
            tmp_file.close()
            if is_loop:
                if node.name.startswith("_loop0"):
                    self.print("return children;")
                else:
                    self.print("return children.length ? children : null;")
            else:
                self.print("return null;")
        self.print("}")

    def visit_NamedItem(self, node: NamedItem) -> None:
        name, call = self.callmakervisitor.visit(node.item)
        if node.name:
            name = node.name
        if not name:
            self.print(call)
        else:
            if name != "cut":
                name = self.dedupe(name)
                name = fix_reserved(name)
                self.args.add(name)
            self.print(f"({name} = {call})")

    def visit_Rhs(self, node: Rhs, is_loop: bool = False, is_gather: bool = False) -> None:
        if is_loop:
            assert len(node.alts) == 1
        for alt in node.alts:
            self.visit(alt, is_loop=is_loop, is_gather=is_gather)

    def visit_Alt(self, node: Alt, is_loop: bool, is_gather: bool) -> None:
        with self.local_variable_context():
            if is_loop:
                self.print("while (")
            else:
                self.print("if (")
            with self.indent():
                first = True
                for item in node.items:
                    if first:
                        first = False
                    else:
                        self.print("&&")
                    self.visit(item)
                    if is_gather:
                        self.print("!== null")

            self.print(") {")
            with self.indent():
                action = node.action
                if action and "EXTRA" in action:
                    self._set_up_token_metadata_extraction()
                if not action:
                    if is_gather:
                        assert len(self.local_variable_names) == 2
                        action = f"[{self.local_variable_names[0]}, ...{self.local_variable_names[1]}]"
                    elif len(self.local_variable_names) == 1:
                        # @TODO is this correct?
                        action = self.local_variable_names[0]
                    else:
                        # @TODO is it ok to return an array here
                        action = f"[{', '.join(self.local_variable_names)}]"
                action = clean_action(action)
                if is_loop:
                    self.print(f"children.push({action});")
                    self.print("mark = this.mark();")
                else:
                    self.print(f"return {action};")
            self.print("}")
            self.print("this.reset(mark);")
            # Skip remaining alternatives if a cut was reached.
            if self.has_local_cut:
                self.print("if (cut) return null;")
                self.has_local_cut = False
