import { Method } from '../../types'
import { RequestAdapter } from '../../RequestAdapter'
import { HandlerContext, HandlerEvent, HandlerResponse } from '@netlify/functions'

const hasPostBodyTypes = ['PUT', 'POST', 'PATCH']

export class LambdaAdapter extends RequestAdapter {
  private readonly event: HandlerEvent
  private readonly context: HandlerContext
  private readonly response: HandlerResponse = {
    statusCode: 404,
    body: '',
  }

  constructor(event: HandlerEvent, context: HandlerContext) {
    super()
    this.event = event
    this.context = context
  }

  getMethod() {
    if (!this.event.httpMethod) {
      throw new Error('unknowable request method')
    }

    return this.event.httpMethod as Method
  }

  getPath() {
    return this.event.path
  }

  hasPostBody() {
    return hasPostBodyTypes.indexOf(this.getMethod()) >= 0
  }

  sendBody(data: string) {
    this.response.body = data
  }

  setHeader(key: string, val: string) {
    if (!this.response.headers) {
      this.response.headers = {}
    }

    this.response.headers[key] = val
  }

  setStatus(status: number) {
    this.response.statusCode = status
  }

  async getPostBodyContent() {
    return this.event.body
  }

  getLambdaResponse() {
    return this.response
  }
}
