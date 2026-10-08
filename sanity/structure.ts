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
    .child(S.document().schemaType(schemaType).documentId(documentId).initialValueTemplate(templateId || schemaType))

const homeSection = (S: StructureBuilder, title: string, schemaType: string, documentId: string, icon: ComponentType) =>
  S.listItem()
    .title(title)
    .id(`home-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)
    .icon(icon)
    .child(S.document().schemaType(schemaType).documentId(documentId).initialValueTemplate(schemaType))

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
              singleton(S, 'Get to Know Us Better', 'aboutIntro', 'aboutIntro', UsersIcon),
              singleton(S, 'Photo Strips', 'aboutMedia', 'aboutMedia', ImagesIcon),
              singleton(S, 'Team Story', 'aboutTeam', 'aboutTeam', UsersIcon),
              singleton(S, 'SEO', 'aboutSeo', 'aboutSeo', CogIcon),
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
              singleton(S, 'FAQ Page Content', 'faqIntro', 'faqIntro', HelpCircleIcon),
              S.listItem().title('Questions and Answers').child(
                S.documentTypeList('faqItem').title('Questions').defaultOrdering([{field: 'order', direction: 'asc'}]),
              ),
              S.listItem().title('Categories').child(
                S.documentTypeList('faqCategory').title('Categories').defaultOrdering([{field: 'order', direction: 'asc'}]),
              ),
              singleton(S, 'SEO', 'faqSeo', 'faqSeo', CogIcon),
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
              singleton(S, 'Contact and Booking Page', 'contactIntro', 'contactIntro', EnvelopeIcon),
              singleton(S, 'Contact Details', 'contactDetails', 'contactDetails', EnvelopeIcon),
              singleton(S, 'How to Book', 'contactBooking', 'contactBooking', BookIcon),
              singleton(S, 'Additional Content', 'contactContent', 'contactContent', ImagesIcon),
              singleton(S, 'SEO', 'contactSeo', 'contactSeo', CogIcon),
            ]),
      ),
      S.divider().title('Site-wide'),
      S.listItem()
        .title('Header & Footer')
        .id('header-footer')
        .icon(CogIcon)
        .child(S.list().title('Header & Footer').items([
          singleton(S, 'Header Navigation', 'headerNavigation', 'headerNavigation', HomeIcon),
          singleton(S, 'Footer and Social Links', 'footerSocial', 'footerSocial', ImagesIcon),
          singleton(S, 'WhatsApp Settings', 'whatsappSettings', 'whatsappSettings', EnvelopeIcon),
        ])),
      S.listItem()
        .title('Legal Pages')
        .id('legal')
        .icon(LockIcon)
        .child(S.documentTypeList('legalPage').title('Privacy & Terms')),
    ])
