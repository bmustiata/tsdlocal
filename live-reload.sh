#!/usr/bin/env bash

fast-live-reload -o\
    -ep "tsc src/main/core/MainApplication.ts --out target/out.js -d -w" \
    target/out.js -e "bash -c \"sed -r 's|(__require__.*);(\s*//\s*)(.*)$|\3;\2\1|' target/out.js > target/out-local.js\""\
               -e "node target/out-local.js typings/shelljs/shelljs.d.ts /tmp/shelljs.local.d.ts"\
               -e "cat /tmp/shelljs.local.d.ts"
