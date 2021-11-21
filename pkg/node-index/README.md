# node-index
A super simple search index based on Term Frequency–Inverse Document Frequency using the
awesome [natural](https://github.com/NaturalNode/natural) module.

Useful when you only have a small set of files/strings to index, and want a usable, though
limited search.

### Usage:

```sh
$ npm install node-index
```

Then build up an index in your code by calling `addDocument(key, document)` and search
within the index using `query(searchString)`:
```javascript
index = new Index();

index.addDocument("dog", {
    field1: "dog goes woof",
    field2: "woof woof woof"
});
index.addDocument("cow", {
    field1: "cow goes moo",
    field2: "moo moo moo"
});

// search for string 'string'
index.query("dog");

// returns sorted results by relevence in the form of:
[
    {
        key: 'dog',
        measure: 0.1337,
        doc: { /* original object you passed in */ }
    },
    ...
],
```

### Liense
MIT

