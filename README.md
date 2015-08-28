# tsdlocal

Transform `.d.ts` files to look like local modules. Then rewrite your
output javascript file to use actual `require()` statements. All this
without using `--module` in tsc.

## Usage

To generate a definition:

```
tsdlocal in.d.ts out.local.d.ts
```

To process code that uses local definitions.

```
tsdlocal --parsejs in.js out.js
```

For example for using the `require("path")`, you would need to write:

```typescript
/// <reference path="/typings/node/node.local.d.ts"/>

import path = __require__path; // require("path")
```

## Grunt Parsing

Grunt support is embedded. In order to parse your outputed sources as
part of the build, you just need to add it:

```javascript
/**
 * Grunt project configuration.
 */
module.exports = function(grunt) {
    // configuration for the plugins.
    grunt.initConfig({
        tsdlocal : {
            dist : {
                files : [
                    {
                        expand: true,
                        cwd: 'dest/',
                        src: ['**/*.js'],
                        dest: 'dest/'
                    }
                ]
            }
        }
    });

    // load NPM tasks:
    grunt.loadNpmTasks('tsdlocal');

    // register our task:
    grunt.registerTask('default', ['tsdlocal']);
};
```

Using the same source and destination works, since the task will first read the file,
then process it, and only after rewriting it.

This is equivalent with running `tsdlocal --parsejs` for each js file.

### Local definitions generation

If you want to generate namespace definitions from some module definitions,
you can use the generateDefinitions option.

```javascript
    tsdlocal : {
        "dist" : {
            options : {
                generateDefinitions : true
            },
            files : [
                {
                    src: [
                        "./core-promise.d.ts"
                    ],
                    dest: "./core-promise.local.d.ts"
                }
            ]
        }
    }
```

## Note

There is a high chance that the local .d.ts to still need a bit
of fidling from your side, namely for modules that export instances
for the exports. Like so:

```typescript
declare module "x" {
    export = someInstance;
}
```

If that's the case, then you probably need to assign a variable, declare
the variable with the name `__require__x`, and the type of the instance:

```typescript
declare var __require__x : someInstanceType;
```

 and in the client do:

```typescript
// instead of:
//
// import mymodule = __require__x; // require("x")
//
// do:
var mymodule = __require__x; // require("x")
```

The static type checking will still function as expected.

## ChangeLog

* v0.1.6  2015-08-28  **Bugfix** Imports that have also classes are working. (`import A = __require__x.A;`)
* v0.1.5  2015-07-22  The grunt task can also parse definitions now.
* v0.1.4  2015-07-20  Use out.js for the standalone launcher, duh.
* v0.1.3  2015-07-15  Use v0.1.2 grunt task to build itself.
* v0.1.2  2015-07-15  Added Grunt task.
* v0.1.1  2015-07-14  Documentation update.
* v0.1.0  2015-07-10  Initial implementation.

