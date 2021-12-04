import { RequestHandlerOptions } from './types'
import { lambdaAdapter } from './adapters/LambdaAdapter'
import { nodeHttpAdapter } from './adapters/NodeHttpAdapter'
import { workersAdapter } from './adapters/WorkersAdapter'
import { getAllRouteHandlers } from './decorators'

export const createInstance = ({ controllers }: RequestHandlerOptions) => {
  const routeHandlers = getAllRouteHandlers()
  return {
    startServer: nodeHttpAdapter(controllers, routeHandlers),
    getLambdaHandler: lambdaAdapter(controllers, routeHandlers),
    getFetchEventHandler: workersAdapter(controllers, routeHandlers),
  }
}
