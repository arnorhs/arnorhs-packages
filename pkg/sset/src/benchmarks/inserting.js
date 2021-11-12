var bnch = require('bnch'),
    SortedSet = require('../');

var arr = [];
for (var i = 0; i < 10000; i++) {
    arr.push((Math.random() * 100000) << 0);
}

var suite = bnch();

suite.add("Copy array", function() {
    arr.slice();
});

suite.add("Array manual copy", function() {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
    }
});

suite.add("Creating SortedSet", function() {
    SortedSet(arr);
});

