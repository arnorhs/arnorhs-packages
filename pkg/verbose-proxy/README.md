# Verbose-proxy

Simple webserver that can act as a proxy as well, to just intercept and see what
a request looks like, both in terms of request and response

By default it runs a little fake server that can return a customized response. See
'dummy server' section below

## Usage / Installation

You don't actually have to install it, you can simply run it via:

```sh
npx verbose-proxy
```

Or you can install it globallyo

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
