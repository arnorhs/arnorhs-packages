# Javascript/Typescript implementation of Counting sort

Sort an array of integers using [Counting sort](http://en.wikipedia.org/wiki/Counting_sort)

Counting sort is the fastest sorting algorithm when the following criteria are met:

- You only have integers
- You know the minimum and the maximum value contained in the array

**Note:** Not only is it better to sort an integer array using Counting sort, it will
actually **_not work_** if you try to sort anything else (like floats), so if things
don't work, that's where you should be looking

## Install using npm

```sh
npm install contingsort
# or
yarn add countingsort
```

## Usage:

```typescript
import { countingSort } from 'countingSort'

const myArray = [5, 3, 2, 0, 6, 4, 3, 6, 10, 0, 3, 2]

countingSort(myArray, 0, 10) // should sort the array to [0,0,2,2,3,3,3,4,5,6,6,10]

// Note: this algorithm actually modifies the input array
```

## Misc

http://jsperf.com/countsort

## License

MIT
