import {defineType, type Rule} from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Rich text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Title', value: 'h2'},
        {title: 'Heading', value: 'h3'},
        {title: 'Small heading', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
      marks: {
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
        annotations: [{type: 'object', name: 'link', title: 'Link', fields: [{name: 'href', title: 'URL', type: 'url'}, {name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: false}]}],
      },
    },
    {type: 'image', options: {hotspot: true}, fields: [{name: 'alt', title: 'Alt text', type: 'string', validation: (rule: Rule) => rule.required()}, {name: 'caption', title: 'Caption', type: 'string'}]},
  ],
})
