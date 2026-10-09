import {defineField, defineType, type Rule} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', hidden: true, initialValue: 'FAQ' }),
    defineField({ 
      name: 'subtitle', 
      title: 'Page Subtitle', 
      type: 'text', 
      rows: 2, 
      initialValue: 'Everything you need to know about booking Jiffy Booth.' 
    }),
    defineField({
      name: 'faqs',
      title: 'Questions & Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer', rows: 4 }
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'FAQ Categories',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'title', title: 'Category name', type: 'string', validation: (rule: Rule) => rule.required()},
        {name: 'order', title: 'Display order', type: 'number', initialValue: 0},
        {name: 'faqs', title: 'Questions', type: 'array', of: [{type: 'object', fields: [
          {name: 'question', title: 'Question', type: 'string', validation: (rule: Rule) => rule.required()},
          {name: 'answer', title: 'Answer', type: 'blockContent', validation: (rule: Rule) => rule.required()},
          {name: 'order', title: 'Display order', type: 'number', initialValue: 0},
        ], preview: {select: {title: 'question'}}}]}], preview: {select: {title: 'title'}}}],
    }),
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'FAQ',
        subtitle: subtitle ? 'FAQ page' : undefined,
      }
    },
  },
})
