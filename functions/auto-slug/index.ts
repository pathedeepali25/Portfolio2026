import { documentEventHandler } from '@sanity/functions'
import { createClient } from '@sanity/client'

interface ArticleEvent {
  _id: string
  _type: string
  title?: string
  slug?: { current?: string }
}

export const handler = documentEventHandler<ArticleEvent>(async ({ context, event }) => {
  const doc = event.data

  // Skip if slug is already set
  if (doc.slug?.current) return

  // Skip if no title to derive from
  if (!doc.title?.trim()) return

  const slug = doc.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 96)

  const client = createClient({
    apiVersion: '2023-05-03',
    ...context.clientOptions,
  })

  await client
    .patch(doc._id)
    .setIfMissing({ slug: { _type: 'slug', current: slug } })
    .commit({ autoGenerateArrayKeys: true })

  console.log(`auto-slug: set "${slug}" on ${doc._id}`)
})
