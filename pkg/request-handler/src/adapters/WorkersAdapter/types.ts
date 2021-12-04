export interface FetchEvent {
  type: string
  request: Request
  respondWith: (res: Response | Promise<Response>) => void
  waitUntil: (p: Promise<void>) => void
}

export interface FetchEventHandler {
  (event: FetchEvent): void
}
