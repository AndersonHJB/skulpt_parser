/* File automatically generated by gen_asdl/__main__.py. */
/* module that holds all nodes */
// deno-lint-ignore-file camelcase

import { pyConstant } from "./constants.ts";

/** @todo should identifier be a python type? */
export type identifier = string;
export type constant = pyConstant;
export enum ASTKind {
    mod,
    Module,
    Interactive,
    Expression,
    FunctionType,
    stmt,
    FunctionDef,
    AsyncFunctionDef,
    ClassDef,
    Return,
    Delete,
    Assign,
    AugAssign,
    AnnAssign,
    For,
    AsyncFor,
    While,
    If,
    With,
    AsyncWith,
    Raise,
    Try,
    Assert,
    Import,
    ImportFrom,
    Global,
    Nonlocal,
    Expr,
    Pass,
    Break,
    Continue,
    Debugger,
    expr,
    BoolOp,
    NamedExpr,
    BinOp,
    UnaryOp,
    Lambda,
    IfExp,
    Dict,
    Set,
    ListComp,
    SetComp,
    DictComp,
    GeneratorExp,
    Await,
    Yield,
    YieldFrom,
    Compare,
    Call,
    FormattedValue,
    JoinedStr,
    Constant,
    Attribute,
    Subscript,
    Starred,
    Name,
    List,
    Tuple,
    Slice,
    expr_context,
    boolop,
    operator,
    unaryop,
    cmpop,
    comprehension,
    excepthandler,
    ExceptHandler,
    arguments_,
    arg,
    keyword,
    alias,
    withitem,
    type_ignore,
    TypeIgnore,
}
/** base class for all AST nodes */
export interface AST {
    _fields: string[];
    _attributes: string[];
    _enum: boolean;
    _kind: ASTKind;
    scopeId: number;
}

export class AST {
    static _name = "AST";
    get [Symbol.toStringTag]() {
        return (this.constructor as typeof AST)._name;
    }
}
AST.prototype._attributes = [];
AST.prototype._fields = [];
AST.prototype._enum = false;

export type Attrs = [number, number, number | null | undefined, number | null | undefined];
const _attrs = ["lineno", "col_offset", "end_lineno", "end_col_offset"];

/* ---------------------- */
/* constructors for nodes */
/* ---------------------- */

/* ----- expr_context ----- */
export class expr_context extends AST {
    static _name = "expr_context";
}
expr_context.prototype._enum = true;

export type expr_contextKind = typeof expr_context | typeof LoadType | typeof StoreType | typeof DelType;

export class LoadType extends expr_context {
    static _name = "Load";
}
export class StoreType extends expr_context {
    static _name = "Store";
}
export class DelType extends expr_context {
    static _name = "Del";
}
export const Load = new LoadType();
export const Store = new StoreType();
export const Del = new DelType();

/* ----- boolop ----- */
export class boolop extends AST {
    static _name = "boolop";
}
boolop.prototype._enum = true;

export type boolopKind = typeof boolop | typeof AndType | typeof OrType;

export class AndType extends boolop {
    static _name = "And";
}
export class OrType extends boolop {
    static _name = "Or";
}
export const And = new AndType();
export const Or = new OrType();

/* ----- operator ----- */
export class operator extends AST {
    static _name = "operator";
}
operator.prototype._enum = true;

export type operatorKind =
    | typeof operator
    | typeof AddType
    | typeof SubType
    | typeof MultType
    | typeof MatMultType
    | typeof DivType
    | typeof ModType
    | typeof PowType
    | typeof LShiftType
    | typeof RShiftType
    | typeof BitOrType
    | typeof BitXorType
    | typeof BitAndType
    | typeof FloorDivType;

export class AddType extends operator {
    static _name = "Add";
}
export class SubType extends operator {
    static _name = "Sub";
}
export class MultType extends operator {
    static _name = "Mult";
}
export class MatMultType extends operator {
    static _name = "MatMult";
}
export class DivType extends operator {
    static _name = "Div";
}
export class ModType extends operator {
    static _name = "Mod";
}
export class PowType extends operator {
    static _name = "Pow";
}
export class LShiftType extends operator {
    static _name = "LShift";
}
export class RShiftType extends operator {
    static _name = "RShift";
}
export class BitOrType extends operator {
    static _name = "BitOr";
}
export class BitXorType extends operator {
    static _name = "BitXor";
}
export class BitAndType extends operator {
    static _name = "BitAnd";
}
export class FloorDivType extends operator {
    static _name = "FloorDiv";
}
export const Add = new AddType();
export const Sub = new SubType();
export const Mult = new MultType();
export const MatMult = new MatMultType();
export const Div = new DivType();
export const Mod = new ModType();
export const Pow = new PowType();
export const LShift = new LShiftType();
export const RShift = new RShiftType();
export const BitOr = new BitOrType();
export const BitXor = new BitXorType();
export const BitAnd = new BitAndType();
export const FloorDiv = new FloorDivType();

/* ----- unaryop ----- */
export class unaryop extends AST {
    static _name = "unaryop";
}
unaryop.prototype._enum = true;

export type unaryopKind = typeof unaryop | typeof InvertType | typeof NotType | typeof UAddType | typeof USubType;

export class InvertType extends unaryop {
    static _name = "Invert";
}
export class NotType extends unaryop {
    static _name = "Not";
}
export class UAddType extends unaryop {
    static _name = "UAdd";
}
export class USubType extends unaryop {
    static _name = "USub";
}
export const Invert = new InvertType();
export const Not = new NotType();
export const UAdd = new UAddType();
export const USub = new USubType();

/* ----- cmpop ----- */
export class cmpop extends AST {
    static _name = "cmpop";
}
cmpop.prototype._enum = true;

export type cmpopKind =
    | typeof cmpop
    | typeof EqType
    | typeof NotEqType
    | typeof LtType
    | typeof LtEType
    | typeof GtType
    | typeof GtEType
    | typeof IsType
    | typeof IsNotType
    | typeof InType
    | typeof NotInType;

export class EqType extends cmpop {
    static _name = "Eq";
}
export class NotEqType extends cmpop {
    static _name = "NotEq";
}
export class LtType extends cmpop {
    static _name = "Lt";
}
export class LtEType extends cmpop {
    static _name = "LtE";
}
export class GtType extends cmpop {
    static _name = "Gt";
}
export class GtEType extends cmpop {
    static _name = "GtE";
}
export class IsType extends cmpop {
    static _name = "Is";
}
export class IsNotType extends cmpop {
    static _name = "IsNot";
}
export class InType extends cmpop {
    static _name = "In";
}
export class NotInType extends cmpop {
    static _name = "NotIn";
}
export const Eq = new EqType();
export const NotEq = new NotEqType();
export const Lt = new LtType();
export const LtE = new LtEType();
export const Gt = new GtType();
export const GtE = new GtEType();
export const Is = new IsType();
export const IsNot = new IsNotType();
export const In = new InType();
export const NotIn = new NotInType();

/* ----- mod ----- */
export class mod extends AST {
    static _name = "mod";
}

export type modKind = typeof mod | typeof Module | typeof Interactive | typeof Expression | typeof FunctionType;

export class Module extends mod {
    static _name = "Module";
    body: stmt[];
    type_ignores: type_ignore[];
    constructor(body: stmt[] | null, type_ignores: type_ignore[] | null) {
        super();
        this.body = body || [];
        this.type_ignores = type_ignores || [];
    }
}
Module.prototype._fields = ["body", "type_ignores"];
Module.prototype._kind = ASTKind.Module;

export class Interactive extends mod {
    static _name = "Interactive";
    body: stmt[];
    constructor(body: stmt[] | null) {
        super();
        this.body = body || [];
    }
}
Interactive.prototype._fields = ["body"];
Interactive.prototype._kind = ASTKind.Interactive;

export class Expression extends mod {
    static _name = "Expression";
    body: expr;
    constructor(body: expr) {
        super();
        this.body = body;
    }
}
Expression.prototype._fields = ["body"];
Expression.prototype._kind = ASTKind.Expression;

export class FunctionType extends mod {
    static _name = "FunctionType";
    argtypes: expr[];
    returns: expr;
    constructor(argtypes: expr[] | null, returns: expr) {
        super();
        this.argtypes = argtypes || [];
        this.returns = returns;
    }
}
FunctionType.prototype._fields = ["argtypes", "returns"];
FunctionType.prototype._kind = ASTKind.FunctionType;

/* ----- stmt ----- */
export class stmt extends AST {
    static _name = "stmt";
    lineno: number;
    col_offset: number;
    end_lineno?: number | null;
    end_col_offset?: number | null;
    constructor(lineno: number, col_offset: number, end_lineno?: number | null, end_col_offset?: number | null) {
        super();
        this.lineno = lineno;
        this.col_offset = col_offset;
        this.end_lineno = end_lineno;
        this.end_col_offset = end_col_offset;
    }
}
stmt.prototype._attributes = _attrs;

export type stmtKind =
    | typeof stmt
    | typeof FunctionDef
    | typeof AsyncFunctionDef
    | typeof ClassDef
    | typeof Return
    | typeof Delete
    | typeof Assign
    | typeof AugAssign
    | typeof AnnAssign
    | typeof For
    | typeof AsyncFor
    | typeof While
    | typeof If
    | typeof With
    | typeof AsyncWith
    | typeof Raise
    | typeof Try
    | typeof Assert
    | typeof Import
    | typeof ImportFrom
    | typeof Global
    | typeof Nonlocal
    | typeof Expr
    | typeof Pass
    | typeof Break
    | typeof Continue
    | typeof Debugger;

export class FunctionDef extends stmt {
    static _name = "FunctionDef";
    name: identifier;
    args: arguments_;
    body: stmt[];
    decorator_list: expr[];
    returns: expr | null;
    type_comment: string | null;
    constructor(
        name: identifier,
        args: arguments_,
        body: stmt[] | null,
        decorator_list: expr[] | null,
        returns: expr | null,
        type_comment: string | null,
        ...attrs: Attrs
    ) {
        super(...attrs);
        this.name = name;
        this.args = args;
        this.body = body || [];
        this.decorator_list = decorator_list || [];
        this.returns = returns;
        this.type_comment = type_comment;
    }
}
FunctionDef.prototype._fields = ["name", "args", "body", "decorator_list", "returns", "type_comment"];
FunctionDef.prototype._kind = ASTKind.FunctionDef;

export class AsyncFunctionDef extends stmt {
    static _name = "AsyncFunctionDef";
    name: identifier;
    args: arguments_;
    body: stmt[];
    decorator_list: expr[];
    returns: expr | null;
    type_comment: string | null;
    constructor(
        name: identifier,
        args: arguments_,
        body: stmt[] | null,
        decorator_list: expr[] | null,
        returns: expr | null,
        type_comment: string | null,
        ...attrs: Attrs
    ) {
        super(...attrs);
        this.name = name;
        this.args = args;
        this.body = body || [];
        this.decorator_list = decorator_list || [];
        this.returns = returns;
        this.type_comment = type_comment;
    }
}
AsyncFunctionDef.prototype._fields = ["name", "args", "body", "decorator_list", "returns", "type_comment"];
AsyncFunctionDef.prototype._kind = ASTKind.AsyncFunctionDef;

export class ClassDef extends stmt {
    static _name = "ClassDef";
    name: identifier;
    bases: expr[];
    keywords: keyword[];
    body: stmt[];
    decorator_list: expr[];
    constructor(
        name: identifier,
        bases: expr[] | null,
        keywords: keyword[] | null,
        body: stmt[] | null,
        decorator_list: expr[] | null,
        ...attrs: Attrs
    ) {
        super(...attrs);
        this.name = name;
        this.bases = bases || [];
        this.keywords = keywords || [];
        this.body = body || [];
        this.decorator_list = decorator_list || [];
    }
}
ClassDef.prototype._fields = ["name", "bases", "keywords", "body", "decorator_list"];
ClassDef.prototype._kind = ASTKind.ClassDef;

export class Return extends stmt {
    static _name = "Return";
    value: expr | null;
    constructor(value: expr | null, ...attrs: Attrs) {
        super(...attrs);
        this.value = value;
    }
}
Return.prototype._fields = ["value"];
Return.prototype._kind = ASTKind.Return;

export class Delete extends stmt {
    static _name = "Delete";
    targets: expr[];
    constructor(targets: expr[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.targets = targets || [];
    }
}
Delete.prototype._fields = ["targets"];
Delete.prototype._kind = ASTKind.Delete;

export class Assign extends stmt {
    static _name = "Assign";
    targets: expr[];
    value: expr;
    type_comment: string | null;
    constructor(targets: expr[] | null, value: expr, type_comment: string | null, ...attrs: Attrs) {
        super(...attrs);
        this.targets = targets || [];
        this.value = value;
        this.type_comment = type_comment;
    }
}
Assign.prototype._fields = ["targets", "value", "type_comment"];
Assign.prototype._kind = ASTKind.Assign;

export class AugAssign extends stmt {
    static _name = "AugAssign";
    target: expr;
    op: operator;
    value: expr;
    constructor(target: expr, op: operator, value: expr, ...attrs: Attrs) {
        super(...attrs);
        this.target = target;
        this.op = op;
        this.value = value;
    }
}
AugAssign.prototype._fields = ["target", "op", "value"];
AugAssign.prototype._kind = ASTKind.AugAssign;

export class AnnAssign extends stmt {
    static _name = "AnnAssign";
    target: expr;
    annotation: expr;
    value: expr | null;
    simple: number;
    constructor(target: expr, annotation: expr, value: expr | null, simple: number, ...attrs: Attrs) {
        super(...attrs);
        this.target = target;
        this.annotation = annotation;
        this.value = value;
        this.simple = simple;
    }
}
AnnAssign.prototype._fields = ["target", "annotation", "value", "simple"];
AnnAssign.prototype._kind = ASTKind.AnnAssign;

export class For extends stmt {
    static _name = "For";
    target: expr;
    iter: expr;
    body: stmt[];
    orelse: stmt[];
    type_comment: string | null;
    constructor(
        target: expr,
        iter: expr,
        body: stmt[] | null,
        orelse: stmt[] | null,
        type_comment: string | null,
        ...attrs: Attrs
    ) {
        super(...attrs);
        this.target = target;
        this.iter = iter;
        this.body = body || [];
        this.orelse = orelse || [];
        this.type_comment = type_comment;
    }
}
For.prototype._fields = ["target", "iter", "body", "orelse", "type_comment"];
For.prototype._kind = ASTKind.For;

export class AsyncFor extends stmt {
    static _name = "AsyncFor";
    target: expr;
    iter: expr;
    body: stmt[];
    orelse: stmt[];
    type_comment: string | null;
    constructor(
        target: expr,
        iter: expr,
        body: stmt[] | null,
        orelse: stmt[] | null,
        type_comment: string | null,
        ...attrs: Attrs
    ) {
        super(...attrs);
        this.target = target;
        this.iter = iter;
        this.body = body || [];
        this.orelse = orelse || [];
        this.type_comment = type_comment;
    }
}
AsyncFor.prototype._fields = ["target", "iter", "body", "orelse", "type_comment"];
AsyncFor.prototype._kind = ASTKind.AsyncFor;

export class While extends stmt {
    static _name = "While";
    test: expr;
    body: stmt[];
    orelse: stmt[];
    constructor(test: expr, body: stmt[] | null, orelse: stmt[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.test = test;
        this.body = body || [];
        this.orelse = orelse || [];
    }
}
While.prototype._fields = ["test", "body", "orelse"];
While.prototype._kind = ASTKind.While;

export class If extends stmt {
    static _name = "If";
    test: expr;
    body: stmt[];
    orelse: stmt[];
    constructor(test: expr, body: stmt[] | null, orelse: stmt[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.test = test;
        this.body = body || [];
        this.orelse = orelse || [];
    }
}
If.prototype._fields = ["test", "body", "orelse"];
If.prototype._kind = ASTKind.If;

export class With extends stmt {
    static _name = "With";
    items: withitem[];
    body: stmt[];
    type_comment: string | null;
    constructor(items: withitem[] | null, body: stmt[] | null, type_comment: string | null, ...attrs: Attrs) {
        super(...attrs);
        this.items = items || [];
        this.body = body || [];
        this.type_comment = type_comment;
    }
}
With.prototype._fields = ["items", "body", "type_comment"];
With.prototype._kind = ASTKind.With;

export class AsyncWith extends stmt {
    static _name = "AsyncWith";
    items: withitem[];
    body: stmt[];
    type_comment: string | null;
    constructor(items: withitem[] | null, body: stmt[] | null, type_comment: string | null, ...attrs: Attrs) {
        super(...attrs);
        this.items = items || [];
        this.body = body || [];
        this.type_comment = type_comment;
    }
}
AsyncWith.prototype._fields = ["items", "body", "type_comment"];
AsyncWith.prototype._kind = ASTKind.AsyncWith;

export class Raise extends stmt {
    static _name = "Raise";
    exc: expr | null;
    cause: expr | null;
    constructor(exc: expr | null, cause: expr | null, ...attrs: Attrs) {
        super(...attrs);
        this.exc = exc;
        this.cause = cause;
    }
}
Raise.prototype._fields = ["exc", "cause"];
Raise.prototype._kind = ASTKind.Raise;

export class Try extends stmt {
    static _name = "Try";
    body: stmt[];
    handlers: excepthandler[];
    orelse: stmt[];
    finalbody: stmt[];
    constructor(
        body: stmt[] | null,
        handlers: excepthandler[] | null,
        orelse: stmt[] | null,
        finalbody: stmt[] | null,
        ...attrs: Attrs
    ) {
        super(...attrs);
        this.body = body || [];
        this.handlers = handlers || [];
        this.orelse = orelse || [];
        this.finalbody = finalbody || [];
    }
}
Try.prototype._fields = ["body", "handlers", "orelse", "finalbody"];
Try.prototype._kind = ASTKind.Try;

export class Assert extends stmt {
    static _name = "Assert";
    test: expr;
    msg: expr | null;
    constructor(test: expr, msg: expr | null, ...attrs: Attrs) {
        super(...attrs);
        this.test = test;
        this.msg = msg;
    }
}
Assert.prototype._fields = ["test", "msg"];
Assert.prototype._kind = ASTKind.Assert;

export class Import extends stmt {
    static _name = "Import";
    names: alias[];
    constructor(names: alias[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.names = names || [];
    }
}
Import.prototype._fields = ["names"];
Import.prototype._kind = ASTKind.Import;

export class ImportFrom extends stmt {
    static _name = "ImportFrom";
    module: identifier | null;
    names: alias[];
    level: number | null;
    constructor(module: identifier | null, names: alias[] | null, level: number | null, ...attrs: Attrs) {
        super(...attrs);
        this.module = module;
        this.names = names || [];
        this.level = level;
    }
}
ImportFrom.prototype._fields = ["module", "names", "level"];
ImportFrom.prototype._kind = ASTKind.ImportFrom;

export class Global extends stmt {
    static _name = "Global";
    names: identifier[];
    constructor(names: identifier[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.names = names || [];
    }
}
Global.prototype._fields = ["names"];
Global.prototype._kind = ASTKind.Global;

export class Nonlocal extends stmt {
    static _name = "Nonlocal";
    names: identifier[];
    constructor(names: identifier[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.names = names || [];
    }
}
Nonlocal.prototype._fields = ["names"];
Nonlocal.prototype._kind = ASTKind.Nonlocal;

export class Expr extends stmt {
    static _name = "Expr";
    value: expr;
    constructor(value: expr, ...attrs: Attrs) {
        super(...attrs);
        this.value = value;
    }
}
Expr.prototype._fields = ["value"];
Expr.prototype._kind = ASTKind.Expr;

export class Pass extends stmt {
    static _name = "Pass";
    constructor(...attrs: Attrs) {
        super(...attrs);
    }
}
Pass.prototype._fields = [];
Pass.prototype._kind = ASTKind.Pass;

export class Break extends stmt {
    static _name = "Break";
    constructor(...attrs: Attrs) {
        super(...attrs);
    }
}
Break.prototype._fields = [];
Break.prototype._kind = ASTKind.Break;

export class Continue extends stmt {
    static _name = "Continue";
    constructor(...attrs: Attrs) {
        super(...attrs);
    }
}
Continue.prototype._fields = [];
Continue.prototype._kind = ASTKind.Continue;

export class Debugger extends stmt {
    static _name = "Debugger";
    constructor(...attrs: Attrs) {
        super(...attrs);
    }
}
Debugger.prototype._fields = [];
Debugger.prototype._kind = ASTKind.Debugger;

/* ----- expr ----- */
export class expr extends AST {
    static _name = "expr";
    lineno: number;
    col_offset: number;
    end_lineno?: number | null;
    end_col_offset?: number | null;
    constructor(lineno: number, col_offset: number, end_lineno?: number | null, end_col_offset?: number | null) {
        super();
        this.lineno = lineno;
        this.col_offset = col_offset;
        this.end_lineno = end_lineno;
        this.end_col_offset = end_col_offset;
    }
}
expr.prototype._attributes = _attrs;

export type exprKind =
    | typeof expr
    | typeof BoolOp
    | typeof NamedExpr
    | typeof BinOp
    | typeof UnaryOp
    | typeof Lambda
    | typeof IfExp
    | typeof Dict
    | typeof Set
    | typeof ListComp
    | typeof SetComp
    | typeof DictComp
    | typeof GeneratorExp
    | typeof Await
    | typeof Yield
    | typeof YieldFrom
    | typeof Compare
    | typeof Call
    | typeof FormattedValue
    | typeof JoinedStr
    | typeof Constant
    | typeof Attribute
    | typeof Subscript
    | typeof Starred
    | typeof Name
    | typeof List
    | typeof Tuple
    | typeof Slice;

export class BoolOp extends expr {
    static _name = "BoolOp";
    op: boolop;
    values: expr[];
    constructor(op: boolop, values: expr[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.op = op;
        this.values = values || [];
    }
}
BoolOp.prototype._fields = ["op", "values"];
BoolOp.prototype._kind = ASTKind.BoolOp;

export class NamedExpr extends expr {
    static _name = "NamedExpr";
    target: expr;
    value: expr;
    constructor(target: expr, value: expr, ...attrs: Attrs) {
        super(...attrs);
        this.target = target;
        this.value = value;
    }
}
NamedExpr.prototype._fields = ["target", "value"];
NamedExpr.prototype._kind = ASTKind.NamedExpr;

export class BinOp extends expr {
    static _name = "BinOp";
    left: expr;
    op: operator;
    right: expr;
    constructor(left: expr, op: operator, right: expr, ...attrs: Attrs) {
        super(...attrs);
        this.left = left;
        this.op = op;
        this.right = right;
    }
}
BinOp.prototype._fields = ["left", "op", "right"];
BinOp.prototype._kind = ASTKind.BinOp;

export class UnaryOp extends expr {
    static _name = "UnaryOp";
    op: unaryop;
    operand: expr;
    constructor(op: unaryop, operand: expr, ...attrs: Attrs) {
        super(...attrs);
        this.op = op;
        this.operand = operand;
    }
}
UnaryOp.prototype._fields = ["op", "operand"];
UnaryOp.prototype._kind = ASTKind.UnaryOp;

export class Lambda extends expr {
    static _name = "Lambda";
    args: arguments_;
    body: expr;
    constructor(args: arguments_, body: expr, ...attrs: Attrs) {
        super(...attrs);
        this.args = args;
        this.body = body;
    }
}
Lambda.prototype._fields = ["args", "body"];
Lambda.prototype._kind = ASTKind.Lambda;

export class IfExp extends expr {
    static _name = "IfExp";
    test: expr;
    body: expr;
    orelse: expr;
    constructor(test: expr, body: expr, orelse: expr, ...attrs: Attrs) {
        super(...attrs);
        this.test = test;
        this.body = body;
        this.orelse = orelse;
    }
}
IfExp.prototype._fields = ["test", "body", "orelse"];
IfExp.prototype._kind = ASTKind.IfExp;

export class Dict extends expr {
    static _name = "Dict";
    keys: (expr | null)[];
    values: expr[];
    constructor(keys: (expr | null)[] | null, values: expr[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.keys = keys || [];
        this.values = values || [];
    }
}
Dict.prototype._fields = ["keys", "values"];
Dict.prototype._kind = ASTKind.Dict;

export class Set extends expr {
    static _name = "Set";
    elts: expr[];
    constructor(elts: expr[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.elts = elts || [];
    }
}
Set.prototype._fields = ["elts"];
Set.prototype._kind = ASTKind.Set;

export class ListComp extends expr {
    static _name = "ListComp";
    elt: expr;
    generators: comprehension[];
    constructor(elt: expr, generators: comprehension[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.elt = elt;
        this.generators = generators || [];
    }
}
ListComp.prototype._fields = ["elt", "generators"];
ListComp.prototype._kind = ASTKind.ListComp;

export class SetComp extends expr {
    static _name = "SetComp";
    elt: expr;
    generators: comprehension[];
    constructor(elt: expr, generators: comprehension[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.elt = elt;
        this.generators = generators || [];
    }
}
SetComp.prototype._fields = ["elt", "generators"];
SetComp.prototype._kind = ASTKind.SetComp;

export class DictComp extends expr {
    static _name = "DictComp";
    key: expr;
    value: expr;
    generators: comprehension[];
    constructor(key: expr, value: expr, generators: comprehension[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.key = key;
        this.value = value;
        this.generators = generators || [];
    }
}
DictComp.prototype._fields = ["key", "value", "generators"];
DictComp.prototype._kind = ASTKind.DictComp;

export class GeneratorExp extends expr {
    static _name = "GeneratorExp";
    elt: expr;
    generators: comprehension[];
    constructor(elt: expr, generators: comprehension[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.elt = elt;
        this.generators = generators || [];
    }
}
GeneratorExp.prototype._fields = ["elt", "generators"];
GeneratorExp.prototype._kind = ASTKind.GeneratorExp;

export class Await extends expr {
    static _name = "Await";
    value: expr;
    constructor(value: expr, ...attrs: Attrs) {
        super(...attrs);
        this.value = value;
    }
}
Await.prototype._fields = ["value"];
Await.prototype._kind = ASTKind.Await;

export class Yield extends expr {
    static _name = "Yield";
    value: expr | null;
    constructor(value: expr | null, ...attrs: Attrs) {
        super(...attrs);
        this.value = value;
    }
}
Yield.prototype._fields = ["value"];
Yield.prototype._kind = ASTKind.Yield;

export class YieldFrom extends expr {
    static _name = "YieldFrom";
    value: expr;
    constructor(value: expr, ...attrs: Attrs) {
        super(...attrs);
        this.value = value;
    }
}
YieldFrom.prototype._fields = ["value"];
YieldFrom.prototype._kind = ASTKind.YieldFrom;

export class Compare extends expr {
    static _name = "Compare";
    left: expr;
    ops: cmpop[];
    comparators: expr[];
    constructor(left: expr, ops: cmpop[] | null, comparators: expr[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.left = left;
        this.ops = ops || [];
        this.comparators = comparators || [];
    }
}
Compare.prototype._fields = ["left", "ops", "comparators"];
Compare.prototype._kind = ASTKind.Compare;

export class Call extends expr {
    static _name = "Call";
    func: expr;
    args: expr[];
    keywords: keyword[];
    constructor(func: expr, args: expr[] | null, keywords: keyword[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.func = func;
        this.args = args || [];
        this.keywords = keywords || [];
    }
}
Call.prototype._fields = ["func", "args", "keywords"];
Call.prototype._kind = ASTKind.Call;

export class FormattedValue extends expr {
    static _name = "FormattedValue";
    value: expr;
    conversion: number | null;
    format_spec: expr | null;
    constructor(value: expr, conversion: number | null, format_spec: expr | null, ...attrs: Attrs) {
        super(...attrs);
        this.value = value;
        this.conversion = conversion;
        this.format_spec = format_spec;
    }
}
FormattedValue.prototype._fields = ["value", "conversion", "format_spec"];
FormattedValue.prototype._kind = ASTKind.FormattedValue;

export class JoinedStr extends expr {
    static _name = "JoinedStr";
    values: expr[];
    constructor(values: expr[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.values = values || [];
    }
}
JoinedStr.prototype._fields = ["values"];
JoinedStr.prototype._kind = ASTKind.JoinedStr;

export class Constant extends expr {
    static _name = "Constant";
    value: constant;
    kind: string | null;
    constructor(value: constant, kind: string | null, ...attrs: Attrs) {
        super(...attrs);
        this.value = value;
        this.kind = kind;
    }
}
Constant.prototype._fields = ["value", "kind"];
Constant.prototype._kind = ASTKind.Constant;

export class Attribute extends expr {
    static _name = "Attribute";
    value: expr;
    attr: identifier;
    ctx: expr_context;
    constructor(value: expr, attr: identifier, ctx: expr_context, ...attrs: Attrs) {
        super(...attrs);
        this.value = value;
        this.attr = attr;
        this.ctx = ctx;
    }
}
Attribute.prototype._fields = ["value", "attr", "ctx"];
Attribute.prototype._kind = ASTKind.Attribute;

export class Subscript extends expr {
    static _name = "Subscript";
    value: expr;
    slice: expr;
    ctx: expr_context;
    constructor(value: expr, slice: expr, ctx: expr_context, ...attrs: Attrs) {
        super(...attrs);
        this.value = value;
        this.slice = slice;
        this.ctx = ctx;
    }
}
Subscript.prototype._fields = ["value", "slice", "ctx"];
Subscript.prototype._kind = ASTKind.Subscript;

export class Starred extends expr {
    static _name = "Starred";
    value: expr;
    ctx: expr_context;
    constructor(value: expr, ctx: expr_context, ...attrs: Attrs) {
        super(...attrs);
        this.value = value;
        this.ctx = ctx;
    }
}
Starred.prototype._fields = ["value", "ctx"];
Starred.prototype._kind = ASTKind.Starred;

export class Name extends expr {
    static _name = "Name";
    id: identifier;
    ctx: expr_context;
    constructor(id: identifier, ctx: expr_context, ...attrs: Attrs) {
        super(...attrs);
        this.id = id;
        this.ctx = ctx;
    }
}
Name.prototype._fields = ["id", "ctx"];
Name.prototype._kind = ASTKind.Name;

export class List extends expr {
    static _name = "List";
    elts: expr[];
    ctx: expr_context;
    constructor(elts: expr[] | null, ctx: expr_context, ...attrs: Attrs) {
        super(...attrs);
        this.elts = elts || [];
        this.ctx = ctx;
    }
}
List.prototype._fields = ["elts", "ctx"];
List.prototype._kind = ASTKind.List;

export class Tuple extends expr {
    static _name = "Tuple";
    elts: expr[];
    ctx: expr_context;
    constructor(elts: expr[] | null, ctx: expr_context, ...attrs: Attrs) {
        super(...attrs);
        this.elts = elts || [];
        this.ctx = ctx;
    }
}
Tuple.prototype._fields = ["elts", "ctx"];
Tuple.prototype._kind = ASTKind.Tuple;

export class Slice extends expr {
    static _name = "Slice";
    lower: expr | null;
    upper: expr | null;
    step: expr | null;
    constructor(lower: expr | null, upper: expr | null, step: expr | null, ...attrs: Attrs) {
        super(...attrs);
        this.lower = lower;
        this.upper = upper;
        this.step = step;
    }
}
Slice.prototype._fields = ["lower", "upper", "step"];
Slice.prototype._kind = ASTKind.Slice;

/* ----- comprehension ----- */
export class comprehension extends AST {
    static _name = "comprehension";
    target: expr;
    iter: expr;
    ifs: expr[];
    is_async: number;
    constructor(target: expr, iter: expr, ifs: expr[] | null, is_async: number) {
        super();
        this.target = target;
        this.iter = iter;
        this.ifs = ifs || [];
        this.is_async = is_async;
    }
}
comprehension.prototype._fields = ["target", "iter", "ifs", "is_async"];
comprehension.prototype._kind = ASTKind.comprehension;

/* ----- excepthandler ----- */
export class excepthandler extends AST {
    static _name = "excepthandler";
    lineno: number;
    col_offset: number;
    end_lineno?: number | null;
    end_col_offset?: number | null;
    constructor(lineno: number, col_offset: number, end_lineno?: number | null, end_col_offset?: number | null) {
        super();
        this.lineno = lineno;
        this.col_offset = col_offset;
        this.end_lineno = end_lineno;
        this.end_col_offset = end_col_offset;
    }
}
excepthandler.prototype._attributes = _attrs;

export type excepthandlerKind = typeof excepthandler | typeof ExceptHandler;

export class ExceptHandler extends excepthandler {
    static _name = "ExceptHandler";
    type: expr | null;
    name: identifier | null;
    body: stmt[];
    constructor(type: expr | null, name: identifier | null, body: stmt[] | null, ...attrs: Attrs) {
        super(...attrs);
        this.type = type;
        this.name = name;
        this.body = body || [];
    }
}
ExceptHandler.prototype._fields = ["type", "name", "body"];
ExceptHandler.prototype._kind = ASTKind.ExceptHandler;

/* ----- arguments_ ----- */
export class arguments_ extends AST {
    static _name = "arguments";
    posonlyargs: arg[];
    args: arg[];
    vararg: arg | null;
    kwonlyargs: arg[];
    kw_defaults: (expr | null)[];
    kwarg: arg | null;
    defaults: expr[];
    constructor(
        posonlyargs: arg[] | null,
        args: arg[] | null,
        vararg: arg | null,
        kwonlyargs: arg[] | null,
        kw_defaults: (expr | null)[] | null,
        kwarg: arg | null,
        defaults: expr[] | null
    ) {
        super();
        this.posonlyargs = posonlyargs || [];
        this.args = args || [];
        this.vararg = vararg;
        this.kwonlyargs = kwonlyargs || [];
        this.kw_defaults = kw_defaults || [];
        this.kwarg = kwarg;
        this.defaults = defaults || [];
    }
}
arguments_.prototype._fields = ["posonlyargs", "args", "vararg", "kwonlyargs", "kw_defaults", "kwarg", "defaults"];
arguments_.prototype._kind = ASTKind.arguments_;

/* ----- arg ----- */
export class arg extends AST {
    static _name = "arg";
    arg: identifier;
    annotation: expr | null;
    type_comment: string | null;
    lineno: number;
    col_offset: number;
    end_lineno?: number | null;
    end_col_offset?: number | null;
    constructor(
        arg: identifier,
        annotation: expr | null,
        type_comment: string | null,
        lineno: number,
        col_offset: number,
        end_lineno?: number | null,
        end_col_offset?: number | null
    ) {
        super();
        this.arg = arg;
        this.annotation = annotation;
        this.type_comment = type_comment;
        this.lineno = lineno;
        this.col_offset = col_offset;
        this.end_lineno = end_lineno;
        this.end_col_offset = end_col_offset;
    }
}
arg.prototype._fields = ["arg", "annotation", "type_comment"];
arg.prototype._kind = ASTKind.arg;
arg.prototype._attributes = _attrs;

/* ----- keyword ----- */
export class keyword extends AST {
    static _name = "keyword";
    arg: identifier | null;
    value: expr;
    lineno: number;
    col_offset: number;
    end_lineno?: number | null;
    end_col_offset?: number | null;
    constructor(
        arg: identifier | null,
        value: expr,
        lineno: number,
        col_offset: number,
        end_lineno?: number | null,
        end_col_offset?: number | null
    ) {
        super();
        this.arg = arg;
        this.value = value;
        this.lineno = lineno;
        this.col_offset = col_offset;
        this.end_lineno = end_lineno;
        this.end_col_offset = end_col_offset;
    }
}
keyword.prototype._fields = ["arg", "value"];
keyword.prototype._kind = ASTKind.keyword;
keyword.prototype._attributes = _attrs;

/* ----- alias ----- */
export class alias extends AST {
    static _name = "alias";
    name: identifier;
    asname: identifier | null;
    constructor(name: identifier, asname: identifier | null) {
        super();
        this.name = name;
        this.asname = asname;
    }
}
alias.prototype._fields = ["name", "asname"];
alias.prototype._kind = ASTKind.alias;

/* ----- withitem ----- */
export class withitem extends AST {
    static _name = "withitem";
    context_expr: expr;
    optional_vars: expr | null;
    constructor(context_expr: expr, optional_vars: expr | null) {
        super();
        this.context_expr = context_expr;
        this.optional_vars = optional_vars;
    }
}
withitem.prototype._fields = ["context_expr", "optional_vars"];
withitem.prototype._kind = ASTKind.withitem;

/* ----- type_ignore ----- */
export class type_ignore extends AST {
    static _name = "type_ignore";
}

export type type_ignoreKind = typeof type_ignore | typeof TypeIgnore;

export class TypeIgnore extends type_ignore {
    static _name = "TypeIgnore";
    lineno: number;
    tag: string;
    constructor(lineno: number, tag: string) {
        super();
        this.lineno = lineno;
        this.tag = tag;
    }
}
TypeIgnore.prototype._fields = ["lineno", "tag"];
TypeIgnore.prototype._kind = ASTKind.TypeIgnore;
