import { Method } from './types'

export abstract class RequestAdapter {
  abstract getPath(): string
  abstract getMethod(): Method
  abstract hasPostBody(): boolean
  abstract getPostBodyContent(): Promise<unknown>
  abstract setHeader(key: string, val: string): void
  abstract setStatus(status: number): void
  abstract sendBody(payload: any): void
}
