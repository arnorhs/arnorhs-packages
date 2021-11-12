var bnch = require('bnch'),
    SortedSet = require('../');

var arr = [];
for (var i = 0; i < 100000; i++) {
    arr.push((Math.random() * 100000) << 0);
}

var needle = arr[(arr.length - arr.length / 4) << 0];

var set = SortedSet(arr);

var suite = bnch();

suite.add("array dumb find", function() {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === needle) break;
    }
});

suite.add("array indexOf", function() {
    arr.indexOf(needle);
});

suite.add("sorted set find", function() {
    set.contains(needle);
});

