import { defineType, defineField } from 'sanity'
import {LockIcon} from '@sanity/icons'

export default defineType({
  name: 'legalPage',
  title: 'Legal Pages',
  type: 'document',
  icon: LockIcon,
  groups: [
    {name: 'overview', title: 'Page details', default: true},
    {name: 'content', title: 'Policy content'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'overview',
      description: 'e.g., Privacy Policy or Terms of Service',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: { source: 'title' },
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'string',
      group: 'overview',
      initialValue: 'January 2026',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
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
