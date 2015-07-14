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

v0.1.1  2015-07-14  Documentation update.
v0.1.0  2015-07-10  Initial implementation.

