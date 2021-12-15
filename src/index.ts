import * as qbasic from "./qb";
import type { PathLike } from "fs";

function safeRequire(id: string) {
    try {
        return require(id);
    } catch {
        return null;
    }
}

export class RuntimeError extends Error {
    public source: string | null = null;
    constructor(message: string, name?: string) {
        super(message);
        this.name = name || "RuntimeError";
        Error.captureStackTrace(this);
    }
}

function compileFile(filePath: PathLike, disableOutput = false): ProgramOutput {
    const fs = safeRequire("fs") as typeof import("fs");
    if (!fs) throw new Error("This method is not available in this environment");
    if (!fs.existsSync(filePath)) throw new Error(`Could not locate source file at ${filePath}`);
    const contents = fs.readFileSync(filePath, "utf-8");
    return compile(contents, !!disableOutput);
}

function compile(code: string, disableOutput = false): ProgramOutput {
    if (!disableOutput) {
        qbasic.qbConsole.onMessage = (m: string) => void process.stdout.write(m);
        qbasic.qbConsole.onClear = () => console.clear();
        qbasic.qbConsole.onInput = () => {
            if (typeof window !== "undefined") {
                const result = window.prompt() || "";
                return isNaN(result as unknown as number) ? result : parseInt(result);
            } else {
                try {
                    const result = (require("readline-sync") as typeof import("readline-sync")).question("") || "";
                    return isNaN(result as unknown as number) ? result : parseInt(result);
                } catch {
                    return "";
                }
            }
        };
    }
    const result = qbasic.compile(code);
    if (result.error) {
        const err = new RuntimeError(result.errors.join("\n"));
        err.source = code;
        throw err;
    }

    return result;
}

export interface ProgramOutput {
    error: boolean;
    errors: string[];
    readonly program: QBProgram;
    readonly source: string;
    readonly bytecode: string;
    readonly vmInstructions: {
        source: string;
        lineMap: ({ line: number; position: number } | undefined)[];
        instructions: QBVmInstructions[];
    }[];
}

export interface QBVmInstructions {
    instr: {
        name: string;
        numArgs?: number;
        execute: Function;
    };
    arg?: string | number | null;
}

export interface QBProgram {
    getByteCodeAsString(): string;
    getVmInstructions(): QBVmInstructions;
    errors: string[];
}

export { compileFile, compile, qbasic };
