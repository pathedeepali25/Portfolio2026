import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'auto-slug',
      project: '5p1ezhbv',
      event: {
        on: ['create', 'update'],
        filter: "_type == 'article' && !defined(slug.current)",
        projection: '{_id, _type, title, "slug": slug}',
      },
    }),
  ],
})
