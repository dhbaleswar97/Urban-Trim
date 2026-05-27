/* All image paths reference local public/ assets — no external URLs */

const G = '/assets/images/Urban-trim-web-Gallery'
const T = '/assets/images/Teams'
const TS = '/assets/images/Testimonial'
const W = '/assets/images/web-img%20'

export const IMAGES = {
  hero: `${W}(1).jpg`,
  heroBg: `${G}/Salon-Image%20(1).jpg`,
  about: `${W}(2).jpg`,
  aboutPortrait: `${W}(3).jpg`,

  services: {
    haircut: `${W}(1).jpg`,
    beard: `${W}(2).jpg`,
    color: `${W}(3).jpg`,
    treatment: `${W}(4).jpg`,
    styling: `${W}(5).jpg`,
    shave: `${G}/Salon-Image%20(3).jpg`,
  },

  stylists: {
    one: `${T}/Stefan%20Stefancik.jpg`,
    two: `${T}/Daisy%20Hawkins.jpg`,
    three: `${T}/Isaiah%20Beltran.jpg`,
  },

  gallery: [
    `${G}/Salon-Image%20(1).jpg`,
    `${W}(1).jpg`,
    `${W}(3).jpg`,
    `${W}(4).jpg`,
    `${W}(5).jpg`,
    `${G}/Salon-Image%20(7).jpg`,
    `${G}/Salon-Image%20(8).jpg`,
    `${G}/Salon-Image%20(11).jpg`,
  ],

  beforeAfter: {
    before: `${W}(2).jpg`,
    after: `${W}(3).jpg`,
    before2: `${W}(4).jpg`,
    after2: `${W}(5).jpg`,
  },

  testimonials: {
    one: `${TS}/Hassan-khan.jpg`,
    two: `${TS}/Christina.jpg`,
    three: `${TS}/Clayton.jpg`,
    four: `${TS}/Gabriel.jpg`,
  },

  booking: `${G}/Salon-Image%20(1).jpg`,
}
