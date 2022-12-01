# arnorhs-packages

## Context

So this is an umbrellarepo / monorepo for a bunch of semi-related node modules I published
on NPM 8-10 years ago.

I felt guilty about abandoning them completely, but they're also easy to lose track of, so I
moved them into this repo, updated some of them, typed them up in typescript made made a few
other improvements.

You can view the docs here: [https://arnorhs-packages.netlify.app/](arnorhs-packages docs)

## Overview

### [verbose-proxy](/pkg/verbose-proxy)

A very useful simple http server that responds to any web request and
prints details about it to the console and responds with an appropriate 200 msg etc

It's simple to run and nice when you want to:

- debug a web request that might not be happening in a browser
- debug a web hook
- debug the exchange between two servers since you can use it as a sort of a simple MITM
  proxy when debugging stuff

### [fi](/pkg/fi)

Functional conditionals - if, switch and ternary operators as functions. Why? I don't know.

### [incoming-handler](/pkg/incoming-handler)

A thing to handle web requests

### [node-index](/pkg/node-index)

A simple search term indexer based on [Natural's TfIdf](http://naturalnode.github.io/natural/tfidf.html). Basically
provides a more userfriendly API around that library.

## Packages of limited value - here for legacy

### [bnch](/pkg/bnch/)

A super simplistic benchmarking tool, useful for regression testing etc in unit tests

### [countingsort](/pkg/countingsort)

Implementation of the fastest number sorting algorithm on the planet. Probably.

### [introsort](/pkg/introsort)

Introsort algorithm implemented in Javascript.

## Contributions

Pull requests, bug reports etc are all welcome. Contribution guide: Be nice. Other than that,
do whatever you like.

## License

All these packages are released under the MIT license.
