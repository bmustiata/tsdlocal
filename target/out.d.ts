/// <reference path="../typings/shelljs/shelljs.local.d.ts" />
/// <reference path="../typings/node/node.local.d.ts" />
/// <reference path="../typings/nomnom/nomnom.local.d.ts" />
/// <reference path="../typings/colors/colors.local.d.ts" />
/**
 * Transforms the given content into something else.
 */
interface ContentTransformer {
    transform(content: string): string;
}
/**
 * Transforms an existing class, replacing all the `__require__x` instances,
 * with the call to `require("x")` that is specified in the comment following
 * the import.
 */
declare class CodeTransformer implements ContentTransformer {
    transform(content: string): string;
}
/**
 * Transforms the definition and requires from a file, into local modules.
 */
declare class DefinitionTransformer implements ContentTransformer {
    /**
     * Transforms the definitions from the file, from external
     * modules into local modules.
     */
    transform(content: string): string;
}
import fs = __require__fs;
declare var nomnom: NomnomInternal.Parser;
declare var colors: typeof __require__colors;
/**
 * Transforms the content of a file using a `ContentTransformer`,
 * and writes an output file.
 */
declare class FileParser {
    private _contentTransformer;
    constructor(_contentTransformer: ContentTransformer);
    parse(inputFileName: string, outputFileName: string): void;
}
declare var programArguments: any;
declare var contentTransformer: ContentTransformer;
