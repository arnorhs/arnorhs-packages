// FYI the @types/natural is wrong as of writing
declare module 'natural' {
  interface TfIdfCallback {
    (i: number, measure: number, key: undefined | string): void
  }

  interface TfIdfTerm {
    term: string
    tfidf: number
  }

  class TfIdf {
    constructor(deserialized?: any)
    addDocument(document: string, key?: string, restoreCache?: boolean): void
    addDocument(document: string[], key?: string, restoreCache?: boolean): void
    addFileSync(path: string, encoding?: string, key?: string, restoreCache?: boolean): void
    tfidf(terms: string, d: number): void
    tfidfs(terms: string, callback: TfIdfCallback): void
    tfidfs(terms: string[], callback: TfIdfCallback): void
    listTerms(d: number): TfIdfTerm[]
  }
}
