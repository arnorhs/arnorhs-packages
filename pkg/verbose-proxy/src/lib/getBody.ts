import { Stream } from 'stream'

export const getBody = (req: Stream): Promise<string> => {
  return new Promise((resolve, reject) => {
    const body: Buffer[] = []
    req.on('data', (chunk: Buffer) => body.push(chunk))
    req.on('end', () => resolve(Buffer.concat(body).toString()))
    req.on('error', reject)
  })
}
