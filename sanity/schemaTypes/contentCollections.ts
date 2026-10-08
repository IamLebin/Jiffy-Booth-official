import {defineField, defineType} from 'sanity'
import {BookIcon, CommentIcon, ImagesIcon, TagIcon} from '@sanity/icons'

const displayFields = [
  defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 0}),
  defineField({name: 'published', title: 'Published', type: 'boolean', initialValue: true}),
  defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false}),
]

export const testimonial = defineType({
  name: 'testimonial', title: 'Testimonial', type: 'document', icon: CommentIcon,
  fields: [
    defineField({name: 'customerName', title: 'Customer name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'eventName', title: 'Company or event', type: 'string'}),
    defineField({name: 'quote', title: 'Testimonial', type: 'text', rows: 5, validation: (rule) => rule.required()}),
    defineField({name: 'photo', title: 'Customer photo or logo', type: 'mediaImage'}),
    defineField({name: 'rating', title: 'Rating', type: 'number', validation: (rule) => rule.min(1).max(5).integer()}),
    defineField({name: 'category', title: 'Category', type: 'string'}),
    ...displayFields,
  ],
  preview: {select: {title: 'customerName', subtitle: 'eventName', media: 'photo'}},
})

export const trustedLogo = defineType({
  name: 'trustedLogo', title: 'Trusted by logo', type: 'document', icon: TagIcon,
  fields: [
    defineField({name: 'companyName', title: 'Company name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'logo', title: 'Logo', type: 'mediaImage', validation: (rule) => rule.required()}),
    defineField({name: 'website', title: 'Website', type: 'url'}),
    ...displayFields,
  ],
  preview: {select: {title: 'companyName', media: 'logo'}},
})

export const articleCategory = defineType({
  name: 'articleCategory', title: 'Article category', type: 'document', icon: TagIcon,
  fields: [defineField({name: 'title', title: 'Category name', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}), defineField({name: 'description', title: 'Description', type: 'text', rows: 3}), defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 0})],
  preview: {select: {title: 'title', subtitle: 'description'}},
})

export const article = defineType({
  name: 'article', title: 'Article', type: 'document', icon: BookIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3}),
    defineField({name: 'featuredImage', title: 'Featured image', type: 'mediaImage'}),
    defineField({name: 'body', title: 'Article body', type: 'blockContent', validation: (rule) => rule.required()}),
    defineField({name: 'author', title: 'Author', type: 'string'}),
    defineField({name: 'publishedAt', title: 'Published date', type: 'datetime'}),
    defineField({name: 'categories', title: 'Categories', type: 'array', of: [{type: 'reference', to: [{type: 'articleCategory'}]}]}),
    defineField({name: 'tags', title: 'Tags', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'seo', title: 'SEO', type: 'seoSettings'}),
    defineField({name: 'published', title: 'Published', type: 'boolean', initialValue: false}),
    defineField({name: 'featured', title: 'Featured article', type: 'boolean', initialValue: false}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 0}),
  ],
  preview: {select: {title: 'title', subtitle: 'author', media: 'featuredImage'}},
})

export const portfolioCategory = defineType({
  name: 'portfolioCategory', title: 'Portfolio category', type: 'document', icon: TagIcon,
  fields: [defineField({name: 'title', title: 'Category name', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}), defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 0})],
  preview: {select: {title: 'title'}},
})

export const portfolioProject = defineType({
  name: 'portfolioProject', title: 'Portfolio project', type: 'document', icon: ImagesIcon,
  fields: [
    defineField({name: 'title', title: 'Project title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'eventName', title: 'Event name', type: 'string'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'eventDate', title: 'Event date', type: 'date'}),
    defineField({name: 'category', title: 'Category', type: 'reference', to: [{type: 'portfolioCategory'}]}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({name: 'tags', title: 'Tags', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'images', title: 'Project images', type: 'array', of: [{type: 'mediaImage'}], validation: (rule) => rule.min(1)}),
    defineField({name: 'featuredImage', title: 'Featured image', type: 'mediaImage'}),
    ...displayFields,
  ],
  preview: {select: {title: 'title', subtitle: 'eventName', media: 'featuredImage'}},
})

export const faqCategory = defineType({
  name: 'faqCategory', title: 'FAQ category', type: 'document', icon: TagIcon,
  fields: [defineField({name: 'title', title: 'Category name', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}), defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 0})],
  preview: {select: {title: 'title'}},
})

export const faqItem = defineType({
  name: 'faqItem', title: 'FAQ item', type: 'document', icon: TagIcon,
  fields: [defineField({name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'answer', title: 'Answer', type: 'blockContent', validation: (rule) => rule.required()}), defineField({name: 'category', title: 'Category', type: 'reference', to: [{type: 'faqCategory'}]}), defineField({name: 'relatedLink', title: 'Related link', type: 'siteLink'}), ...displayFields],
  preview: {select: {title: 'question', subtitle: 'category.title'}},
})

export const collectionTypes = [testimonial, trustedLogo, articleCategory, article, portfolioCategory, portfolioProject, faqCategory, faqItem]
