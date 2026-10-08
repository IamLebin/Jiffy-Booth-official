import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export default defineType({
  name: 'advicePage',
  title: 'Advice Page SEO',
  type: 'document',
  icon: BookIcon,
  fields: [defineField({name: 'title', title: 'Document title', type: 'string', hidden: true, initialValue: 'Advice SEO'}), defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'})],
  preview: {prepare: () => ({title: 'Advice SEO'})},
})