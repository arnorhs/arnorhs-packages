import { Case, HRTime, PrepData } from 'index'
import { COLOR_FASTEST, COLOR_RESET } from './constants'

export const runCase = (caseObj: Case, prepData: PrepData) => {
  const preTime = process.hrtime()
  caseObj.cb(prepData)
  const postTime = process.hrtime(preTime)
  hrtimeAdd(caseObj.hrtime, postTime)
}

const hrtimeAdd = (aggregate: HRTime, hrtime: HRTime) => {
  aggregate[0] += hrtime[0]
  aggregate[1] += hrtime[1]
}

export const hrtime2seconds = (hrtime: HRTime) => hrtime[0] + hrtime[1] / 1e9

const renderCase = (opsPerSecond: number, label: string) =>
  `${label}: ${opsPerSecond.toFixed(2)} ops per second. -- `

const renderFastestCase = (str: string) => COLOR_FASTEST + str + 'Fastest' + COLOR_RESET

const renderNormalCase = (str: string, timesSlower: number) => {
  return str + (timesSlower * 100).toFixed(2) + '% slower'
}

interface RenderResultsLineProps {
  isFastest: boolean
  opsPerSecond: number
  currentCase: Case
  fastestCase?: Case | null
}

export const renderResultLine = ({
  isFastest,
  opsPerSecond,
  currentCase,
  fastestCase,
}: RenderResultsLineProps) => {
  const str = renderCase(opsPerSecond, currentCase.name)

  if (!fastestCase) {
    return str
  }

  return isFastest
    ? renderFastestCase(str)
    : renderNormalCase(str, 1 - fastestCase.time / currentCase.time)
}

export const renderLine = () => `==============================================================`
