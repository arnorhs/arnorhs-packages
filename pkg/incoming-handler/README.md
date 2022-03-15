# Incoming handler

Because who needs a name

## What is it?

It's a barebones way to write server api logic using the classic controller pattern,
with very limited ceremony and very flexible to use and set up.

It's also been designed in a way to make it easy to deploy both as a traditional node
server instance, or a lambda function or a cloudflare workers fetch handler

## Installation

```sh
yarn add incoming-handler
```

## Example usage

```typescript
import { createInstance } from 'incoming-handler'
import type { Controller, RequestAdapter, GET, POST, hook } from 'incoming-handler'
import { fetchThing, saveThing } from './libs/my-example-thing-fetcher'

@hook('beforeRespond', (adapter: RequestAdapter) => {
  adapter.setHeader('X-Global-Header': 'always inject this')
})
class ThingController extends Controller {
  @GET('/thing/:id')
  async getThing({ params }) {
    const thing = fetchThing(params.id)
    return {
      ...thing,
    }
  }

  @POST('/thing/:id')
  async saveThing({ params, body }) {
    return saveThing(params.id, {
      ...body,
    })
  }
}

import { nodeHttpAdapter } from 'incoming-handler/adapter-node'
const controllers = [ new ThingController() ]
const startServer = createInstance({ controllers, adapter: nodeHttpAdapter })

// If you want to start a local node server:
startServer({
  host: 'localhost',
  port: 1337,
})

// or exposing to lambda handler:
export.handler = createInstance({ controllers, adapter: lambdaAdapter })

// or implementing a fetch event handler in cloudflare workers:
addEventListener('fetch', createInstance({ controllers, adapter: lambdaAdapter }))
```

## TODOs

- support nested routes through controller decorator mapping
- cleaning up the controller action props and perhaps figuring out a way to type
  them properly.

## Contributions

Contributions are welcome.

## License

MIT
