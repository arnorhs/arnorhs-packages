# fi - Functional conditionals

With fi you can ignore the language constructs and write all your conditional logic in a functional way.

## usage with Typescript

```typescript
import { fi } from 'fi'

const myVar: string = fi(false, 'The dragon')
  .elseif(
    () => 1 == 2,
    () => 'Vampire',
  )
  .else('Wargulf')
  .ret()
```

## usage with javascript / CommonJS

```javascript
const { fi } = require('fi')

const myVar = fi(false, 'The dragon')
  .elseif(
    () => 1 == 2,
    () => 'Vampire',
  )
  .else('Wargulf')
  .ret()
```

### Installation

The library is distributed as an [npm module](https://npmjs.org/package/fi):

```sh
npm install fi
```

or

```sh
yarn add fi
```

### Examples

Basic if statement

```typescript
const getIfTrue = fi(true, 'flower puppy')

// getIfTrue() returns "flower puppy"
```

We can make it more interesting and add an elseif & else statements:

```typescript
const getIfTrue = fi(false, 'flower puppy')
  .elseif(() => false, 'something else')
  .else('space pedals')

// getIfTrue() returns 'space pedals'
```

Even more interesting using an if-else statement as well:

With a half completed if statment, we can also start chaining more stuff to it later

```typescript
const myif = fi(false, 'flower puppy').elseif(false, 'human skin')

// do some other stuff, and add to the chain:
const myVar = myif.else('crapware')

// myVar is "crapware"
```

Any value passed into any fi conditional or return value can be a function

Functions that don't meet a conditional are never executed, and conditionals that dont' meet a
condition (like an else if conditional in an if statement evaluated as true) will also never
get executed.

### Ternary

The ternary variant is not chainable and does not return a function

```typescript
import { ternary } from 'fi

const myVar = ternary(() => 1 > 4), () => 15, () => 42)

// myVar is 42
```

Switch statement using an object:

```javascript
var sw = require('fi').sw

var myVar = sw('Rainbow', {
  red: 'Redish',
  green: 'Greenish',
  blue: 'Blueish',
  default: 'Some color',
})

// myVar is "Some color"
```

Switch statement using an array (so you can use functions as your keys):

```javascript
var myVar = sw("Rainbow", [
    () => "red", "Redish",
    () => "green", () => "Random green",
    () => "blue", "Blueish",
    () => "Some color" // our default
})

// myVar is "Some color"
```

### But.. WHY?!

1. I don't know
2. It could potentially lead to some interesting use cases

### Author:

Arnor Heidar Sigurdsson
[@arnorhs on Twitter](http://twitter.com/arnorhs/)

### License

MIT
