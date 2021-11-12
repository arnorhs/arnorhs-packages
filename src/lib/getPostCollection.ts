import { transformMd, transformWp } from './transformers'
import { Post, WpPost } from './types'
import { resolvePath, readDir, readFile } from './util'
import { Collection } from './Collection'
import { loadFront } from './yfm'
import { Remarkable } from 'remarkable'

// jeez.. rollup please save me
const rootDir = resolvePath(__dirname, __filename.endsWith('.ts') ? '../..' : '..')

const markdownPath = resolvePath(rootDir, 'content/md')
const wpPath = resolvePath(rootDir, 'content/wp/wpposts.json')
const utf8 = { encoding: 'utf-8' as BufferEncoding }
const remarkable = new Remarkable()

const getLegacyPosts = async (): Promise<Post[]> => {
  const posts = JSON.parse(await readFile(wpPath, utf8)) as WpPost[]
  return posts
    .filter((p) => p.post_type === 'post' && p.post_status === 'publish')
    .map((x) => transformWp(x))
}

const getMarkdownPosts = async (): Promise<Post[]> => {
  const files = await readDir(markdownPath, utf8)

  return (
    await Promise.all(
      files
        .filter((fn) => fn.match(/\.md$/))
        .map(async (fn) => ({
          contents: await readFile(`${markdownPath}/${fn}`, utf8),
          fn,
        })),
    )
  )
    .map(({ fn, contents }) => {
      const { __content, ...frontmatter } = loadFront(contents)

      return {
        filename: fn,
        html: remarkable.render(__content),
        metadata: frontmatter,
      }
    })
    .map((x) => transformMd(x))
}

export const getPostCollection = async (): Promise<Collection<Post>> => {
  const [mdPosts, wpPosts] = await Promise.all([getMarkdownPosts(), getLegacyPosts()])

  return new Collection([...mdPosts, ...wpPosts])
}
