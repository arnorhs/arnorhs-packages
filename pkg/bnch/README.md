# bnch

Node.js benchmark in the console

*Note:* this project is pretty young and the results are pretty varied atm. See TODO.

### Installation

    npm install bnch

### Usage:

Create a new file called mybenchmark.js

```javascript
var bnch = require('bnch');

var array = new Array(65536);
array[65500] = 'mom';

var suite = bnch();

// optional, if you want to specify some preparation before each run
suite.beforeEach(function() {
    // return the value to be used in the benchmark
    return array.slice(0);
});

suite.add("Array#indexOf", function(array) {
    array.indexOf('mom');
});

suite.add("manual search", function(array) {
    for (var i = 0, l = array.length; i < l; i++) {
        if (array[i] === 'mom') {
            break;
        }
    }
});
```

And run your file using

    node mybenchmark.js

And the output will look like this:

![benchmark results](http://f.cl.ly/items/2W1o1J000I0k0R1I1a0K/Screen%20Shot%202013-05-21%20at%2012.16.07%20AM.png)

### Todo

- Isolate tests better so the results are not as varied
- Possibly support async tests
- Adjust sample size depending on the time each thing takes to run

### License

MIT
