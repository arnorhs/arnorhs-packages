import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions'
import { Controller } from '../../types'
import { requestHandler } from '../../requestHandler'
import { LambdaAdapter } from './LambdaAdapter'
import { RouteHandler } from '../..'

export const lambdaAdapter =
  (controllers: Controller[], routeHandlers: RouteHandler[]) => (): Handler => {
    return async (event: HandlerEvent, context: HandlerContext) => {
      const adapter = new LambdaAdapter(event, context)
      await requestHandler(controllers, routeHandlers, adapter)

      return adapter.getLambdaResponse()
    }
  }
