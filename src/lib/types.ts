export type Meta = Record<string, string>

export interface MdFile {
  filename: string
  html: string
  metadata: Meta
}

export interface WpPost {
  post_date: string
  post_content: string
  post_excerpt: string
  post_title: string
  post_status: string
  post_name: string
  post_modified: string
  post_type: string
}

export interface Post extends Record<string, unknown> {
  urlSlug: string
  html: string
  permalink: string
  date: Date
  contentHash: string
  meta: Meta
}
