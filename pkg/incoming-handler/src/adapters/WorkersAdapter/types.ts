// TODO: bring in the type from cloudflare's workers types package
export interface FetchEvent {
  type: string
  request: Request
  respondWith: (res: Response | Promise<Response>) => void
  waitUntil: (p: Promise<void>) => void
}

export interface FetchEventHandler {
  (event: FetchEvent): void
}
