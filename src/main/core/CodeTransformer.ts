
/// <reference path="ContentTransformer"/>

/**
 * Transforms an existing class, replacing all the `__require__x` instances,
 * with the call to `require("x")` that is specified in the comment following
 * the import. 
 */
class CodeTransformer implements ContentTransformer {
	transform(content : string) : string {
		return content.split(/\n/)
			.map(line => line.replace(/(__require__.*?);(\s*\/\/\s*)(.*)$/, "$3;$2$1"))
			.join("\n");
	}
}