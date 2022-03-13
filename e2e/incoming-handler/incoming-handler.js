const { nodeHttpAdapter } = require('../../pkg/incoming-handler/dist/adapters/node')
const { createInstance, Controller } = require('../../pkg/incoming-handler/dist/')

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

console.log('done')
