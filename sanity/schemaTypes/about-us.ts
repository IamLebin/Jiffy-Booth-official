import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'aboutUs',
  title: 'About Us Page',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'intro', title: 'Introduction', default: true},
    {name: 'memories', title: 'Photo strips'},
    {name: 'team', title: 'Team story'},
  ],
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Main Title',
      type: 'string',
      group: 'intro',
      initialValue: 'The Team Behind Your Favorite Memories',
    }),
    defineField({
      name: 'description',
      title: 'Top Description',
      type: 'text',
      group: 'intro',
      rows: 4,
    }),
    // --- THE PHOTO FAN STRIPS ---
    defineField({
      name: 'photoStrip1',
      title: 'Photo Strip 1 (Left/Back)',
      type: 'image',
      group: 'memories',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photoStrip2',
      title: 'Photo Strip 2 (Middle)',
      type: 'image',
      group: 'memories',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photoStrip3',
      title: 'Photo Strip 3 (Right/Front)',
      type: 'image',
      group: 'memories',
      options: { hotspot: true },
    }),
    // --- TEAM BIO SECTION ---
    defineField({
      name: 'teamName',
      title: 'Team Name',
      type: 'string',
      group: 'team',
    }),
    defineField({
      name: 'teamBio',
      title: 'Team Bio/Quote',
      type: 'text',
      group: 'team',
    }),
    defineField({
      name: 'teamPhoto',
      title: 'Main Team Photo',
      type: 'image',
      group: 'team',
      options: { hotspot: true },
    }),
  ],
})
