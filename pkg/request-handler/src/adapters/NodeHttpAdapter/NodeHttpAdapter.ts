import { IncomingMessage, ServerResponse } from 'http'
import { Method } from '../../types'
import { RequestAdapter } from '../../RequestAdapter'

const hasPostBodyTypes = ['PUT', 'POST', 'PATCH']

export class NodeHttpAdapter extends RequestAdapter {
  private readonly req: IncomingMessage
  private readonly res: ServerResponse

  constructor(req: IncomingMessage, res: ServerResponse) {
    super()
    this.req = req
    this.res = res
  }

  getMethod() {
    if (!this.req.method) {
      throw new Error('unknowable request method')
    }

    return this.req.method as Method
  }

  getPath() {
    return this.req.url ?? ''
  }

  hasPostBody() {
    return hasPostBodyTypes.indexOf(this.req.method ?? '') >= 0
  }

  sendBody(data: string) {
    this.res.end(data)
  }

  setHeader(key: string, val: string) {
    this.res.setHeader(key, val)
  }

  setStatus(status: number) {
    this.res.writeHead(status)
  }

  getPostBodyContent() {
    return new Promise((resolve, reject) => {
      let body: string[] = []
      this.req.on('data', (chunk) => {
        body.push(chunk.toString()) // convert Buffer to string
      })

      this.req.on('end', () => {
        let json
        try {
          json = JSON.parse(body.join(''))

          resolve(json)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}
