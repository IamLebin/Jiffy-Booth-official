// sanity/schemaTypes/index.ts
import team from './team'
import aboutUs from './about-us'
import services from './our-services'
import events from './our-events'
import mainPage from './main-page'
import contactPage from './contactPage'
import faqPage from './faqPage'
import legalPage from './legal'
import headerFooter from './headerFooter'
import portfolioPage from './portfolioPage'
import advicePage from './advicePage'
import portfolioSeo from './portfolioSeo'
import {homeSectionTypes} from './homeSections'
import richText from './richText'
import {collectionTypes} from './contentCollections'
import {linkObject, mediaImageObject, sectionObject, seoObject} from './shared'
import type {Template} from 'sanity'
import {pageSectionTypes} from './pageSections'

export const schema = {
  types: [
    richText,
    linkObject,
    mediaImageObject,
    sectionObject,
    seoObject,
    team,
    aboutUs,
    services,
    events,
    mainPage,
    contactPage,
    faqPage,
    legalPage,
    headerFooter,
    portfolioPage,
    advicePage,
    portfolioSeo,
    ...homeSectionTypes,
    ...collectionTypes,
    ...pageSectionTypes,
  ],
  templates: (previous: Template[]) => [
    ...previous,
    {id: 'homeHero', title: 'Hero Section', schemaType: 'homeHero', value: {title: 'Hero Section'}},
    {id: 'homePortfolio', title: 'Portfolio', schemaType: 'homePortfolio', value: {title: 'Portfolio'}},
    {id: 'homeTemplates', title: 'Sample Templates', schemaType: 'homeTemplates', value: {title: 'Sample Templates'}},
    {id: 'homeTrustedLogos', title: 'Trusted By Logos', schemaType: 'homeTrustedLogos', value: {title: 'Trusted By Logos'}},
    {id: 'homeTestimonials', title: 'Testimonials', schemaType: 'homeTestimonials', value: {title: 'Testimonials'}},
    {id: 'homeSeo', title: 'SEO', schemaType: 'homeSeo', value: {title: 'SEO'}},
    {id: 'homeSettings', title: 'Homepage Settings', schemaType: 'homeSettings', value: {title: 'Homepage Settings'}},
    {id: 'advicePage', title: 'Advice SEO', schemaType: 'advicePage', value: {title: 'Advice SEO'}},
    {id: 'portfolioSeo', title: 'Portfolio SEO', schemaType: 'portfolioSeo', value: {documentTitle: 'Portfolio SEO'}},
    {id: 'aboutIntro', title: 'Get to Know Us Better', schemaType: 'aboutIntro', value: {documentTitle: 'Get to Know Us Better'}},
    {id: 'aboutMedia', title: 'Photo Strips', schemaType: 'aboutMedia', value: {documentTitle: 'Photo Strips'}},
    {id: 'ourStory', title: 'Our Story', schemaType: 'ourStory', value: {documentTitle: 'Our Story'}},
    {id: 'aboutSeo', title: 'About Us SEO', schemaType: 'aboutSeo', value: {documentTitle: 'About Us SEO'}},
    {id: 'contactIntro', title: 'Contact and Booking Page', schemaType: 'contactIntro', value: {documentTitle: 'Contact and Booking Page'}},
    {id: 'contactDetails', title: 'Contact Details', schemaType: 'contactDetails', value: {documentTitle: 'Contact Details'}},
    {id: 'contactBooking', title: 'How to Book', schemaType: 'contactBooking', value: {documentTitle: 'How to Book'}},
    {id: 'contactContent', title: 'Additional Content', schemaType: 'contactContent', value: {documentTitle: 'Additional Content'}},
    {id: 'contactSeo', title: 'Contact Us SEO', schemaType: 'contactSeo', value: {documentTitle: 'Contact Us SEO'}},
    {id: 'faqIntro', title: 'FAQ Page Content', schemaType: 'faqIntro', value: {documentTitle: 'FAQ Page Content'}},
    {id: 'faqSeo', title: 'FAQ SEO', schemaType: 'faqSeo', value: {documentTitle: 'FAQ SEO'}},
    {id: 'headerNavigation', title: 'Header Navigation', schemaType: 'headerNavigation', value: {documentTitle: 'Header Navigation'}},
    {id: 'footerSocial', title: 'Footer and Social Links', schemaType: 'footerSocial', value: {documentTitle: 'Footer and Social Links'}},
    {id: 'whatsappSettings', title: 'WhatsApp Settings', schemaType: 'whatsappSettings', value: {documentTitle: 'WhatsApp Settings'}},
  ],
}