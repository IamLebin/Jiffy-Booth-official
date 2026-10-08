import { defineType, defineField } from 'sanity'
import {LockIcon} from '@sanity/icons'

export default defineType({
  name: 'legalPage',
  title: 'Legal Pages',
  type: 'document',
  icon: LockIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'e.g., Privacy Policy or Terms of Service',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'string',
      initialValue: 'January 2026',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string' },
          { name: 'content', title: 'Content', type: 'text' }
        ],
        preview: {select: {title: 'heading', subtitle: 'content'}},
      }]
    }),
  ],
})
