export function countingSort(arr: number[], min: number, max: number) {
  let i: number
  let z: number = 0
  const count: number[] = []

  for (i = min; i <= max; i++) {
    count[i] = 0
  }
  for (i = 0; i < arr.length; i++) {
    count[arr[i]]++
  }
  for (i = min; i <= max; i++) {
    while (count[i]-- > 0) {
      arr[z++] = i
    }
  }
  return arr
}
