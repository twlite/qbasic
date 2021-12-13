import * as qbasic from "./qb";
import { readFileSync, existsSync, PathLike } from "node:fs";

export class RuntimeError extends Error {
    public source: string | null = null;
    constructor(message: string) {
        super(message);
        Error.captureStackTrace(this);
    }
}

function compileFile(filePath: PathLike): ProgramOutput {
    if (!existsSync(filePath)) throw new Error(`Could not locate source file at ${filePath}`);
    const contents = readFileSync(filePath, "utf-8");
    return compile(contents);
}

function compile(code: string): ProgramOutput {
    qbasic.qbConsole.onMessage = (m: string) => void process.stdout.write(m);
    qbasic.qbConsole.onClear = () => console.clear();
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
}

export interface QBProgram {
    getByteCodeAsString(): string;
    errors: string[];
}

export { compileFile, compile, qbasic };
