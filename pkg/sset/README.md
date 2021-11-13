# sset - Sorted Set for javascript

Yet another sorted set, but with the following feature set:

- Uses binary-sort to insert and search and insert in set, so it is incredibly fast.
- Can contain any kind of object
- You can specify a custom comparator, if you have objects, strings etc (default uses number values)

## installation

```sh
yarn add sset
# or
npm install sset
```

## v2 guide

The API has changed somewhat. Now you instantiate a SortedSet, TS or node - SortedSet
extends an array, so `Array.isArray()` returns `true`, you can use it as an array,
with the primary difference being that when inserting into it via `.push()` the
array remains sorted and `.indexOf()` uses binary search to look up items.

```typescript
import { SortedSet } from 'sset'

const set = new SortedSet<number>()
set.push(27)
// or
const otherSet = SortedSet.fromArray([1, 2, 3, 4])
```

## Pros/cons

Fast lookups

However, your penalty is at insertion time. If you insert a lot of items at a time,
those insertions will be slow (though they can be sped up):

### Custom comparator

```javascript
var set = SortedSet((a: User, b: User) => {
  return a.age - b.age
})

set.push(
  ...[
    { name: 'Alice', age: 34 },
    { name: 'Jenny', age: 27 },
  ],
)

// set now contains [{val: 3}, {val: 5}];
```

### Installation

    npm install sset

### Todo - Pull requests welcome!

Obvious **_big_** things missing, namely:

- this thing was conceived years ago, but now I think it would be better
  if the interface was more similar to the native Set
- The SortedArray package (sarray) is basically the same thing, but an
  array instead of a set - they should probably just be the same package

### License

MIT
