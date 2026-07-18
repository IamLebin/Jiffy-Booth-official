/* eslint-disable @typescript-eslint/no-explicit-any */
import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'ourEvents',
  title: 'Our Events',
  type: 'document',
  icon: ImagesIcon,
  groups: [
    {name: 'details', title: 'Event details', default: true},
    {name: 'media', title: 'Photos'},
    {name: 'display', title: 'Display settings'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      group: 'details',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: {source: 'title'},
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'details',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'details',
      rows: 4,
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      group: 'media',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'display',
      description: 'Lower numbers appear first on the listing page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
