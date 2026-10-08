import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page Content',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({name: 'title', title: 'Page title', type: 'string', initialValue: 'Portfolio'}),
    defineField({name: 'intro', title: 'Page introduction', type: 'text', rows: 3}),
    defineField({
      name: 'categories',
      title: 'Event Categories',
      type: 'array',
      description: 'Choose the Portfolio Category documents used by the Portfolio page and homepage quick filters.',
      of: [{type: 'reference', to: [{type: 'portfolioCategory'}]}],
    }),
  ],
  preview: {select: {title: 'title'}},
})
