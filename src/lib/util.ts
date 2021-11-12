import { promisify } from 'util'
import { readdir as rd, readFile as rf } from 'fs'
import { resolve } from 'path'

export const readDir = promisify(rd)
export const readFile = promisify(rf)
export const resolvePath = resolve
