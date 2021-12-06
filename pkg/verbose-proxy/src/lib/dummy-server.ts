import http, { IncomingMessage, ServerResponse } from 'http'
import { getBody } from './getBody'

const getStatus = (strStatus: string) => {
  if (!strStatus) {
    return 200
  }

  const num = parseInt(strStatus, 10)

  if (isNaN(num) || num < 100 || num >= 600) {
    return 200
  }

  return Math.floor(num)
}

const retTypes: { [key: string]: string } = {
  json: 'json',
  html: 'html',
}

const getPathOpts = (req: IncomingMessage) => {
  const pathname = req.url ?? ''

  const [statusStr, typeInp] = pathname.split('/').filter(Boolean)

  const status = getStatus(statusStr)

  const type = (typeInp && retTypes[typeInp]) ?? retTypes.json

  return {
    status,
    type,
  }
}

const dummyReqHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const { status, type } = getPathOpts(req)

  const contentType = type === retTypes.json ? 'application/json' : 'text/html'

  res.setHeader('Content-type', contentType)

  res.writeHead(status)
  res.end(
    type === retTypes.json
      ? JSON.stringify({
          boolean: true,
          number: 1337,
          text: 'ok',
          date: new Date(),
        })
      : '<!DOCTYPE html><html><body>I am html body</body></html>',
  )
}

export const startDummyServer = (port: number) => {
  http.createServer(dummyReqHandler).listen(port)
}
