import {
  BookIcon,
  CaseIcon,
  CommentIcon,
  CogIcon,
  EnvelopeIcon,
  HelpCircleIcon,
  HomeIcon,
  ImagesIcon,
  LockIcon,
  UsersIcon,
} from '@sanity/icons'
import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {sectionHeadings} from './schemaTypes/pageSections' // adjust path

/**
 * For section types built with defineSection().
 * The pane title and form heading come from the heading defined in the schema.
 * `listTitle` optionally overrides the label in the list (e.g. 'SEO').
 */
const sectionItem = (S: StructureBuilder, typeName: string, icon: ComponentType, listTitle?: string) => {
  const heading = sectionHeadings[typeName] ?? typeName

  return S.listItem()
    .id(typeName)
    .title(listTitle ?? heading)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(heading)
        .initialValueTemplate(typeName),
    )
}

/**
 * For types that are not built with defineSection().
 * The pane title now matches the list label instead of falling back to "Untitled".
 */
const singleton = (
  S: StructureBuilder,
  title: string,
  schemaType: string,
  documentId: string,
  icon: ComponentType,
  templateId?: string,
) =>
  S.listItem()
    .title(title)
    .id(documentId)
    .icon(icon)
    .child(
      S.document()
        .schemaType(schemaType)
        .documentId(documentId)
        .title(title)
        .initialValueTemplate(templateId || schemaType),
    )

const homeSection = (S: StructureBuilder, title: string, schemaType: string, documentId: string, icon: ComponentType) =>
  S.listItem()
    .title(title)
    .id(`home-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)
    .icon(icon)
    .child(
      S.document()
        .schemaType(schemaType)
        .documentId(documentId)
        .title(title)
        .initialValueTemplate(schemaType),
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Jiffy Booth')
    .items([
      S.listItem()
        .title('Home')
        .id('home')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Home')
            .items([
              homeSection(S, 'Hero Section', 'homeHero', 'homeHero', HomeIcon),
              singleton(S, 'Portfolio', 'homePortfolio', 'homePortfolio', ImagesIcon),
              homeSection(S, 'Sample Templates', 'homeTemplates', 'homeTemplates', ImagesIcon),
              singleton(S, 'Trusted By Logos', 'homeTrustedLogos', 'homeTrustedLogos', HomeIcon),
              singleton(S, 'Testimonials', 'homeTestimonials', 'homeTestimonials', CommentIcon),
              singleton(S, 'SEO', 'homeSeo', 'homeSeo', CogIcon),
              homeSection(S, 'Homepage Settings', 'homeSettings', 'homeSettings', CogIcon),
            ]),
        ),

      S.listItem()
        .title('About Us')
        .id('about-us')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('About Us')
            .items([
              sectionItem(S, 'aboutIntro', UsersIcon),
              sectionItem(S, 'aboutMedia', ImagesIcon),
              sectionItem(S, 'aboutTeam', UsersIcon),
              sectionItem(S, 'aboutSeo', CogIcon, 'SEO'),
            ]),
        ),

      S.listItem()
        .title('Our Services')
        .id('our-services')
        .icon(CaseIcon)
        .child(S.documentTypeList('ourServices').title('All Booths').defaultOrdering([{field: 'order', direction: 'asc'}])),

      S.listItem()
        .title('Portfolio')
        .id('portfolio')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Portfolio')
            .items([
              singleton(S, 'Main Portfolio Page', 'portfolioPage', 'portfolioPage', ImagesIcon),
              singleton(S, 'SEO', 'portfolioSeo', 'portfolioSeo', CogIcon),
              S.listItem().title('Categories').child(
                S.documentTypeList('portfolioCategory').title('Categories').defaultOrdering([{field: 'order', direction: 'asc'}]),
              ),
              S.listItem().title('All Portfolio Photos').child(
                S.documentTypeList('ourEvents').title('All Portfolio Photos').defaultOrdering([{field: 'order', direction: 'asc'}]),
              ),
            ]),
        ),

      S.listItem()
        .title('Advice')
        .id('advice')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Advice')
            .items([
              S.listItem().title('Articles').child(
                S.documentTypeList('article').title('Articles').defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
              ),
              S.listItem().title('Article Categories').child(
                S.documentTypeList('articleCategory').title('Article Categories').defaultOrdering([{field: 'order', direction: 'asc'}]),
              ),
              singleton(S, 'SEO', 'advicePage', 'advicePage', CogIcon),
            ]),
        ),

      S.listItem()
        .title('FAQ')
        .id('faq')
        .icon(HelpCircleIcon)
        .child(
          S.list()
            .title('FAQ')
            .items([
              sectionItem(S, 'faqIntro', HelpCircleIcon),
              S.listItem().title('Questions and Answers').child(
                S.documentTypeList('faqItem').title('Questions').defaultOrdering([{field: 'order', direction: 'asc'}]),
              ),
              S.listItem().title('Categories').child(
                S.documentTypeList('faqCategory').title('Categories').defaultOrdering([{field: 'order', direction: 'asc'}]),
              ),
              sectionItem(S, 'faqSeo', CogIcon, 'SEO'),
            ]),
        ),

      S.listItem()
        .title('Contact Us')
        .id('contact-us')
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title('Contact Us')
            .items([
              sectionItem(S, 'contactIntro', EnvelopeIcon),
              sectionItem(S, 'contactDetails', EnvelopeIcon),
              sectionItem(S, 'contactBooking', BookIcon),
              sectionItem(S, 'contactContent', ImagesIcon),
              sectionItem(S, 'contactSeo', CogIcon, 'SEO'),
            ]),
        ),

      S.divider().title('Site-wide'),

      S.listItem()
        .title('Header & Footer')
        .id('header-footer')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Header & Footer')
            .items([
              sectionItem(S, 'headerNavigation', HomeIcon),
              sectionItem(S, 'footerSocial', ImagesIcon),
              sectionItem(S, 'whatsappSettings', EnvelopeIcon),
            ]),
        ),

      S.listItem()
        .title('Legal Pages')
        .id('legal')
        .icon(LockIcon)
        .child(S.documentTypeList('legalPage').title('Privacy & Terms')),
    ])