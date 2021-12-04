import { AcceptedMethod } from '.'
import { parseRoute } from './router'
import { Method, RouteHandler } from './types'

const handlers: RouteHandler[] = []

export const getAllRouteHandlers = (): RouteHandler[] => {
  return handlers
}

const addHandler = (routeHandler: RouteHandler) => {
  handlers.push(routeHandler)
}

export const route = (path: string, method: AcceptedMethod = '*'): MethodDecorator => {
  return (obj, propertyName, _meta) => {
    addHandler({
      action: propertyName.toString(),
      method: method,
      proto: obj,
      route: parseRoute(path),
    })
  }
}

const makeWithFixedMethod =
  (method: Method) =>
  (path: string): MethodDecorator => {
    return (proto, propertyName, _meta) => {
      addHandler({
        action: propertyName.toString(),
        method: method,
        proto,
        route: parseRoute(path),
      })
    }
  }

export const GET = makeWithFixedMethod('GET')
export const POST = makeWithFixedMethod('POST')
export const PUT = makeWithFixedMethod('PUT')
