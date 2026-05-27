export interface TeamMember {
  slug: string
  name: string
  title: string
  specialty: string
  experience: string
  clients: string
  bio: string
  longBio: string
  image: string
  quote: string
  services: string[]
}

export const team: TeamMember[] = [
  {
    slug: 'marcus-reid',
    name: 'Marcus Reid',
    title: 'Creative Director',
    specialty: 'Precision Cuts & Fades',
    experience: '14 yrs',
    clients: '3,200+',
    bio: 'Trained at the Vidal Sassoon Academy, Marcus brings architectural precision to every cut.',
    longBio:
      'Marcus Reid founded Urban Trim in 2018 with one obsession: redefine what a barber studio could be. Trained at the Vidal Sassoon Academy in London and honing his craft in New York for over a decade, Marcus has developed a signature approach that treats every haircut as an architectural project. His clients include CEOs, athletes, and creatives who demand precision without compromise.',
    image: '/assets/images/Teams/Stefan%20Stefancik.jpg',
    quote: 'Every great cut begins with understanding the person — not just the hair.',
    services: ['Signature Haircut', 'Precision Fade', 'Style & Finish'],
  },
  {
    slug: 'sofia-laurent',
    name: 'Sofia Laurent',
    title: 'Colour Specialist',
    specialty: 'Colour & Hair Artistry',
    experience: '10 yrs',
    clients: '2,800+',
    bio: 'A former Parisian colourist, Sofia transforms hair with dimensional, light-catching colour.',
    longBio:
      'Sofia Laurent studied colour theory at the Jacques Dessange Institute in Paris before moving to New York. Her approach to colour is painterly — she sees each head of hair as a canvas. Her specialty is creating natural-looking dimensional colour that complements skin tone and catches light beautifully.',
    image: '/assets/images/Teams/Daisy%20Hawkins.jpg',
    quote:
      'Colour is not just visual — it changes how you feel about yourself when you look in the mirror.',
    services: ['Colour & Highlights', 'Scalp Treatment', 'Style & Finish'],
  },
  {
    slug: 'james-chen',
    name: 'James Chen',
    title: 'Senior Stylist',
    specialty: 'Modern Texture & Style',
    experience: '9 yrs',
    clients: '2,100+',
    bio: 'James fuses Eastern techniques with contemporary style — texture and movement are his signatures.',
    longBio:
      'James Chen brings a unique perspective to hair artistry, fusing traditional Japanese cutting techniques with contemporary New York style. His work is characterised by beautiful texture, natural movement, and cuts that look as good on day 5 as day 1. He has been featured in GQ and Esquire.',
    image: '/assets/images/Teams/Isaiah%20Beltran.jpg',
    quote:
      "The best haircuts are the ones that look intentional even when the client hasn't touched their hair.",
    services: ['Signature Haircut', 'Beard Sculpting', 'Scalp Treatment'],
  },
]
