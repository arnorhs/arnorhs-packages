/**
 * @jest-environment jsdom
 */
import { FetchEvent } from './types'
import { WorkersAdapter } from './WorkersAdapter'

const makeRequest = (requestOverrides?: any): FetchEvent => {
  return {
    type: 'test',
    request: {
      url: 'yo mamam',
      headers: {
        'Content-type': 'application/json',
      },
      ...(requestOverrides ?? {}),
    } as unknown as Request,
    respondWith: () => undefined,
    waitUntil: () => undefined,
  }
}

describe('WorkersAdapter', () => {
  it('works', () => {
    expect(new WorkersAdapter(makeRequest())).toBeDefined()
  })

  it('gives a correct url when url parameter contains full url', () => {
    const adapter = new WorkersAdapter(
      makeRequest({
        url: 'http://localhost:8878/api/yo',
      }),
    )
    expect(adapter.getPath()).toBe('/api/yo')
  })
})
