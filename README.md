# arnorhs-packages

## Context

So this is an umbrellarepo / monorepo for a bunch of semi-related node modules I published
on NPM 8-10 years ago.

I felt guilty about abandoning them completely, but they're also easy to lose track of, so I
moved them into this repo, updated some of them, typed them up in typescript made made a few
other improvements.

## Overview

### [bnch](/pkg/bnch/)

A super simplistic benchmarking tool, useful for regression testing etc in unit tests

### [countingsort](/pkg/countingsort)

Implementation of the fastest number sorting algorithm on the planet. Probably.

### [fi](/pkg/fi)

Functional conditionals - if, switch and ternary operators as functions. Why? I don't know.

### [introsort](/pkg/introsort)

Introsort algorithm implemented in Javascript.

### [node-index](/pkg/node-index)

A simple search term indexer based on [Natural's TfIdf](http://naturalnode.github.io/natural/tfidf.html). Basically
provides a more userfriendly API around that library.

### [sarray](/pkg/sarray)

Sorted array. Basically keeps its sorting through additions. Internally uses [sset](/pkg/sset)

### [sset](/pkg/sset)

Once upon a time, there were no sets in javascript. Back then, this might have seemed useful

## Contributions

Pull requests, bug reports etc are all welcome. Contribution guide: Be nice. Other than that,
do whatever you like.

## License

All these packages are released under the MIT license.
