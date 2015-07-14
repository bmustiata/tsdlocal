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

var contentTransformer : ContentTransformer;

if (programArguments.parsejs) {
	contentTransformer = new CodeTransformer();
} else {
	contentTransformer = new DefinitionTransformer();
} 

new FileParser(contentTransformer).parse(programArguments._[0], programArguments._[1]);

