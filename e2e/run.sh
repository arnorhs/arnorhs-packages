#!/bin/bash
set -o errexit

run() {
  echo "-- $1 --"
  yarn run -s ts-node --cwd=e2e -P ./tsconfig.json $1/$1.ts
  node $1/$1.js
}

run 'countingsort'
run 'sarray'
run 'sset'

unset -f run
