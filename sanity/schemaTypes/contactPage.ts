import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export default defineType({
  name: 'contactPage',
  title: 'Contact Us Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    // --- HERO ---
    defineField({ name: 'title', title: 'Page Title', type: 'string', hidden: true, initialValue: 'Contact Us' }),
    defineField({ name: 'heroBio', title: 'Hero Description', type: 'text', rows: 2 }),
    defineField({ name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } }),

    // --- CONTACT DETAILS ---
    defineField({ name: 'whatsappNumber', title: 'WhatsApp (No spaces, e.g. 60163966562)', type: 'string' }),
    defineField({ name: 'instagramUser', title: 'Instagram Username (e.g. jiffybooth)', type: 'string' }),
    defineField({ name: 'emailAddress', title: 'Public Contact Email', type: 'string' }),

    // --- BOOKING TIMELINE ---
    defineField({ name: 'bookingTitle', title: 'Booking Section Title', type: 'string', initialValue: 'How to Book?' }),
    defineField({
      name: 'bookingSteps',
      title: 'Booking Steps Timeline',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Step Title', type: 'string' },
          { name: 'description', title: 'Step Description', type: 'text', rows: 2 },
          { name: 'iconName', title: 'Icon', type: 'string', options: {list: ['MessageCircle', 'Calendar', 'Check', 'Camera', 'Users']} },
        ],
        preview: {select: {title: 'title', subtitle: 'description'}},
      }]
    }),
    defineField({name: 'contactLinks', title: 'Contact Links', type: 'array', of: [{type: 'siteLink'}]}),
    defineField({name: 'businessHours', title: 'Business Hours', type: 'text', rows: 3}),
    defineField({name: 'sections', title: 'Additional Sections', type: 'array', of: [{type: 'contentSection'}]}),
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroBio',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Contact Us',
        subtitle: subtitle ? 'Contact page' : undefined,
      }
    },
  },
})
