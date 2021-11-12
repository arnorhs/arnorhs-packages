import md5 from 'md5'
import { Post, WpPost } from '../types'

export const transformWp = (o: WpPost): Post => {
  const {
    post_date: publishedDate,
    post_content: postContent,
    post_excerpt: summary,
    post_title: title,
    post_status: status,
    post_name: permalink,
    post_modified: modifiedDate,
  } = o

  const html = fromWordPressHtml(postContent)

  const metaData = {
    modifiedDate,
    status,
    summary,
    title,
  }

  const date = new Date(publishedDate)
  const dateStr = date.toISOString().substring(0, 10)

  const urlSlug = `${dateStr}/${permalink}`

  const contentHash = md5(`${permalink}:${metaData.title}`)

  return { meta: metaData, urlSlug, html, permalink, date, contentHash }
}

const fromWordPressHtml = (postContent: string) => {
  // WP's post content comes with newlines for paragraphs
  return postContent
    .split(/\n\n|\r\n\r\n/)
    .map((s) => `<p>${s}</p>`)
    .join('\n')
    .replace(/http:\/\//gi, 'https://')
}
