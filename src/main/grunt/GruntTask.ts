/// <reference path="../core/FileParser"/>
/// <reference path="../core/CodeTransformer"/>
/// <reference path="../core/DefinitionTransformer"/>

interface Grunt {
	registerMultiTask(name: string, description: string, callback: Function);
}

/**
 * The actual grunt task that will do the file parsing using the code transformer.
 */
module.exports = function(grunt : Grunt) {
	grunt.registerMultiTask("tsdlocal", "Parse typescript generated javascript files.", function() {
		var generateDefinitions : boolean = this.data && this.data.options && this.data.options.generateDefinitions;
		var parser;
		
		if (generateDefinitions) {
			parser = new FileParser(new DefinitionTransformer());
		} else {
			parser = new FileParser(new CodeTransformer());
		}
	
		this.files.filter(file => fs.statSync(file.src[0]).isFile())
			.forEach(file => { 
				ensureFolderExists(file.dest);
				parser.parse(file.src[0], file.dest);
				console.log("Wrote " + colors.cyan(file.dest));
			});
	});
}

/**
 * Ensures the parent folders for the given file name exists.
 */
function ensureFolderExists(file : string) : void {
	var folderName = path.dirname(file);
	if (fs.existsSync(folderName)) {
		return;
	}
	
	try {
		mkdirp.sync(folderName);
	} catch (e) {
		console.log(colors.red("Unable to create parent folders for: " + file), e);
	}
}