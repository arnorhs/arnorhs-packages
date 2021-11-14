var bnch = require('../');

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
