/// <reference path="ContentTransformer"/>
/**
 * Transforms an existing class, replacing all the `__require__x` instances,
 * with the call to `require("x")` that is specified in the comment following
 * the import.
 */
var CodeTransformer = (function () {
    function CodeTransformer() {
    }
    CodeTransformer.prototype.transform = function (content) {
        return content.split(/\n/)
            .map(function (line) { return line.replace(/(__require__[\w\d]*)(.*?);(\s*\/\/\s*)(.*)$/, "$4$2;$3$1"); })
            .join("\n");
    };
    return CodeTransformer;
})();
/// <reference path="../../../typings/shelljs/shelljs.local.d.ts" />
/// <reference path="ContentTransformer"/>
/**
 * Transforms the definition and requires from a file, into local modules.
 */
var DefinitionTransformer = (function () {
    function DefinitionTransformer() {
    }
    /**
     * Transforms the definitions from the file, from external
     * modules into local modules.
     */
    DefinitionTransformer.prototype.transform = function (content) {
        var lines = content.split(/\n/);
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/(\s*)declare module ["'](.*)["']/, function (subString) {
                var matches = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    matches[_i - 1] = arguments[_i];
                }
                return matches[0] + "declare module " + DefinitionTransformer._moduleName(matches[1]);
            });
        }
        return lines.join("\n");
    };
    /**
     * Returns the module name for the actual module.
     */
    DefinitionTransformer._moduleName = function (name) {
        return "__require__" + name.replace(/\W/, "_");
    };
    return DefinitionTransformer;
})();
/// <reference path="../../../typings/node/node.local.d.ts"/>
/// <reference path="../../../typings/nomnom/nomnom.local.d.ts"/>
/// <reference path="../../../typings/colors/colors.local.d.ts"/>
/// <reference path="../../../typings/mkdirp/mkdirp.local.d.ts"/>
var path = require("path"); // __require__path
var fs = require("fs"); // __require__fs
var nomnom = require("nomnom"); // __require__nomnom
var colors = require("colors/safe"); // __require__colors
var mkdirp = require("mkdirp"); // __require__mkdirp
/// <reference path="ContentTransformer"/>
/// <reference path="requires"/>
/**
 * Transforms the content of a file using a `ContentTransformer`,
 * and writes an output file.
 */
var FileParser = (function () {
    function FileParser(_contentTransformer) {
        this._contentTransformer = _contentTransformer;
    }
    FileParser.prototype.parse = function (inputFileName, outputFileName) {
        var oldContent = fs.readFileSync(inputFileName, "utf-8");
        var newContent = this._contentTransformer.transform(oldContent);
        fs.writeFileSync(outputFileName, newContent, { encoding: "utf-8" });
    };
    return FileParser;
})();
/// <reference path="requires"/>
/// <reference path="DefinitionTransformer" />
/// <reference path="CodeTransformer" />
/// <reference path="FileParser" />
var programArguments = nomnom.option("parsejs", {
    flag: true,
    abbr: "p",
    help: "Parse a JS file to generate the require('x') statements."
}).help("input.(d.)ts - the input file to process.\n" +
    "output.(d.)ts - the output file to write.").parse();
// some validations
if (programArguments._.length != 2) {
    console.error(colors.red("Invalid arguments, please run the program with --help."));
    process.exit(1);
}
var contentTransformer;
if (programArguments.parsejs) {
    contentTransformer = new CodeTransformer();
}
else {
    contentTransformer = new DefinitionTransformer();
}
new FileParser(contentTransformer).parse(programArguments._[0], programArguments._[1]);
//# sourceMappingURL=out.js.map