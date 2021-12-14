#!/usr/bin/env node

if (process.argv.includes("--help")) {
    console.log(`
qbasic.js
Example: qbasic --src=./file.bas

Commands:
[1] --src            :: Source file to execute
[2] --print-bytecode :: Only output the bytecode
[3] --help           :: Shows this menu
    `);
} else {
    const { compileFile } = require("./index");
    
    const source = process.argv
        .find((x) => x.startsWith("--src=") || x.startsWith("--source"))
        ?.split("=")
        .pop();
    const printBytecode = process.argv.some((x) => x === "--print-bytecode");
    
    if (!source) {
        console.log("\x1b[31mError: No source file provided!\x1b[0m");
    } else {
        try {
            const compiled = compileFile(source, !!printBytecode);
            if (printBytecode) {
                console.log(compiled.bytecode);
            }
        } catch (err) {
            console.error(`\x1b[31mCompilation error:\n${(err as Error).message || err}\x1b[0m`);
        }
    }
}
