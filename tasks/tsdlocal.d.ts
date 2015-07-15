/// <reference path="../typings/node/node.local.d.ts" />
/// <reference path="../typings/nomnom/nomnom.local.d.ts" />
/// <reference path="../typings/colors/colors.local.d.ts" />
/// <reference path="../typings/mkdirp/mkdirp.local.d.ts" />
/**
 * Transforms the given content into something else.
 */
interface ContentTransformer {
    transform(content: string): string;
}
import path = __require__path;
import fs = __require__fs;
declare var nomnom: NomnomInternal.Parser;
declare var colors: typeof __require__colors;
declare var mkdirp: {
    (dir: string, cb: (err: any, made: string) => void): void;
    (dir: string, flags: any, cb: (err: any, made: string) => void): void;
    sync(dir: string, flags?: any): string;
};
/**
 * Transforms the content of a file using a `ContentTransformer`,
 * and writes an output file.
 */
declare class FileParser {
    private _contentTransformer;
    constructor(_contentTransformer: ContentTransformer);
    parse(inputFileName: string, outputFileName: string): void;
}
/**
 * Transforms an existing class, replacing all the `__require__x` instances,
 * with the call to `require("x")` that is specified in the comment following
 * the import.
 */
declare class CodeTransformer implements ContentTransformer {
    transform(content: string): string;
}
interface Grunt {
    registerMultiTask(name: string, description: string, callback: Function): any;
}
/**
 * Ensures the parent folders for the given file name exists.
 */
declare function ensureFolderExists(file: string): void;
