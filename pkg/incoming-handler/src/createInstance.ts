import { RequestHandlerOptions } from './types'
import { getAllHooks, getAllRouteHandlers } from './decorators'

export const createInstance = ({ controllers, adapter }: RequestHandlerOptions) => {
  const routeHandlers = getAllRouteHandlers()
  const hooks = getAllHooks()
  return adapter(controllers, { routeHandlers, hooks })
}
