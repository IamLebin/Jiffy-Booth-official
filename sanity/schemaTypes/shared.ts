import {defineField, defineType} from 'sanity'

export const linkObject = defineType({
  name: 'siteLink',
  title: 'Website Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Link label', type: 'string'}),
    defineField({
      name: 'kind',
      title: 'Link type',
      type: 'string',
      options: {list: [{title: 'Internal page', value: 'internal'}, {title: 'External URL', value: 'external'}], layout: 'radio'},
      initialValue: 'internal',
    }),
    defineField({name: 'internalPath', title: 'Internal path', type: 'string', description: 'Example: /contact-us', hidden: ({parent}) => parent?.kind !== 'internal'}),
    defineField({name: 'externalUrl', title: 'External URL', type: 'url', hidden: ({parent}) => parent?.kind !== 'external'}),
    defineField({name: 'openInNewTab', title: 'Open in new tab', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'label', subtitle: 'internalPath', externalUrl: 'externalUrl'}, prepare({title, subtitle, externalUrl}) { return {title: title || 'Untitled link', subtitle: subtitle || externalUrl || 'No destination'} }},
})

export const mediaImageObject = defineType({
  name: 'mediaImage',
  title: 'Image with metadata',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
  ],
})

export const iconNameField = defineField({
  name: 'iconName',
  title: 'Icon',
  type: 'string',
  options: {list: ['Camera', 'Sparkles', 'Users', 'Heart', 'Calendar', 'MessageCircle', 'Mail', 'Instagram', 'MapPin', 'Clock', 'Check', 'Star', 'PartyPopper']},
})

export const seoObject = defineType({
  name: 'seoSettings',
  title: 'SEO settings',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'SEO title', type: 'string', validation: (rule) => rule.max(60)}),
    defineField({name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (rule) => rule.max(160)}),
    defineField({name: 'socialImage', title: 'Social sharing image', type: 'image', options: {hotspot: true}}),
  ],
})

export const sectionObject = defineType({
  name: 'contentSection',
  title: 'Content section',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Section title', type: 'string'}),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'body', title: 'Body', type: 'blockContent'}),
    defineField({name: 'image', title: 'Image', type: 'mediaImage'}),
    defineField({name: 'link', title: 'Call to action', type: 'siteLink'}),
    defineField({name: 'background', title: 'Background', type: 'string', options: {list: [{title: 'White', value: 'white'}, {title: 'Cream', value: 'cream'}, {title: 'Light grey', value: 'grey'}, {title: 'Dark navy', value: 'dark'}]}, initialValue: 'white'}),
    defineField({name: 'visible', title: 'Visible on website', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow', media: 'image'}, prepare({title, subtitle, media}) { return {title: title || 'Untitled section', subtitle: subtitle || 'Content section', media} }},
})

export const sharedTypes = [linkObject, mediaImageObject, seoObject, sectionObject]
