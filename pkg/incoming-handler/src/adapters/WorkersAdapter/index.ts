import { requestHandler } from '../../requestHandler'
import { Controller, RouteHandler } from '../../types'
import { FetchEvent, FetchEventHandler } from './types'
import { WorkersAdapter } from './WorkersAdapter'

export const workersAdapter =
  (controllers: Controller[], routeHandlers: RouteHandler[]) =>
  (): FetchEventHandler =>
  (event: FetchEvent) => {
    event.waitUntil(requestHandler(controllers, routeHandlers, new WorkersAdapter(event)))
  }

export const functionAdapter =
  (controllers: Controller[], routeHandlers: RouteHandler[]) => (): FetchEventHandler =>
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
      await requestHandler(controllers, routeHandlers, adapter)

      return rez
    }
