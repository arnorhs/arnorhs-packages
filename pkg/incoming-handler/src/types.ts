import { RouteValues } from './router'

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

export interface ActionParams<R extends RouteValues = RouteValues, BodyType = any> {
  url: {
    pathname: string
    query: URLSearchParams
  }
  method: Method
  body: BodyType | undefined
  params: R
}

export interface RequestHandlerOptions {
  controllers: Controller[]
  adapter: RequestAdapterImpl
}

export type RequestAdapterImpl = (
  controllers: Controller[],
  routeHandlers: RouteHandler[],
) => Function

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
