import {
  CaseIcon,
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
) =>
  S.listItem()
    .title(title)
    .id(documentId)
    .icon(icon)
    .child(S.document().schemaType(schemaType).documentId(documentId).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Jiffy Booth')
    .items([
      singleton(S, 'Home Page', 'mainPage', 'mainPage', HomeIcon),
      singleton(S, 'Header, Footer & WhatsApp', 'headerFooter', 'headerFooter', CogIcon),

      S.divider().title('Website pages'),
      singleton(S, 'About Us', 'aboutUs', 'aboutUs', UsersIcon),
      singleton(S, 'Contact Us', 'contactPage', 'contactPage', EnvelopeIcon),
      singleton(S, 'Frequently Asked Questions', 'faqPage', 'faqPage', HelpCircleIcon),

      S.divider().title('Content collections'),
      S.listItem()
        .title('Services & Booths')
        .id('services')
        .icon(CaseIcon)
        .child(
          S.documentTypeList('ourServices')
            .title('Services & Booths')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Portfolio Events')
        .id('events')
        .icon(ImagesIcon)
        .child(
          S.documentTypeList('ourEvents')
            .title('Portfolio Events')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.divider().title('Policies'),
      S.documentTypeListItem('legalPage').title('Privacy & Terms').icon(LockIcon),
    ])
