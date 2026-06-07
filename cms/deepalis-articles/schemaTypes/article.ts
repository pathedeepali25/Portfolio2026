import {defineType, defineField} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Articles',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Deepali Pathe',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Product Design', value: 'product-design'},
          {title: 'UX Research', value: 'ux-research'},
          {title: 'Design Systems', value: 'design-systems'},
          {title: 'Career Growth', value: 'career-growth'},
          {title: 'Productivity', value: 'productivity'},
          {title: 'Design Psychology', value: 'design-psychology'},
          {title: 'Case Study', value: 'case-study'},
        ],
      },
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'number',
      description: 'Minutes',
    }),

    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),

    defineField({
      name: 'content',
      title: 'Article Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      subtitle: 'category',
    },
  },
})