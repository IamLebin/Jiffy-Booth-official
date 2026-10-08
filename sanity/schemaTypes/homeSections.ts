import {defineField, defineType} from 'sanity'
import {CogIcon, HomeIcon, ImagesIcon} from '@sanity/icons'

const heroFields = [
  defineField({name: 'title', title: 'Document title', type: 'string', hidden: true, initialValue: 'Hero Section'}),
  defineField({name: 'sectionTitle', title: 'Section title', type: 'string', description: 'Optional heading shown above this homepage section.'}),
  defineField({name: 'sectionSubtitle', title: 'Section subtitle', type: 'text', rows: 2, description: 'Optional supporting text shown below the section title.'}),
  defineField({name: 'heroLogo', title: 'Hero Brand Logo', type: 'image', options: {hotspot: true}}),
  defineField({name: 'heroTitle', title: 'Hero Title', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'heroBio', title: 'Hero Tagline', type: 'string', validation: (rule) => rule.required()}),
  defineField({name: 'heroBackgroundType', title: 'Hero Background Type', type: 'string', options: {list: [{title: 'Image', value: 'image'}, {title: 'Video', value: 'video'}], layout: 'radio'}, initialValue: 'image'}),
  defineField({name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}, hidden: ({parent}) => parent?.heroBackgroundType !== 'image'}),
  defineField({name: 'heroBackgroundVideo', title: 'Hero Background Video', type: 'file', options: {accept: 'video/mp4'}, hidden: ({parent}) => parent?.heroBackgroundType !== 'video'}),
]

export const homeHero = defineType({name: 'homeHero', title: 'Home Hero Section', type: 'document', icon: HomeIcon, fields: heroFields, preview: {prepare: () => ({title: 'Hero Section'})}})

export const homeTemplates = defineType({
  name: 'homeTemplates',
  title: 'Home Sample Templates',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({name: 'title', title: 'Document title', type: 'string', hidden: true, initialValue: 'Sample Templates'}),
    defineField({name: 'sectionTitle', title: 'Section title', type: 'string', initialValue: 'Our Templates'}),
    defineField({name: 'sectionSubtitle', title: 'Section subtitle', type: 'text', rows: 2}),
    defineField({name: 'templates', title: 'Sample Templates Slider', type: 'array', of: [{type: 'object', fields: [
    {name: 'title', type: 'string', title: 'Template title'},
    {name: 'designImage', type: 'image', title: 'Template image', options: {hotspot: true}, validation: (rule) => rule.required()},
  ], preview: {select: {title: 'title', media: 'designImage'}}}]})],
  preview: {prepare: () => ({title: 'Sample Templates'})},
})

export const homePortfolio = defineType({
  name: 'homePortfolio',
  title: 'Home Portfolio Photos',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({name: 'title', title: 'Document title', type: 'string', hidden: true, initialValue: 'Portfolio Photos on Homepage'}),
    defineField({name: 'sectionTitle', title: 'Section title', type: 'string', initialValue: 'Portfolio'}),
    defineField({name: 'sectionSubtitle', title: 'Section subtitle', type: 'text', rows: 3, initialValue: 'Explore our past setups and photo outputs. From 4R prints to classic strips, discover how our booths create lasting memories.'}),
    defineField({name: 'photos', title: 'Portfolio Photos on Homepage', type: 'array', description: 'Choose which photos appear in the homepage preview. The full Portfolio page still shows every photo.', of: [{type: 'reference', to: [{type: 'ourEvents'}]}]}),
  ],
  preview: {prepare: () => ({title: 'Portfolio Photos on Homepage'})},
})

export const homeTrustedLogos = defineType({
  name: 'homeTrustedLogos',
  title: 'Home Trusted By Logos',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({name: 'title', title: 'Document title', type: 'string', hidden: true, initialValue: 'Trusted By Logos'}),
    defineField({name: 'sectionTitle', title: 'Section title', type: 'string', initialValue: 'Trusted By'}),
    defineField({name: 'sectionSubtitle', title: 'Section subtitle', type: 'text', rows: 2, initialValue: 'Partnering with companies to create unforgettable memories'}),
    defineField({name: 'logos', title: 'Trusted By Logos', type: 'array', of: [{type: 'object', fields: [{name: 'name', type: 'string', title: 'Company name'}, {name: 'logo', type: 'image', title: 'Logo', options: {hotspot: true}}], preview: {select: {title: 'name', media: 'logo'}}}]}),
  ],
  preview: {prepare: () => ({title: 'Trusted By Logos'})},
})

export const homeTestimonials = defineType({
  name: 'homeTestimonials',
  title: 'Home Testimonials',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({name: 'title', title: 'Document title', type: 'string', hidden: true, initialValue: 'Testimonials'}),
    defineField({name: 'sectionTitle', title: 'Section title', type: 'string', initialValue: 'What Our Clients Say'}),
    defineField({name: 'sectionSubtitle', title: 'Section subtitle', type: 'text', rows: 2}),
    defineField({name: 'items', title: 'Testimonials', type: 'array', of: [{type: 'object', fields: [{name: 'name', type: 'string', title: 'Customer name'}, {name: 'text', type: 'text', title: 'Testimonial', rows: 4}, {name: 'rating', type: 'number', title: 'Rating', validation: (rule) => rule.min(1).max(5).integer()}], preview: {select: {title: 'name', subtitle: 'text'}}}]}),
  ],
  preview: {prepare: () => ({title: 'Testimonials'})},
})

export const homeSeo = defineType({
  name: 'homeSeo',
  title: 'Home SEO',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'title', title: 'Document title', type: 'string', hidden: true, initialValue: 'SEO'}),
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'}),
  ],
  preview: {prepare: () => ({title: 'Home SEO'})},
})

export const homeSettings = defineType({
  name: 'homeSettings',
  title: 'Home Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'title', title: 'Document title', type: 'string', hidden: true, initialValue: 'Homepage Settings'}),
    defineField({name: 'sectionVisibility', title: 'Section Visibility', type: 'object', fields: [
      {name: 'services', title: 'Services', type: 'boolean', initialValue: true},
      {name: 'trustedBy', title: 'Trusted By', type: 'boolean', initialValue: true},
      {name: 'testimonials', title: 'Testimonials', type: 'boolean', initialValue: true},
      {name: 'portfolio', title: 'Portfolio', type: 'boolean', initialValue: true},
    ]}),
  ],
  preview: {prepare: () => ({title: 'Homepage Settings'})},
})

export const homeSectionTypes = [homeHero, homeTemplates, homePortfolio, homeTrustedLogos, homeTestimonials, homeSeo, homeSettings]
