import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  icon: HelpCircleIcon,
  groups: [
    {name: 'intro', title: 'Page introduction', default: true},
    {name: 'questions', title: 'Questions & answers'},
  ],
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'FAQ', group: 'intro' }),
    defineField({ 
      name: 'subtitle', 
      title: 'Page Subtitle', 
      type: 'text', 
      group: 'intro',
      rows: 2, 
      initialValue: 'Everything you need to know about booking Jiffy Booth.' 
    }),
    defineField({
      name: 'faqs',
      title: 'Questions & Answers',
      type: 'array',
      group: 'questions',
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
  ],
})
