'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {StudioIcon} from './sanity/components/StudioIcon'
import {StudioNavbar} from './sanity/components/StudioNavbar'
import {jiffyTheme} from './sanity/theme'

const singletonTypes = new Set(['mainPage', 'aboutUs', 'contactPage', 'faqPage', 'headerFooter'])
const isDevelopment = process.env.NODE_ENV === 'development'

export default defineConfig({
  title: 'Jiffy Booth Studio',
  icon: StudioIcon,
  basePath: '/studio',
  projectId,
  dataset,
  theme: jiffyTheme,
  studio: {
    components: {
      navbar: StudioNavbar,
    },
  },
  document: {
    newDocumentOptions: (previous) =>
      previous.filter((item) => !singletonTypes.has(item.templateId)),
    actions: (previous, context) =>
      singletonTypes.has(context.schemaType)
        ? previous.filter(({action}) => action !== 'delete' && action !== 'duplicate')
        : previous,
  },
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Keep the technical GROQ query tool out of the owner's production Studio.
    ...(isDevelopment ? [visionTool({defaultApiVersion: apiVersion})] : []),
  ],
})
