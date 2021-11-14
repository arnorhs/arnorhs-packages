import { AllOptions, Case, BnchOptions } from './types'
import { hrtime2seconds, renderLine, renderResultLine, runCase } from './util'

const defaultOptions = (): AllOptions => ({
  samples: 1000,
  beforeEach: () => {},
})

export class Bnch {
  private opts: AllOptions
  private cases: Case[]

  constructor(opts: BnchOptions = {}) {
    this.opts = {
      ...defaultOptions(),
      ...opts,
    }

    this.cases = []
  }

  public run(printer: (...args: string[]) => void = console.log) {
    if (this.cases.length < 1) {
      throw new Error('No cases added')
    }

    for (const c of this.cases) {
      printer(`Running ${c.name}`)

      for (let j = 0; j < this.opts.samples; j++) {
        runCase(c, this.opts.beforeEach())
      }

      c.time = hrtime2seconds(c.hrtime)
    }

    this.printResults(printer)
  }

  public setBeforeEach(cb: AllOptions['beforeEach']) {
    this.opts.beforeEach = cb
  }

  public add(name: Case['name'], cb: Case['cb']) {
    this.cases.push({
      name: name,
      cb: cb,
      hrtime: [0, 0],
      time: 0,
    })
  }

  private printResults(printer: (...args: string[]) => void) {
    const fastestCase = this.getFastestCase()

    const cases = this.cases

    printer(renderLine())

    for (const c of cases) {
      const timePerOperation = c.time / this.opts.samples
      const opsPerSecond = 1 / timePerOperation

      printer(
        renderResultLine({
          isFastest: c === fastestCase,
          opsPerSecond,
          currentCase: c,
          fastestCase,
        }),
      )
    }

    printer(renderLine())
  }

  private getFastestCase(): Case | null {
    if (this.cases.length < 1) {
      return null
    }

    return this.cases.reduce(
      (fastestSoFar: Case, current: Case) =>
        fastestSoFar.time > current.time ? current : fastestSoFar,
      this.cases[0],
    )
  }
}
