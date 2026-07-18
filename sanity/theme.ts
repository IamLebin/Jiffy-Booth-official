import {buildLegacyTheme} from 'sanity'

const colors = {
  white: '#FFFFFF',
  ink: '#1C2431',
  cream: '#F5EBE1',
  terracotta: '#9B5744',
  sky: '#B9D9E8',
  sage: '#8BAA91',
  amber: '#D59A43',
  danger: '#C94F4F',
}

export const jiffyTheme = buildLegacyTheme({
  '--black': colors.ink,
  '--white': colors.white,
  '--gray': '#6F746F',
  '--gray-base': '#6F746F',
  '--component-bg': '#FFFDFC',
  '--component-text-color': colors.ink,
  '--brand-primary': colors.terracotta,
  '--default-button-color': '#68707C',
  '--default-button-primary-color': colors.terracotta,
  '--default-button-success-color': colors.sage,
  '--default-button-warning-color': colors.amber,
  '--default-button-danger-color': colors.danger,
  '--state-info-color': '#5D91A8',
  '--state-success-color': colors.sage,
  '--state-warning-color': colors.amber,
  '--state-danger-color': colors.danger,
  '--main-navigation-color': colors.ink,
  '--main-navigation-color--inverted': colors.cream,
  '--focus-color': colors.sky,
})
