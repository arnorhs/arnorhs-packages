import { RequestAdapter } from './RequestAdapter'
import { getPathParams, pathMathesRoute } from './router'
import { RouteHandler, Controller, ActionParams } from './types'

export const requestHandler = async (
  controllers: Controller[],
  handlers: RouteHandler[],
  adapter: RequestAdapter,
) => {
  const pathname = adapter.getPath()
  const requestMethod = adapter.getMethod()

  const body = adapter.hasPostBody() ? await adapter.getPostBodyContent() : undefined

  const [matchedHandler] = handlers
    .filter(({ route }) => pathMathesRoute(pathname, route))
    .filter(({ method }) => method === '*' || method === requestMethod)

  adapter.setHeader('Content-type', 'application/json')

  const respond = makeResponse(adapter)

  if (!matchedHandler) {
    return respond(404, 'not found')
  }

  const { proto, action, route } = matchedHandler

  const controller = controllers.find((controller) => proto === Object.getPrototypeOf(controller))

  if (!controller) {
    throw new Error('missing controller for path ' + pathname)
  }

  const values = getPathParams(pathname, route)

  const actionProps: ActionParams = {
    url: {
      // these two feel off
      pathname,
      query: new URLSearchParams(pathname),
    },
    params: values,
    // IncomingMessage defines this as any string
    method: requestMethod,
    body,
  }

  let data
  try {
    // TODO better type somehow
    data = await (controller as any)[action](actionProps)
  } catch (e) {
    return respond(500, {
      error: 'Internal server error',
    })
  }

  if (!data) {
    return respond(requestMethod === 'POST' ? 201 : 204, '')
  }

  return respond(requestMethod === 'POST' ? 201 : 200, data)
}

const makeResponse = (adapter: RequestAdapter) => (status: number, body: any) => {
  adapter.setStatus(status)
  adapter.sendBody(body ? JSON.stringify(body) : '')
}
