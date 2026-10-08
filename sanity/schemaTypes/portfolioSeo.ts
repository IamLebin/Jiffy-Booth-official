import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'portfolioSeo',
  title: 'Portfolio SEO',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'documentTitle', title: 'Document title', type: 'string', hidden: true, initialValue: 'Portfolio SEO'}),
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'}),
  ],
  preview: {prepare: () => ({title: 'Portfolio SEO'})},
})
