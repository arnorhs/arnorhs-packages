import http, { IncomingMessage, ServerResponse } from 'http'
import { requestHandler } from '../../requestHandler'
import { Controller, RouteHandler } from '../../types'
import { RequestHandlerOptions } from '../../types'
import { NodeHttpAdapter } from './NodeHttpAdapter'

export interface NodeHttpAdapterOptions {
  port: number
  host: string
}

export const nodeHttpAdapter =
  (controllers: Controller[], routeHandlers: RouteHandler[]) =>
  ({ host, port }: NodeHttpAdapterOptions) => {
    http
      .createServer(async (req: IncomingMessage, res: ServerResponse) => {
        return requestHandler(controllers, routeHandlers, new NodeHttpAdapter(req, res))
      })
      .listen(port, host, () => {
        console.log(`Server is listening on http://${host}:${port}`)
      })
  }
