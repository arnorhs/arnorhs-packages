#!/bin/bash

set -o errexit

NAME=$1
REPO=$2

if [ -z "$REPO" ] || [ -z "$NAME" ]; then
  echo "expected two arguments"
  echo "usage: ./scripts/import.sh <name in pkg/> <github user/repo identifier>"
  exit 1
fi

echo "importing $REPO to pkg/$NAME"

npx degit --force $REPO pkg/$NAME

node -e "
const merge = require('deepmerge')
const pkg = require('./pkg/$NAME/package.json')
const tpl = require('./shared/pkg-template/package.json')
const { author } = require('./package.json')
const { main, module } = tpl

// overwrite config
const overwrite = {
  // for lerna
  publishConfig: {
    access: 'public'
  },
  repository: {
    type: 'git',
    url: 'ssh://git@github.com/arnorhs/arnorhs-packages.git',
    directory: 'pkg/$NAME'
  },
  author,
  main,
  module
}

const merged = JSON.stringify(merge.all([tpl, pkg, overwrite]), null, 2)

fs.writeFileSync('./pkg/$NAME/package.json', merged, { encoding: 'utf-8' })
"
