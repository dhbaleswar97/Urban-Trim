export interface Service {
  slug: string
  number: string
  name: string
  tagline: string
  description: string
  longDescription: string
  price: string
  duration: string
  image: string
  tags: string[]
  steps: { title: string; description: string }[]
  accentColor: string
}

export const services: Service[] = [
  {
    slug: 'signature-haircut',
    number: '01',
    name: 'Signature Haircut',
    tagline: 'Architecture for the modern gentleman',
    description:
      'A precision haircut sculpted to your face structure, lifestyle, and personal aesthetic.',
    longDescription:
      'Our Signature Haircut begins with a thorough consultation to understand your hair texture, face shape, and lifestyle. Every cut is executed with razor-sharp precision by our master stylists, finished with professional-grade products that hold and protect.',
    price: 'From $65',
    duration: '60 min',
    image: '/assets/images/web-img%20(1).jpg',
    tags: ['Consultation', 'Precision Cut', 'Style', 'Finish'],
    steps: [
      {
        title: 'Consultation',
        description: 'We assess your hair type, face structure and lifestyle.',
      },
      { title: 'Preparation', description: 'Warm towel, scalp massage and professional shampoo.' },
      {
        title: 'Precision Cut',
        description: 'Master-level cutting technique tailored to your form.',
      },
      {
        title: 'Style & Finish',
        description: 'Product selection and styling session to perfect the look.',
      },
    ],
    accentColor: '#B6F500',
  },
  {
    slug: 'beard-sculpting',
    number: '02',
    name: 'Beard Sculpting',
    tagline: 'Define your edge with surgical precision',
    description: 'From wild to refined — your beard shaped into a statement of confidence.',
    longDescription:
      'Our Beard Sculpting service treats your facial hair as the architectural element it is. Using straight razor, hot towel, and artisan-grade oils, we shape, define, and condition every inch.',
    price: 'From $45',
    duration: '45 min',
    image: '/assets/images/web-img%20(2).jpg',
    tags: ['Shape', 'Line-Up', 'Hot Towel', 'Conditioning'],
    steps: [
      {
        title: 'Assessment',
        description: 'Study your face structure and desired style direction.',
      },
      {
        title: 'Hot Towel Prep',
        description: 'Steam opens pores for the closest, most comfortable work.',
      },
      {
        title: 'Sculpting',
        description: 'Shape, define lines, and create your signature beard silhouette.',
      },
      {
        title: 'Oil Treatment',
        description: 'Premium beard oil applied for conditioning and shine.',
      },
    ],
    accentColor: '#08CB00',
  },
  {
    slug: 'colour-highlights',
    number: '03',
    name: 'Colour & Highlights',
    tagline: 'Dimensional colour curated for you',
    description:
      'Transformative colour work — from subtle enhancement to bold dimensional statements.',
    longDescription:
      'Our Colour & Highlights service combines technical precision with artistic vision. Sofia Laurent brings her Parisian expertise to every strand, creating natural-looking dimension that photographs beautifully.',
    price: 'From $120',
    duration: '90 min',
    image: '/assets/images/web-img%20(3).jpg',
    tags: ['Consultation', 'Colour', 'Toning', 'Gloss Seal'],
    steps: [
      {
        title: 'Colour Consultation',
        description: 'Skin tone analysis and colour theory discussion.',
      },
      { title: 'Application', description: 'Precision application of professional-grade colour.' },
      { title: 'Processing', description: 'Timed development monitored by your colourist.' },
      { title: 'Gloss & Finish', description: 'Toning gloss for shine, followed by styling.' },
    ],
    accentColor: '#FF9B2F',
  },
  {
    slug: 'scalp-treatment',
    number: '04',
    name: 'Scalp Treatment',
    tagline: 'Restore, nourish, revitalise',
    description: 'A therapeutic deep-treatment targeting scalp health and hair density.',
    longDescription:
      'The foundation of great hair is a healthy scalp. Our Scalp Treatment protocol analyses your scalp condition and applies targeted treatments to address dryness, sensitivity, buildup, or thinning.',
    price: 'From $80',
    duration: '60 min',
    image: '/assets/images/web-img%20(4).jpg',
    tags: ['Analysis', 'Treatment', 'Massage', 'Mask'],
    steps: [
      { title: 'Scalp Analysis', description: 'Professional scalp scan to identify concerns.' },
      {
        title: 'Cleanse',
        description: 'Clarifying shampoo to remove buildup and product residue.',
      },
      { title: 'Treatment Mask', description: 'Targeted serum and mask applied and activated.' },
      {
        title: 'Massage',
        description: '15-minute scalp massage to stimulate circulation and absorption.',
      },
    ],
    accentColor: '#78C841',
  },
  {
    slug: 'style-finish',
    number: '05',
    name: 'Style & Finish',
    tagline: 'The final act of transformation',
    description: 'Professional blowout, texture work, and styling to perfect any look.',
    longDescription:
      'Whether you need a polished blowout for an important occasion or a textured finish for everyday confidence, our Style & Finish service puts the final polish on your presentation.',
    price: 'From $50',
    duration: '45 min',
    image: '/assets/images/web-img%20(5).jpg',
    tags: ['Wash', 'Blowout', 'Texture', 'Set'],
    steps: [
      {
        title: 'Shampoo & Condition',
        description: 'Product-matched wash and conditioning treatment.',
      },
      {
        title: 'Towel & Heat Prep',
        description: 'Microfibre towel dry and heat protection application.',
      },
      { title: 'Blowout', description: 'Professional directional blowout for volume and shape.' },
      { title: 'Finish & Set', description: 'Finishing product for hold, texture or shine.' },
    ],
    accentColor: '#FB4141',
  },
  {
    slug: 'royal-shave',
    number: '06',
    name: 'Royal Shave',
    tagline: 'A ritual passed through generations',
    description: 'The classic straight-razor shave elevated to an immersive ritual experience.',
    longDescription:
      'The Royal Shave is our most indulgent service — a multi-step ritual using hot towels, premium lather, a hand-honed straight razor, and restorative balms. It is as much meditation as grooming.',
    price: 'From $55',
    duration: '50 min',
    image: '/assets/images/Urban-trim-web-Gallery/Salon-Image%20(3).jpg',
    tags: ['Steam Towels', 'Straight Razor', 'Lather', 'Balm'],
    steps: [
      { title: 'Steam Prep', description: 'Hot towel wrap opens pores and softens the beard.' },
      { title: 'Pre-Shave Oil', description: 'Warm oil applied to protect and prep the skin.' },
      {
        title: 'Straight Razor',
        description: 'Hand-honed razor for the smoothest shave possible.',
      },
      {
        title: 'Cooling & Balm',
        description: 'Cold towel followed by restorative aftershave balm.',
      },
    ],
    accentColor: '#B6F500',
  },
]
