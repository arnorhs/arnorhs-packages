import { RequestAdapter } from './RequestAdapter'

export interface Hook {
  proto: Function
  event: 'beforeRespond' | 'afterRespond'
  hook: (adapter: RequestAdapter) => Promise<void>
}

export type Method =
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'TRACE'

export type AcceptedMethod = Method | '*'

export interface ParsedRoute {
  regex: RegExp
  params: string[]
}

export interface ActionParams<R extends string | undefined = undefined, BodyType = any> {
  url: {
    pathname: string
    query: URLSearchParams
  }
  method: Method
  body: BodyType | undefined
  params: RouteValues<R>
}

export type RouteValues<T extends string | undefined> = {
  [key in T]: string
}

export interface RequestHandlerOptions {
  controllers: Controller[]
  adapter: RequestAdapterImpl
}

export interface ImplementationContext {
  routeHandlers: RouteHandler[]
  hooks: Hook[]
}

export type RequestAdapterImpl = (controllers: Controller[], ctx: ImplementationContext) => Function

export abstract class Controller {}

// i guess it's just a string... oh well
export type Prototype = any

export interface HandlerCollection {
  controller: Controller
  routeHandlers: RouteHandler[]
}

export interface RouteHandler {
  proto: Prototype
  route: ParsedRoute
  method: AcceptedMethod
  action: string
}
