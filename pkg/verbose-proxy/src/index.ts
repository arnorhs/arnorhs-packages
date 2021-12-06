import { startProxy } from './lib/proxy'
import { startDummyServer } from './lib/dummy-server'
import { command } from './lib/command'

const DUMMYPORT = 8899

// something something check if server running
const { port, target } = command()

if (target === 'dummy') {
  startDummyServer(DUMMYPORT)
}

const url = target === 'dummy' ? `http://localhost:${DUMMYPORT}` : target

startProxy(parseInt(port, 10), url, {
  // expose options through command one day
})
