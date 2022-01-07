#!/bin/bash

## this is so lazy.. honestly there's probably a more astro-ish way to collect these

set -o errexit

docsPath="./docs/src/pages"
pkgPath="./pkg"
packages=(./pkg/*/package.json)


generatePage () {
  meta="$1"
  readmePath="$2"
  docsTarget="$3"

  echo "generating $docsTarget from $readmePath"

  echo '---' > $docsTarget
  echo "$meta" >> $docsTarget
  echo '---' >> $docsTarget
  cat $readmePath >> $docsTarget
}

for p in "${packages[@]}"
do
  private=$(cat $p | jq .private)

  if [ "$private" != 'true' ]
  then
    arr=(${p//\// })
    name="${arr[2]}"
    readmePath="$pkgPath/$name/README.md"
    docsTarget="$docsPath/pkg/$name.md"

    meta=$'title: $name\ndescription: Documentation for npm package $name\nlayout: ../../layouts/MainLayout.astro'

    generatePage "$meta" "$readmePath" "$docsTarget"
  fi

done

meta=$'title: arnorhs-packages\ndescription: arnorhs-packages documentation\nlayout: ../layouts/MainLayout.astro'
generatePage "$meta" "./README.md" "$docsPath/index.md"