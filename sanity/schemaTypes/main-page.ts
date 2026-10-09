import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: 'mainPage',
  title: 'Main Page Content',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroLogo',
      title: 'Hero Brand Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroBio',
      title: 'Hero Tagline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroBackgroundType',
      title: 'Hero Background Type',
      type: 'string',
      options: {list: [{title: 'Image', value: 'image'}, {title: 'Video', value: 'video'}], layout: 'radio'},
      initialValue: 'image',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.heroBackgroundType !== 'image',
    }),
    defineField({
      name: 'heroBackgroundVideo',
      title: 'Hero Background Video',
      type: 'file',
      options: {accept: 'video/mp4'},
      hidden: ({parent}) => parent?.heroBackgroundType !== 'video',
    }),
    defineField({
      name: 'templates',
      title: 'Sample Templates Slider',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Template title'},
          {name: 'designImage', type: 'image', title: 'Template image', options: {hotspot: true}, validation: (rule) => rule.required()},
        ],
        preview: {select: {title: 'title', media: 'designImage'}},
      }],
    }),
    defineField({
      name: 'brands',
      title: 'Partner Logos',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'name', type: 'string', title: 'Partner name'},
        {name: 'logo', type: 'image', title: 'Logo', options: {hotspot: true}},
      ], preview: {select: {title: 'name', media: 'logo'}}}],
    }),
    defineField({
      name: 'testimonials',
      title: 'Client Testimonials',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'name', type: 'string', title: 'Customer name'},
        {name: 'text', type: 'text', title: 'Testimonial', rows: 4},
        {name: 'rating', type: 'number', title: 'Rating', validation: (rule) => rule.min(1).max(5).integer()},
      ], preview: {select: {title: 'name', subtitle: 'text'}}}],
    }),
    defineField({
      name: 'sectionVisibility',
      title: 'Section Visibility',
      type: 'object',
      fields: [
        {name: 'services', title: 'Services', type: 'boolean', initialValue: true},
        {name: 'trustedBy', title: 'Trusted By', type: 'boolean', initialValue: true},
        {name: 'testimonials', title: 'Testimonials', type: 'boolean', initialValue: true},
        {name: 'portfolio', title: 'Portfolio', type: 'boolean', initialValue: true},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'heroBio',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Home',
        subtitle: subtitle ? 'Homepage content' : undefined,
      }
    },
  },
})
