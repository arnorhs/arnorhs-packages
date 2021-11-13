import bnch from 'bnch'
import { SortedArray } from '../SortedArray'

const arr: number[] = []

for (var i = 0; i < 100000; i++) {
  arr.push((Math.random() * 100000) << 0)
}

const needle = arr[(arr.length - arr.length / 4) << 0]

const set = SortedArray.fromArray(arr)

const suite = bnch()

suite.add('array dumb find', function () {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === needle) break
  }
})

suite.add('array indexOf', function () {
  arr.indexOf(needle)
})
