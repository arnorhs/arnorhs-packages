### Introsort implemented in Javascript

Javascript implementation of [Introsort](http://en.wikipedia.org/wiki/Introsort).

There are probably not many real-world use cases for it judging by [this JSperf benchmark](http://jsperf.com/introsort),
but I was Googling and couldn't find a Javascript version of this algorithm.

I found this [Java version](http://www.cs.waikato.ac.nz/~bernhard/317/source/IntroSort.java) and ported it over
to Javascript

### Install using npm:

    npm install introsort

### Usage:

```javascript
var introsort = require('introsort');

var array = [5,3,9,292];
introsort(array);
```

### Todo:

- I noticed that it does not sort correctly if the array contains zeros. Probably something wrong in my port (at least trailing zeros)
- The whole thing can probably be optimized a lot for Javascript. The straight up Java port is probably not the fastest way to go

### License

MIT
