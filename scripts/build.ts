import { esbuild } from "../deps.ts";
// import * as esbuild from "esbuild";
// deno run -A scripts/build.ts

let result = await esbuild.build({
    entryPoints: ["src/mod.ts"],
    bundle: true,
    format: "esm",
    outfile: "dist/bundle.min.js",
    minify: true,
});

console.log("result:", result);

result = await esbuild.build({
    entryPoints: ["src/mod.ts"],
    bundle: true,
    format: "esm",
    outfile: "dist/bundle.js",
});

console.log("result:", result);
esbuild.stop();
