# sarray - Sorted array in javascript

Features:

- Uses binary-sort to insert and search in array.

### Usage:

```typescript
import { SortedArray } from 'sarray'

const arr = new SortedArray<number>()
arr.push(...[5, 4, 2, 1, 4])

// arr will now contain 1, 2, 4, 4, 5
```

### Custom comparator

```typescript
const arr = new SortedArray<{ val: number }>(({ number: a }, { number: b }) => a - b)

arr.push(...[{ val: 5 }, { val: 3 }])

// arr now contains [{val: 3}, {val: 5}];
```

### Installation

```sh
yarn add sarray
# or
npm install sarray
```

### License

MIT
