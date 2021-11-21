import { TfIdf } from 'natural'
import { MeasureKeyField, Result, WordMeasure } from './types'

const splitRegex = /[^\w\-]+/g

export class Index<D extends Record<string, string>> {
  tfidf: TfIdf = new TfIdf()
  index: Record<string, string> = {}
  docs: Record<string, D> = {}

  addDocument(key: string, doc: D) {
    this.docs[key] = doc

    Object.entries(doc).forEach(([field, val]) => {
      this.tfidf.addDocument(val, `${key}:${field}`)
    })
  }

  private tfidfs(word: string) {
    const results: MeasureKeyField[] = []

    this.tfidf.tfidfs(word, (_i, measure, keyAndField) => {
      if (keyAndField) {
        // shouldn't happen while we are supplying a key on creation
        const [key, field] = keyAndField?.split(':') ?? []
        results.push({ measure, key, field })
      }
    })

    return results
  }

  query(query: string): Result<D>[] {
    const words = query.split(splitRegex)
    const wordMeasures: WordMeasure[] = words.map((word) => ({ word, measures: this.tfidfs(word) }))

    const results: Record<string, number> = {}

    wordMeasures.forEach(({ measures }) =>
      measures.forEach(({ key, measure }) => {
        if (!(key in results)) {
          results[key] = 0
        }

        results[key] += measure
      }),
    )

    return Object.entries(results)
      .filter(([_key, val]) => val > 0)
      .map(([key, score]) => ({
        key,
        score,
        doc: this.docs[key],
      }))
      .sort(({ score: a }, { score: b }) => b - a)
  }
}
