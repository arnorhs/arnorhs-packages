var util = require('util'),
    SortedSet = require('sset');

module.exports = SortedArray;

function SortedArray(arr, cmp) {
    if (!(this instanceof SortedArray)) {
        return new SortedArray(arr, cmp);
    }
    return SortedSet.call(this, arr, cmp);
}
util.inherits(SortedArray, SortedSet);

/*
 * Add items to the array
 *
 * returns the index of the item inserted
 */
SortedArray.prototype.addOne = function(item) {
    var idx = this.indexOf(item),
        x = idx < 0 ? -idx - 1 : idx;
    this.items.splice(x, 0, item);
    return x;
};

