# Verbose-proxy

A very useful simple http server that responds to any web request and
prints details about it to the console and responds with an appropriate 200 msg etc

It's simple to run and nice when you want to:

- debug a web request that might not be happening in a browser
- debug a web hook
- debug the exchange between two servers since you can use it as a sort of a simple MITM
  proxy when debugging stuff

By default it runs a little fake server that can return a customized response. See
'dummy server' section below

## Usage / Installation

You don't actually have to install it, you can simply run it via:

```sh
npx verbose-proxy
```

Or you can install it globally

```sh
npm i -g verbose-proxy
```

## Help menu

```sh
Usage: verbose-proxy [options]

Options:
      --version  Show version number                                   [boolean]
      --target   proxy target                        [string] [default: "dummy"]
      --port     which port to listen to              [number] [default: "8889"]
  -h, --help     Show help                                             [boolean]

Examples:
  verbose-proxy --port=8901  Start verbose-proxy on port 8901
```

## Dummy server

The dummy server is quite simple. You can query any url with any content type etc
but if you want a specific response you can query eg. `curl http://localhost:8889/418/json`
if you want to get a 418 response.

It's a bit dumb and won't actually change the response, other than return the status code.

it has two types of response bodies.. application/json and text/html, with a corresponding
dummy return value

## TODO:

- adding some unit tests
- add more functionality to the dummy server
- add more options to customize the underlying http-proxy instance

## Contributions

Any contribution is welcome, pull request, issues, ideas etc.

## License

MIT
