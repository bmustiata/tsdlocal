# tsdlocal

Transform `.d.ts` files to look like local modules. Then rewrite your
output javascript file to use actual `require()` statements. All this
without using `--module` in tsc.

## Usage

```
tsdlocal in.d.ts out.local.d.ts
```

```
tsdlocal --parsejs in.js out.js
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

* v0.1.2  2015-07-15  Added Grunt task.
* v0.1.1  2015-07-14  Documentation update.
* v0.1.0  2015-07-10  Initial implementation.

