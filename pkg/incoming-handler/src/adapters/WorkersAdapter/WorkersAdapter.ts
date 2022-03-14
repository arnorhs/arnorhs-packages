import { Method } from '../../types'
import { RequestAdapter } from '../../RequestAdapter'
import { FetchEvent } from './types'

const hasPostBodyTypes = ['PUT', 'POST', 'PATCH']

export class WorkersAdapter extends RequestAdapter {
  private readonly event: FetchEvent
  private readonly req: Request
  private status: number = 404
  private headers: { [key: string]: string } = {}

  constructor(event: FetchEvent) {
    super()
    this.event = event
    this.req = event.request
  }

  getMethod() {
    return this.req.method as Method
  }

  getPath() {
    if (this.req.url.match(/^http[s]?:\/\//)) {
      const url = new URL(this.req.url)
      return url.pathname
    }
    return this.req.url
  }

  hasPostBody() {
    return hasPostBodyTypes.indexOf(this.getMethod()) >= 0
  }

  sendBody(data: string) {
    this.event.respondWith(
      new Response(data, {
        headers: this.headers,
        status: this.status,
      }),
    )
  }

  setHeader(key: string, val: string) {
    this.headers[key] = val
  }

  setStatus(status: number) {
    this.status = status
  }

  async getPostBodyContent() {
    return this.req.json()
  }
}
