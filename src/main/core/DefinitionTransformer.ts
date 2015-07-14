/// <reference path="../../../typings/shelljs/shelljs.local.d.ts" />

/// <reference path="ContentTransformer"/>

/**
 * Transforms the definition and requires from a file, into local modules.
 */
class DefinitionTransformer implements ContentTransformer {
	/**
	 * Transforms the definitions from the file, from external
	 * modules into local modules.
	 */
	transform(content: string) : string {
		var lines = content.split(/\n/);
		
		for (var i = 0; i < lines.length; i++) {
			lines[i] = lines[i].replace(/(\s*)declare module "(.*)/, (subString, ...matches) => {
				return matches[0] + "declare module " + matches[1];
			});
		}
		
		return lines.join("\n");
	}
}
