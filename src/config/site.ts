import { IMG_CDN } from '@/lib/cdn'

export const siteConfig = {
  name: 'Urban Trim',
  description: 'Premium barber & grooming studio.',
  url: 'https://urbantrim.com',
  ogImage: `${IMG_CDN}/assets/images/og.jpg`,
  links: {
    instagram: '#',
    facebook: '#',
  },
}

export type SiteConfig = typeof siteConfig
