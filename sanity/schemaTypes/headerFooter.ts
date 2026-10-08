import type { Rule } from 'sanity'
import {CogIcon} from '@sanity/icons'

const headerFooter = {
  name: 'headerFooter',
  title: 'Header & Footer Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    // --- HEADER SECTION ---
    {
      name: 'headerSection',
      title: 'Header Section',
      type: 'object',
      options: {collapsible: true},
      fields: [
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          options: { hotspot: true },
          validation: (rule: Rule) => rule.required()
        },
        {
          name: 'navigationLinks',
          title: 'Navigation Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Link Name', type: 'string', validation: (rule: Rule) => rule.required() },
                { name: 'href', title: 'Link URL', type: 'string', validation: (rule: Rule) => rule.required() },
                { name: 'iconName', title: 'Icon', type: 'string', options: {list: ['Home', 'Camera', 'Images', 'BookOpen', 'HelpCircle', 'Mail']} },
                { name: 'visible', title: 'Visible', type: 'boolean', initialValue: true },
              ],
              preview: {select: {title: 'name', subtitle: 'href'}},
            }
          ]
        }
      ]
    },

    // --- FOOTER SECTION ---
    {
      name: 'footerSection',
      title: 'Footer Section',
      type: 'object',
      options: {collapsible: true},
      fields: [
        {
          name: 'companyName',
          title: 'Company Name',
          type: 'string',
          initialValue: 'Jiffy Booth',
            validation: (rule: Rule) => rule.required()
        },
        {
          name: 'tagline',
          title: 'Tagline/Description',
          type: 'text',
          rows: 3,
          initialValue: '"Capturing a jiffy that lasts forever."',
          validation: (rule: Rule) => rule.required()
        },
        {
          name: 'socialLinks',
          title: 'Social Media Links',
          type: 'object',
          fields: [
            { name: 'instagram', title: 'Instagram URL', type: 'url' },
            { name: 'tiktok', title: 'TikTok URL', type: 'url' },
            { name: 'xiaohongshu', title: 'Xiaohongshu URL', type: 'url' }
          ]
        },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2026 Jiffy Ventures. All rights reserved.'
        },
        {
          name: 'footerLinks',
          title: 'Footer Links',
          type: 'array',
          of: [{type: 'siteLink'}],
        },
        {
          name: 'logo',
          title: 'Footer Logo',
          type: 'image',
          options: {hotspot: true},
        }
      ]
    },

    // --- WHATSAPP SETTINGS ---
    {
      name: 'whatsappSettings',
      title: 'WhatsApp Settings',
      type: 'object',
      options: {collapsible: true},
      fields: [
        {
          name: 'whatsappNumber',
          title: 'WhatsApp Number',
          type: 'string',
          validation: (rule: Rule) => rule.required()
        },
        {
          name: 'defaultMessage',
          title: 'Default WhatsApp Message',
          type: 'text',
          validation: (rule: Rule) => rule.required()
        },
        {
          name: 'floatingMessage',
          title: 'Floating Message Box Text',
          type: 'text',
          validation: (rule: Rule) => rule.required()
        }
      ]
    },
    {
      name: 'siteSettings',
      title: 'Global Site Settings',
      type: 'object',
      fields: [
        {name: 'defaultSeo', title: 'Default SEO', type: 'seoSettings'},
        {name: 'announcementText', title: 'Announcement text', type: 'string'},
        {name: 'announcementVisible', title: 'Show announcement', type: 'boolean', initialValue: false},
      ],
    }
  ],
  preview: {
    prepare() {
      return { title: 'Header & Footer Settings' }
    }
  }
}

export default headerFooter;
