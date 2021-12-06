const http = require('http')

const p = (request, response) => {
  setTimeout(() => {
    //response.writeHead(500, { 'Content-Type': 'text/html' });
    response.writeHead(404, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ ok: true }))
  }, 100)
}

const server = http.createServer((request, response) => {
  const requestStart = Date.now()

  let body = []
  let requestErrorMessage = null

  const getChunk = (chunk) => body.push(chunk)
  const assembleBody = () => {
    body = Buffer.concat(body).toString()
  }
  const getError = (error) => {
    requestErrorMessage = error.message
  }

  request.on('data', getChunk)
  request.on('end', assembleBody)
  request.on('error', getError)

  const logClose = () => {
    removeHandlers()
    log(request, response, 'Client aborted.', requestStart, body)
  }
  const logError = (error) => {
    removeHandlers()
    log(request, response, error.message, requestStart, body)
  }
  const logFinish = () => {
    removeHandlers()
    log(request, response, requestErrorMessage, requestStart, body)
  }
  response.on('close', logClose)
  response.on('error', logError)
  response.on('finish', logFinish)

  const removeHandlers = () => {
    request.off('data', getChunk)
    request.off('end', assembleBody)
    request.off('error', getError)
    response.off('close', logClose)
    response.off('error', logError)
    response.off('finish', logFinish)
  }

  p(request, response)
})

const log = (request, response, errorMessage, requestStart, body) => {
  const { rawHeaders, httpVersion, method, socket, url } = request
  const { remoteAddress, remoteFamily } = socket

  const { statusCode, statusMessage } = response
  const processingTime = Date.now() - requestStart

  console.log('==========================================')
  console.log(
    new Date().toISOString().substring(0, 19),
    `[${method}]`,
    url,
    `(${statusCode} ${statusMessage}, ${processingTime}ms)`,
  )

  for (let i = 0; i < rawHeaders.length; i += 2) {
    console.log(`  ${rawHeaders[i]}: ${rawHeaders[i + 1]}`)
  }

  console.log('-- body start --')
  console.log(body)
  console.log('-- body end --')
}

const listen = (port) => {
  server.listen(port)
  console.log(`server listening on port ${port}`)
}

listen(process.env.PORT || 8889)
