import { RequestHandlerOptions } from './types'
import { getAllRouteHandlers } from './decorators'

export const createInstance = ({ controllers, adapter }: RequestHandlerOptions) => {
  const routeHandlers = getAllRouteHandlers()
  return adapter(controllers, routeHandlers)
}
