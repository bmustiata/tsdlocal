// Type definitions for mkdirp 0.3.0
// Project: http://github.com/substack/node-mkdirp
// Definitions by: Bart van der Schoor <https://github.com/Bartvds>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare var __require__mkdirp : {
	(dir: string, cb: (err: any, made: string) => void): void;
	(dir: string, flags: any, cb: (err: any, made: string) => void): void;
	
	sync(dir: string, flags?: any): string;
};