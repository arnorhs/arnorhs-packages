import { IncomingMessage, ServerResponse } from 'http'
import HttpProxy, { ServerOptions } from 'http-proxy'
import { colors, makeColorScheme, moreColors } from './colors'
import { getBody } from './getBody'

const NL = '\n'

enum InOut {
  IN = 'in',
  OUT = 'out',
}

const [date, title] = makeColorScheme([colors.FgGreen, moreColors.sixteen.BrightGreen])

type Headers = { [key: string]: string }

export const startProxy = (port: number, target: string, opts: ServerOptions) => {
  const proxy = HttpProxy.createProxyServer({
    target,
    changeOrigin: true,
  })

  proxy.on('proxyReq', async (proxyReq, req, res: ServerResponse) => {
    log(date(new Date().toISOString()) + ' ' + title(`[${req.method ?? '?'}] ${req.url ?? '?'}`))

    const printer = new Printer(InOut.IN, moreColors.sixteen.BrightYellow, colors.FgYellow)
    printer.printHeaders(proxyReq.getHeaders() as Headers)

    const body = await getBody(req)

    const contentType = proxyReq.getHeader('Content-type')?.toString() || ''
    const isJson = contentType.startsWith('application/json')
    if (isJson) {
      printer.printJson(body)
    } else {
      printer.printBody(body)
    }
  })

  proxy.on('proxyRes', async (proxyRes, req, res) => {
    const printer = new Printer(InOut.OUT, moreColors.sixteen.BrightMagenta, colors.FgMagenta)
    printer.printHeaders(proxyRes.headers as Headers)

    const body = await getBody(proxyRes)

    const isJson = findContentType(proxyRes.headers).startsWith('application/json')

    if (isJson) {
      printer.printJson(body)
    } else {
      printer.printBody(body)
    }
  })

  console.log(`Starting verbose-proxy on port ${port}...`)
  proxy.listen(port)
}

const findContentType = (hdrs: IncomingMessage['headers']): string => {
  for (const [key, val] of Object.entries(hdrs)) {
    if (key.toLocaleLowerCase() === 'content-type') {
      return val?.toString() ?? ''
    }
  }

  return ''
}

class Printer {
  inOut: InOut
  colors: ((str: string) => string)[]

  constructor(inOut: InOut, colorTitle: string, colorMain: string) {
    this.inOut = inOut
    this.colors = makeColorScheme([colorTitle, colorMain])
  }

  private title(str: string) {
    const [color] = this.colors

    const inOutTitle = this.inOut === InOut.IN ? 'Request' : 'Response'

    const symbol = this.inOut === InOut.IN ? '->' : '<-'
    log(color(`${symbol} ${inOutTitle} ${str} ${symbol}`))
  }

  printJson(body: string) {
    let str: string = ''
    try {
      str = JSON.stringify(JSON.parse(body), undefined, 2)
    } catch (e) {
      process.stderr.write('Content-type header said json, but we could not parse as json')
      str = body
    }
    this.printBody(str)
  }

  private line(str: string) {
    const [_, color] = this.colors

    log('   ' + color(str))
  }

  printBody(body: string) {
    if (!body) {
      return
    }

    this.title('body')

    for (const line of body.split(/[\n|\r]+/).filter(Boolean)) {
      this.line(line)
    }
  }

  printHeaders(headers: Headers) {
    this.title('headers')

    for (const [key, val] of Object.entries(headers)) {
      this.line(`${key}: ${val}`)
    }
  }
}

const log = (str: string) => {
  process.stdout.write(str + NL)
}
