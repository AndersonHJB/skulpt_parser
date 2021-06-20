import { parse } from "../deps.ts";

const args = parse(Deno.args);
const test = args._[0];

const extra = [];

switch (test) {
    case "parse":
        extra.push("tests/parse.test.ts");
        break;
    /** @todo the default should be to do nothing here and run all the tests */
    case "dump":
    default:
        extra.push("tests/ast_dump.test.ts");
        break;
}

if (args["fail-fast"]) {
    extra.push("--fail-fast");
}

/** set this in Deno env which other test files can retrieve
 * example use: `vr test parse 1`
 */
const files = args._.filter((x) => typeof x === "number").map((x) => `t${x.toString().padStart(3, "0")}.py`);
Deno.env.set("_TESTFILES", JSON.stringify(files));

const cmd = Deno.run({
    cmd: ["deno", "test", "--allow-read", "--allow-run", "--allow-env", ...extra],
});

await cmd.status();
