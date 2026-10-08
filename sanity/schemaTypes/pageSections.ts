import {defineField, defineType} from 'sanity'
import {CogIcon, EnvelopeIcon, HelpCircleIcon, ImagesIcon, UsersIcon} from '@sanity/icons'

const titleFields = (title: string) => [
  defineField({name: 'documentTitle', title: 'Document title', type: 'string', hidden: true, initialValue: title}),
]

export const aboutIntro = defineType({name: 'aboutIntro', title: 'About Us Introduction', type: 'document', icon: UsersIcon, fields: [...titleFields('Get to Know Us Better'), defineField({name: 'pageTitle', title: 'Page Main Title', type: 'string'}), defineField({name: 'description', title: 'Top Description', type: 'text', rows: 4})]})
export const aboutMedia = defineType({name: 'aboutMedia', title: 'About Us Photo Strips', type: 'document', icon: ImagesIcon, fields: [...titleFields('Photo Strips'), defineField({name: 'photoStrip1', title: 'Photo Strip 1', type: 'image', options: {hotspot: true}}), defineField({name: 'photoStrip2', title: 'Photo Strip 2', type: 'image', options: {hotspot: true}}), defineField({name: 'photoStrip3', title: 'Photo Strip 3', type: 'image', options: {hotspot: true}})]})
export const aboutTeam = defineType({name: 'aboutTeam', title: 'About Us Team Story', type: 'document', icon: UsersIcon, fields: [...titleFields('Team Story'), defineField({name: 'teamName', title: 'Team Name', type: 'string'}), defineField({name: 'teamBio', title: 'Team Bio/Quote', type: 'text'}), defineField({name: 'teamPhoto', title: 'Main Team Photo', type: 'image', options: {hotspot: true}}), defineField({name: 'sections', title: 'Additional Sections', type: 'array', of: [{type: 'contentSection'}]})]})
export const aboutSeo = defineType({name: 'aboutSeo', title: 'About Us SEO', type: 'document', icon: CogIcon, fields: [...titleFields('About Us SEO'), defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'})]})

export const contactIntro = defineType({name: 'contactIntro', title: 'Contact Page Introduction', type: 'document', icon: EnvelopeIcon, fields: [...titleFields('Contact and Booking Page'), defineField({name: 'title', title: 'Page Title', type: 'string'}), defineField({name: 'heroBio', title: 'Hero Description', type: 'text', rows: 2}), defineField({name: 'heroBackgroundImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}})]})
export const contactDetails = defineType({name: 'contactDetails', title: 'Contact Details', type: 'document', icon: EnvelopeIcon, fields: [...titleFields('Contact Details'), defineField({name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string'}), defineField({name: 'instagramUser', title: 'Instagram Username', type: 'string'}), defineField({name: 'emailAddress', title: 'Public Contact Email', type: 'string'}), defineField({name: 'contactLinks', title: 'Contact Links', type: 'array', of: [{type: 'siteLink'}]}), defineField({name: 'businessHours', title: 'Business Hours', type: 'text', rows: 3})]})
export const contactBooking = defineType({
  name: 'contactBooking',
  title: 'How to Book',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    ...titleFields('How to Book'),
    defineField({name: 'bookingTitle', title: 'Booking Section Title', type: 'string'}),
    defineField({
      name: 'bookingSteps',
      title: 'Booking Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', title: 'Step Title', type: 'string'},
          {name: 'description', title: 'Step Description', type: 'text', rows: 2},
          {name: 'iconName', title: 'Icon', type: 'string', options: {list: ['MessageCircle', 'Calendar', 'Check', 'Camera', 'Users']}},
        ],
        preview: {select: {title: 'title', subtitle: 'description'}},
      }],
    }),
  ],
})
export const contactContent = defineType({name: 'contactContent', title: 'Contact Additional Content', type: 'document', icon: ImagesIcon, fields: [...titleFields('Additional Content'), defineField({name: 'sections', title: 'Additional Sections', type: 'array', of: [{type: 'contentSection'}]})]})
export const contactSeo = defineType({name: 'contactSeo', title: 'Contact Us SEO', type: 'document', icon: CogIcon, fields: [...titleFields('Contact Us SEO'), defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'})]})

export const faqIntro = defineType({name: 'faqIntro', title: 'FAQ Page Content', type: 'document', icon: HelpCircleIcon, fields: [...titleFields('FAQ Page Content'), defineField({name: 'title', title: 'Page Title', type: 'string'}), defineField({name: 'subtitle', title: 'Page Subtitle', type: 'text', rows: 2})]})
export const faqSeo = defineType({name: 'faqSeo', title: 'FAQ SEO', type: 'document', icon: CogIcon, fields: [...titleFields('FAQ SEO'), defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'})]})

export const headerNavigation = defineType({
  name: 'headerNavigation',
  title: 'Header Navigation',
  type: 'document',
  icon: UsersIcon,
  fields: [
    ...titleFields('Header Navigation'),
    defineField({name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', title: 'Link Name', type: 'string'},
          {name: 'href', title: 'Link URL', type: 'string'},
          {name: 'iconName', title: 'Icon', type: 'string'},
          {name: 'visible', title: 'Visible', type: 'boolean', initialValue: true},
        ],
        preview: {select: {title: 'name', subtitle: 'href'}},
      }],
    }),
  ],
})
export const footerSocial = defineType({name: 'footerSocial', title: 'Footer and Social Links', type: 'document', icon: ImagesIcon, fields: [...titleFields('Footer and Social Links'), defineField({name: 'companyName', title: 'Company Name', type: 'string'}), defineField({name: 'tagline', title: 'Tagline', type: 'text', rows: 3}), defineField({name: 'socialLinks', title: 'Social Media Links', type: 'object', fields: [{name: 'instagram', title: 'Instagram URL', type: 'url'}, {name: 'tiktok', title: 'TikTok URL', type: 'url'}, {name: 'xiaohongshu', title: 'Xiaohongshu URL', type: 'url'}]}), defineField({name: 'footerLinks', title: 'Footer Links', type: 'array', of: [{type: 'siteLink'}]}), defineField({name: 'copyrightText', title: 'Copyright Text', type: 'string'}), defineField({name: 'logo', title: 'Footer Logo', type: 'image', options: {hotspot: true}})]})
export const whatsappSettings = defineType({name: 'whatsappSettings', title: 'WhatsApp Settings', type: 'document', icon: EnvelopeIcon, fields: [...titleFields('WhatsApp Settings'), defineField({name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string'}), defineField({name: 'defaultMessage', title: 'Default Message', type: 'text'}), defineField({name: 'floatingMessage', title: 'Floating Message', type: 'text'})]})

export const pageSectionTypes = [aboutIntro, aboutMedia, aboutTeam, aboutSeo, contactIntro, contactDetails, contactBooking, contactContent, contactSeo, faqIntro, faqSeo, headerNavigation, footerSocial, whatsappSettings]
