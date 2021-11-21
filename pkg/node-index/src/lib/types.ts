export interface MeasureKeyField {
  measure: number
  key: string
  field: string
}
export interface WordMeasure {
  word: string
  measures: MeasureKeyField[]
}

export interface Result<T> {
  key: string
  score: number
  doc: T
}
