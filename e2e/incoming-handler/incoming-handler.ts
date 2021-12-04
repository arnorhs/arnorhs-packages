import { Controller, createInstance } from '../../pkg/incoming-handler/dist'

class Ctrl extends Controller {
  getSomething() {}
}

console.log(
  createInstance({
    controllers: [new Ctrl()],
  }),
)
