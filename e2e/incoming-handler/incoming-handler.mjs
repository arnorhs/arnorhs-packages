import { nodeHttpAdapter } from '../../pkg/incoming-handler/dist/adapters/node/index.js'
import { Controller, createInstance } from '../../pkg/incoming-handler/dist/index.esm.js'

class Ctrl extends Controller {
  getSomething() {}
}

console.log(
  createInstance({
    controllers: [new Ctrl()],
    adapter: nodeHttpAdapter,
  }),
)

console.log('done ts')
