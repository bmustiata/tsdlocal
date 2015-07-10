# tsdlocal

Transform `.d.ts` files to look like local modules. Then rewrite your
output javascript file to use actual `require()` statements. All this
without using `--module` in tsc.

## Usage

```
tsdlocal in.d.ts out.d.ts
```

```
tsdlocal --parsejs in.js out.js
```

