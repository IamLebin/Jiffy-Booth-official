import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'aboutUs',
  title: 'About Us Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Main Title',
      type: 'string',
      hidden: true,
      initialValue: 'The Team Behind Your Favorite Memories',
    }),
    defineField({
      name: 'description',
      title: 'Top Description',
      type: 'text',
      rows: 4,
    }),
    // --- THE PHOTO FAN STRIPS ---
    defineField({
      name: 'photoStrip1',
      title: 'Photo Strip 1 (Left/Back)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photoStrip2',
      title: 'Photo Strip 2 (Middle)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photoStrip3',
      title: 'Photo Strip 3 (Right/Front)',
      type: 'image',
      options: { hotspot: true },
    }),
    // --- TEAM BIO SECTION ---
    defineField({
      name: 'teamName',
      title: 'Team Name',
      type: 'string',
    }),
    defineField({
      name: 'teamBio',
      title: 'Team Bio/Quote',
      type: 'text',
    }),
    defineField({
      name: 'teamPhoto',
      title: 'Main Team Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({name: 'sections', title: 'Page Sections', type: 'array', of: [{type: 'contentSection'}]}),
    defineField({name: 'seo', title: 'SEO Settings', type: 'seoSettings'}),
  ],
  preview: {
    select: {
      title: 'pageTitle',
      subtitle: 'description',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'About Us',
        subtitle: subtitle ? 'About Us page' : undefined,
      }
    },
  },
})
