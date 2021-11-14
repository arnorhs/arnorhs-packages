export type AllOptions = Required<BnchOptions>

export type PrepData = unknown

export interface BnchOptions {
  samples?: number
  beforeEach?: () => PrepData
}

export type HRTime = [number, number]

export interface Case {
  name: string
  cb: (prepData: PrepData) => {}
  hrtime: HRTime
  time: number
}
