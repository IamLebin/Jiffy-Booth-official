import {defineField, defineType} from 'sanity'
import type {FieldDefinition} from 'sanity'
import type {ComponentType} from 'react'
import {CogIcon, EnvelopeIcon, HelpCircleIcon, ImagesIcon, UsersIcon} from '@sanity/icons'

type SectionConfig = {
  name: string
  /** Name shown in Studio's "Create new" menu */
  title: string
  /** Heading shown in the document pane. Defaults to `title`. */
  heading?: string
  icon: ComponentType
  fields: FieldDefinition[]
}

/**
 * Registry of headings by document type name.
 * The structure file reads this to set each pane title.
 */
export const sectionHeadings: Record<string, string> = {}

/**
 * Builds a singleton-style section document.
 * The heading is defined once and drives the hidden field,
 * the preview title and the registry used by the structure.
 */
const defineSection = ({name, title, heading, icon, fields}: SectionConfig) => {
  const label = heading ?? title
  sectionHeadings[name] = label

  return defineType({
    name,
    title,
    type: 'document',
    icon,
    fields: [
      defineField({
        name: 'documentTitle',
        title: 'Document title',
        type: 'string',
        hidden: true,
        initialValue: label,
      }),
      ...fields,
    ],
    preview: {
      select: {title: 'documentTitle'},
      prepare: () => ({title: label}),
    },
  })
}

// ---------------------------------------------------------------------------
// About Us
// ---------------------------------------------------------------------------

export const aboutIntro = defineSection({
  name: 'aboutIntro',
  title: 'About Us Introduction',
  heading: 'Get to Know Us Better',
  icon: UsersIcon,
  fields: [
    defineField({name: 'pageTitle', title: 'Page Main Title', type: 'string'}),
    defineField({name: 'description', title: 'Top Description', type: 'text', rows: 4}),
  ],
})

export const aboutMedia = defineSection({
  name: 'aboutMedia',
  title: 'About Us Photo Strips',
  heading: 'Photo Strips',
  icon: ImagesIcon,
  fields: [
    defineField({name: 'photoStrip1', title: 'Photo Strip 1', type: 'image', options: {hotspot: true}}),
    defineField({name: 'photoStrip2', title: 'Photo Strip 2', type: 'image', options: {hotspot: true}}),
    defineField({name: 'photoStrip3', title: 'Photo Strip 3', type: 'image', options: {hotspot: true}}),
  ],
})

export const aboutTeam = defineSection({
  name: 'aboutTeam',
  title: 'About Us Team Story',
  heading: 'Team Story',
  icon: UsersIcon,
  fields: [
    defineField({name: 'teamName', title: 'Team Name', type: 'string'}),
    defineField({name: 'teamBio', title: 'Team Bio/Quote', type: 'text'}),
    defineField({name: 'teamPhoto', title: 'Main Team Photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'sections', title: 'Additional Sections', type: 'array', of: [{type: 'contentSection'}]}),
  ],
})

export const aboutSeo = defineSection({
  name: 'aboutSeo',
  title: 'About Us SEO',
  icon: CogIcon,
  fields: [defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'})],
})

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const contactIntro = defineSection({
  name: 'contactIntro',
  title: 'Contact Page Introduction',
  heading: 'Contact and Booking Page',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'title', title: 'Page Title', type: 'string'}),
    defineField({name: 'heroBio', title: 'Hero Description', type: 'text', rows: 2}),
    defineField({name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}}),
  ],
})

export const contactDetails = defineSection({
  name: 'contactDetails',
  title: 'Contact Details',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string'}),
    defineField({name: 'instagramUser', title: 'Instagram Username', type: 'string'}),
    defineField({name: 'emailAddress', title: 'Public Contact Email', type: 'string'}),
    defineField({name: 'contactLinks', title: 'Contact Links', type: 'array', of: [{type: 'siteLink'}]}),
    defineField({name: 'businessHours', title: 'Business Hours', type: 'text', rows: 3}),
  ],
})

export const contactBooking = defineSection({
  name: 'contactBooking',
  title: 'How to Book',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'bookingTitle', title: 'Booking Section Title', type: 'string'}),
    defineField({
      name: 'bookingSteps',
      title: 'Booking Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Step Title', type: 'string'},
            {name: 'description', title: 'Step Description', type: 'text', rows: 2},
            {
              name: 'iconName',
              title: 'Icon',
              type: 'string',
              options: {list: ['MessageCircle', 'Calendar', 'Check', 'Camera', 'Users']},
            },
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
    }),
  ],
})

export const contactContent = defineSection({
  name: 'contactContent',
  title: 'Contact Additional Content',
  heading: 'Additional Content',
  icon: ImagesIcon,
  fields: [
    defineField({name: 'sections', title: 'Additional Sections', type: 'array', of: [{type: 'contentSection'}]}),
  ],
})

export const contactSeo = defineSection({
  name: 'contactSeo',
  title: 'Contact Us SEO',
  icon: CogIcon,
  fields: [defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'})],
})

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faqIntro = defineSection({
  name: 'faqIntro',
  title: 'FAQ Page Content',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'title', title: 'Page Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Page Subtitle', type: 'text', rows: 2}),
  ],
})

export const faqSeo = defineSection({
  name: 'faqSeo',
  title: 'FAQ SEO',
  icon: CogIcon,
  fields: [defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'})],
})

// ---------------------------------------------------------------------------
// Site-wide
// ---------------------------------------------------------------------------

export const headerNavigation = defineSection({
  name: 'headerNavigation',
  title: 'Header Navigation',
  icon: UsersIcon,
  fields: [
    defineField({name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Link Name', type: 'string'},
            {name: 'href', title: 'Link URL', type: 'string'},
            {name: 'iconName', title: 'Icon', type: 'string'},
            {name: 'visible', title: 'Visible', type: 'boolean', initialValue: true},
          ],
          preview: {select: {title: 'name', subtitle: 'href'}},
        },
      ],
    }),
  ],
})

export const footerSocial = defineSection({
  name: 'footerSocial',
  title: 'Footer and Social Links',
  icon: ImagesIcon,
  fields: [
    defineField({name: 'companyName', title: 'Company Name', type: 'string'}),
    defineField({name: 'tagline', title: 'Tagline', type: 'text', rows: 3}),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'instagram', title: 'Instagram URL', type: 'url'},
        {name: 'tiktok', title: 'TikTok URL', type: 'url'},
        {name: 'xiaohongshu', title: 'Xiaohongshu URL', type: 'url'},
      ],
    }),
    defineField({name: 'footerLinks', title: 'Footer Links', type: 'array', of: [{type: 'siteLink'}]}),
    defineField({name: 'copyrightText', title: 'Copyright Text', type: 'string'}),
    defineField({name: 'logo', title: 'Footer Logo', type: 'image', options: {hotspot: true}}),
  ],
})

export const whatsappSettings = defineSection({
  name: 'whatsappSettings',
  title: 'WhatsApp Settings',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string'}),
    defineField({name: 'defaultMessage', title: 'Default Message', type: 'text'}),
    defineField({name: 'floatingMessage', title: 'Floating Message', type: 'text'}),
  ],
})

export const pageSectionTypes = [
  aboutIntro,
  aboutMedia,
  aboutTeam,
  aboutSeo,
  contactIntro,
  contactDetails,
  contactBooking,
  contactContent,
  contactSeo,
  faqIntro,
  faqSeo,
  headerNavigation,
  footerSocial,
  whatsappSettings,
]