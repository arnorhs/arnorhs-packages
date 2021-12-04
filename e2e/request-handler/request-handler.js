const { createInstance, Controller } = require('../../pkg/request-handler/dist')

class Ctrl extends Controller {
  getSomething() {}
}

console.log(
  createInstance({
    controllers: [new Ctrl()],
  }),
)
