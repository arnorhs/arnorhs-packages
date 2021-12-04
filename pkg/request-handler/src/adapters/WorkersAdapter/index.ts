import { requestHandler } from '../../requestHandler'
import { Controller, RouteHandler } from '../../types'
import { FetchEvent, FetchEventHandler } from './types'
import { WorkersAdapter } from './workersAdapter'

export const workersAdapter =
  (controllers: Controller[], routeHandlers: RouteHandler[]) =>
  (): FetchEventHandler =>
  (event: FetchEvent) => {
    event.waitUntil(requestHandler(controllers, routeHandlers, new WorkersAdapter(event)))
  }
