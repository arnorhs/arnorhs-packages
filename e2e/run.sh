#!/bin/bash
set -o errexit

run() {
  echo "-- $1 --"
  node $1/$1.js
  yarn run -s ts-node --cwd=e2e -P ./tsconfig.$3.json $1/$1.$2
}

run 'incoming-handler' mjs mjs
run 'node-index' ts cjs
run 'fi' ts cjs
run 'countingsort' ts cjs
run 'sarray' ts cjs
run 'sset' ts cjs
run 'bnch' ts cjs

unset -f run
