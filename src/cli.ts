#!/usr/bin/env node

const { compileFile } = require("./index");
const source = process.argv
    .find((x) => x.startsWith("--source="))
    ?.split("=")
    .pop();
const printBytecode = process.argv.some((x) => x === "--print-bytecode");

if (!source) {
    console.log("No source file provided!");
} else {
    try {
        const compiled = compileFile(source);
        if (printBytecode) {
            setTimeout(() => {
                console.log(compiled.bytecode);
            }, 1000);
        }
    } catch (err) {
        console.error(`Compilation error:\n${(err as Error).message || err}`);
    }
}
