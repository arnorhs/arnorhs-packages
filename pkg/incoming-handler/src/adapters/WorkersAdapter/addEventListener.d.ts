import { FetchEventHandler } from './types'

declare global {
  function addEventListener(key: 'fetch' | 'schedule', handler: FetchEventHandler): void
}
