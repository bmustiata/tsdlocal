/// <reference path="ContentTransformer"/>
/// <reference path="requires"/>

/**
 * Transforms the content of a file using a `ContentTransformer`,
 * and writes an output file.
 */
class FileParser {
	constructor(private _contentTransformer : ContentTransformer) {
	}
	
	parse(inputFileName : string, outputFileName : string) : void {
		var oldContent = fs.readFileSync(inputFileName, "utf-8");
		var newContent = this._contentTransformer.transform(oldContent);
		
		fs.writeFileSync(outputFileName, newContent, {encoding: "utf-8"});
	}
}