# sarray - Sorted array in javascript

Features:
- Uses binary-sort to insert and search in array.

Much faster than searching through a normal array, as per this (maybe unfair) benchmark:
![benchmark](http://f.cl.ly/items/1t3V3o270O0E1s1N0X2m/Screen%20Shot%202013-05-23%20at%201.27.03%20AM.png)

### Usage:

```javascript
var SortedArray = require('sarray');

var arr = SortedArray([5,4,2,1]);

arr.add(3);

// arr will now contain 1, 2, 3, 4, 5
```

### Custom comparator

```javascript
var arr = SortedArray(function(a, b) {
    return a.val - b.val;
});

arr.add({val: 5}, {val: 3});

// arr now contains [{val: 3}, {val: 5}];
```

### Further info:

This class is actually a subclass of sorted set, except that it doesn't maintain uniqueness in the
array, so take a look at https://github.com/arnorhs/node-sset for further info.

### Installation

    npm install sarray

### License

MIT
