import { requestHandler } from '../../requestHandler'
import { Controller, ImplementationContext } from '../../types'
import { FetchEvent, FetchEventHandler } from './types'
import { WorkersAdapter } from './WorkersAdapter'

export const workersAdapter =
  (controllers: Controller[], ctx: ImplementationContext) =>
  (): FetchEventHandler =>
  (event: FetchEvent) => {
    // TOOD: headers
    event.waitUntil(requestHandler(controllers, ctx, new WorkersAdapter(event)))
  }

export const functionAdapter =
  (controllers: Controller[], ctx: ImplementationContext) => (): FetchEventHandler =>
    async function onRequest(context) {
      let rez
      const adapter = new WorkersAdapter({
        type: 'fetch',
        waitUntil: () => {},
        request: context.request,
        respondWith: (res) => {
          rez = res
        },
      })
      await requestHandler(controllers, ctx, adapter)

      return rez
    }
