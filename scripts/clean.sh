#!/bin/bash

set -o errexit

echo 'removing node_modules...'
find . -name 'node_modules' -type d -prune -exec rm -rf {} \;

echo 'removing dist directories...'
find pkg/ -name 'dist' -type d -prune -exec rm -rf {} \;