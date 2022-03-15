import type { Handler, HandlerContext, HandlerEvent } from '@netlify/functions'
import { Controller, ImplementationContext } from '../../types'
import { requestHandler } from '../../requestHandler'
import { LambdaAdapter } from './LambdaAdapter'

export const lambdaAdapter =
  (controllers: Controller[], ctx: ImplementationContext) => (): Handler => {
    return async (event: HandlerEvent, context: HandlerContext) => {
      const adapter = new LambdaAdapter(event, context)
      await requestHandler(controllers, ctx, adapter)

      return adapter.getLambdaResponse()
    }
  }
