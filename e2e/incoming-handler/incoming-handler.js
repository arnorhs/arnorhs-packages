const { nodeHttpAdapter } = require('../../pkg/incoming-handler/dist/adapters/node.cjs')
const { createInstance, Controller } = require('../../pkg/incoming-handler/dist/index.cjs')

class Ctrl extends Controller {
  getSomething() {}
}
console.log('defined something')

console.log(
  createInstance({
    controllers: [new Ctrl()],
    adapter: nodeHttpAdapter,
  }),
)
