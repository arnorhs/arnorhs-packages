// ex:
//-- /path/to/something
//-- /path/:id/something/:other

import { ParsedRoute } from './types'

export const parseRoute = (path: string): ParsedRoute => {
  const parts = path.split('/').filter(Boolean)

  if (parts.find((str) => !str.match(/^(:)*[0-9a-zA-Z_\-]+$/))) {
    throw new Error('Only alpha numeric characters are allowed in paths, as well as _ and -')
  }

  const params = []

  const regexParts = []

  for (const part of parts) {
    if (part.startsWith(':')) {
      params.push(part.substring(1))
      regexParts.push('/([a-zA-Z0-9_-]+)')
    } else {
      regexParts.push('/', part)
    }
  }

  return {
    regex: new RegExp('^' + regexParts.join('') + '$', 'g'),
    params,
  }
}

export const pathMathesRoute = (path: string, route: ParsedRoute): boolean => {
  return !!path.match(route.regex)
}

export type RouteValues = { [key: string]: string }

export const getPathParams = (path: string, route: ParsedRoute) => {
  const params: RouteValues = {}
  const matches = route.regex.exec(path) ?? []

  for (let i = 1; i < matches.length; i++) {
    params[route.params[i - 1]] = matches[i]
  }

  return params
}
