import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export default defineType({
  name: 'contactPage',
  title: 'Contact Us Page',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'intro', title: 'Page introduction', default: true},
    {name: 'contact', title: 'Contact details'},
    {name: 'booking', title: 'Booking steps'},
  ],
  fields: [
    // --- HERO ---
    defineField({ name: 'title', title: 'Page Title', type: 'string', group: 'intro' }),
    defineField({ name: 'heroBio', title: 'Hero Description', type: 'text', rows: 2, group: 'intro' }),
    defineField({ name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true }, group: 'intro' }),

    // --- CONTACT DETAILS ---
    defineField({ name: 'whatsappNumber', title: 'WhatsApp (No spaces, e.g. 60163966562)', type: 'string', group: 'contact' }),
    defineField({ name: 'instagramUser', title: 'Instagram Username (e.g. jiffybooth)', type: 'string', group: 'contact' }),
    defineField({ name: 'emailAddress', title: 'Public Contact Email', type: 'string', group: 'contact' }),

    // --- BOOKING TIMELINE ---
    defineField({ name: 'bookingTitle', title: 'Booking Section Title', type: 'string', initialValue: 'How to Book?', group: 'booking' }),
    defineField({
      name: 'bookingSteps',
      title: 'Booking Steps Timeline',
      type: 'array',
      group: 'booking',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Step Title', type: 'string' },
          { name: 'description', title: 'Step Description', type: 'text', rows: 2 }
        ],
        preview: {select: {title: 'title', subtitle: 'description'}},
      }]
    }),
  ],
})
