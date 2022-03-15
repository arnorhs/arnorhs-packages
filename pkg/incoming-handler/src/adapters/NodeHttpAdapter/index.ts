import http, { IncomingMessage, ServerResponse } from 'http'
import { requestHandler } from '../../requestHandler'
import { Controller, ImplementationContext, RouteHandler } from '../../types'
import { NodeHttpAdapter } from './NodeHttpAdapter'

export interface NodeHttpAdapterOptions {
  port: number
  host: string
}

export const nodeHttpAdapter =
  (controllers: Controller[], ctx: ImplementationContext) =>
  ({ host, port }: NodeHttpAdapterOptions) => {
    http
      .createServer(async (req: IncomingMessage, res: ServerResponse) => {
        return requestHandler(controllers, ctx, new NodeHttpAdapter(req, res))
      })
      .listen(port, host, () => {
        console.log(`Server is listening on http://${host}:${port}`)
      })
  }
