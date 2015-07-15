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
            .map(function (line) { return line.replace(/(__require__.*?);(\s*\/\/\s*)(.*)$/, "$3;$2$1"); })
            .join("\n");
    };
    return CodeTransformer;
})();
/// <reference path="../core/FileParser"/>
/// <reference path="../core/CodeTransformer"/>
/**
 * The actual grunt task that will do the file parsing using the code transformer.
 */
module.exports = function (grunt) {
    var parser = new FileParser(new CodeTransformer());
    grunt.registerMultiTask("tsdlocal", "Parse typescript generated javascript files.", function () {
        this.files.filter(function (file) { return fs.statSync(file.src[0]).isFile(); })
            .forEach(function (file) {
            ensureFolderExists(file.dest);
            parser.parse(file.src[0], file.dest);
            console.log(colors.green("Wrote " + file.dest));
        });
    });
};
/**
 * Ensures the parent folders for the given file name exists.
 */
function ensureFolderExists(file) {
    var folderName = path.dirname(file);
    if (fs.existsSync(folderName)) {
        return;
    }
    try {
        mkdirp.sync(folderName);
    }
    catch (e) {
        console.log(colors.red("Unable to create parent folders for: " + file), e);
    }
}
//# sourceMappingURL=tsdlocal.js.map