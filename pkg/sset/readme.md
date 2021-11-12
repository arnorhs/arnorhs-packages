# sset - Sorted Set for javascript

Yet another sorted set, but with the following feature set:

- Uses binary-sort to insert and search and insert in set, so it is incredibly fast.
- Can contain any kind of object
- You can specify a custom comparator, if you have objects, strings etc (default uses number values)

Benchmark against finding in an array (though an array is not a set)

![benchmark](http://f.cl.ly/items/3r0H3x0l0B2E2a3Z333J/Screen%20Shot%202013-05-23%20at%201.17.32%20AM.png)

However, your penalty is at insertion time. If you insert a lot of items at a time, those insertions will be slow (though they can be speeded up):

![benchmark](http://f.cl.ly/items/0V16351x2Y1U2e0l3o3i/Screen%20Shot%202013-05-23%20at%201.18.14%20AM.png)

### Usage:

```javascript
var SortedSet = require('SortedSet');

var set = SortedSet([5,4,2,1]);
// or, if you prefer:
var set = new SortedSet([5,4,2,1]);

set.add(3);

// set will now contain 1, 2, 3, 4, 5
```

### Custom comparator

```javascript
var set = SortedSet(function(a, b) {
    return a.val - b.val;
});

set.add({val: 5}, {val: 3});

// set now contains [{val: 3}, {val: 5}];
```

### Installation

    npm install sset

### Running tests & benchmark

    // Tests
    mocha test.js

    // Benchmarks
    node benchmarks/inserting.js
    node benchmarks/finding.js

### Methods

- `var set = SortedSet(array, comparator) constructor` - creates a new sorted set - all parameters are options. default comparator is a number comparator.
- `set.add(obj [, obj [..obj]])` - adds object(s) to set
- `set.addFromArray(array)` - adds many objects from an array
- `set.get(index)` - gets item from array by index (not really predictable or useful unless you know the index of the object)
- `set.remove(obj)` - removes a value or object by reference from the set
- `set.removeAtIndex(index)` - removes an item by index
- `set.contains(obj)` - returns true if the set contains obj
- `set.containsAll(array)` - returns true if the set contains all objects in array
- `set.indexOf(obj)` - returns the index of the item in the array
- `set.size()` - returns the number of items in the set
- `set.toArray()` - returns an array of all items in the index (performs a copy)

Methods that work the same as in a normal [Array](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array):

- `set.map()`
- `set.forEach()`
- `set.filter()`
- `set.pop()`
- `set.shift()`

### Running tests & benchmark

    // Tests
    mocha test.js

    // Benchmarks
    node benchmarks/inserting.js
    node benchmarks/finding.js

### Todo - Pull requests welcome!

Obvious ***big*** things missing, namely:

- things handling other sets:
  - union
  - intersection
  - copy
  - remove via another set (or array)
- tests for all functionlity

### License

MIT
