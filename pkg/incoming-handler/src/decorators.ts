import { AcceptedMethod } from '.'
import { parseRoute } from './router'
import { Method, RouteHandler, Hook } from './types'

const handlers: RouteHandler[] = []
const hooks: Hook[] = []

export const getAllRouteHandlers = (): RouteHandler[] => {
  return handlers
}

export const getAllHooks = (): Hook[] => {
  return hooks
}

const addHandler = (routeHandler: RouteHandler) => {
  handlers.push(routeHandler)
}

const addHeaders = (hook: Hook) => {
  hooks.push(hook)
}

export const hook = (event: Hook['event'], hook: Hook['hook']): ClassDecorator => {
  return (target) => {
    addHeaders({
      event,
      proto: target,
      hook,
    })
  }
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
