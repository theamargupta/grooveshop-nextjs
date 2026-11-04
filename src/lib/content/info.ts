export interface InfoPageContent {
  eyebrow: string
  title: string
  intro: string
  sections: Array<{ title: string; paragraphs: string[] }>
}

export const infoPages = {
  about: {
    eyebrow: 'About GrooveShop',
    title: 'Everyday tech for your rhythm.',
    intro: 'GrooveShop is a considered edit of useful gear for work, movement, sound, and the small routines in between.',
    sections: [
      { title: 'Made for real days', paragraphs: ['We look for products that earn a place in your routine: clear sound, reliable power, comfortable movement, and a little more ease at your desk.'] },
      { title: 'Keep the good stuff moving', paragraphs: ['Our collection is designed to feel cohesive without asking you to buy more than you need. Start with one useful upgrade and build from there.'] },
    ],
  },
  contact: {
    eyebrow: 'Contact GrooveShop',
    title: 'Let’s keep in touch.',
    intro: 'Questions about an order, a product, or your next everyday upgrade? Our team is ready to help.',
    sections: [
      { title: 'Customer care', paragraphs: ['Email hello@grooveshop.example and include your order reference when you have one. We aim to reply within two business days.'] },
      { title: 'Product help', paragraphs: ['Tell us what you are shopping for and how you plan to use it. We will point you toward a practical fit.'] },
    ],
  },
  returns: {
    eyebrow: 'Returns',
    title: 'A little more room to decide.',
    intro: 'If your order is not the right fit, you can start a return within 30 days of delivery.',
    sections: [
      { title: 'Start a return', paragraphs: ['Email hello@grooveshop.example with your order reference and the item you would like to return. We will send the next steps.'] },
      { title: 'Return condition', paragraphs: ['Please return items unused, with their original packaging and any included accessories. Once received, approved refunds are returned to the original payment method.'] },
    ],
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'Your information, handled with care.',
    intro: 'We collect only the information needed to run the shop, complete orders, and make the experience useful.',
    sections: [
      { title: 'What we use', paragraphs: ['Order and contact details help us process purchases and answer support requests. Basic site activity helps us understand what is working.'] },
      { title: 'Your choices', paragraphs: ['You can ask to access, correct, or remove your personal information by emailing hello@grooveshop.example.'] },
    ],
  },
  terms: {
    eyebrow: 'Terms',
    title: 'The simple version.',
    intro: 'By using GrooveShop, you agree to use the site lawfully and provide accurate information when placing an order.',
    sections: [
      { title: 'Orders and availability', paragraphs: ['Product availability and prices can change. We will contact you if we cannot fulfill an order as placed.'] },
      { title: 'Using the site', paragraphs: ['The site content belongs to GrooveShop or its partners. Please do not copy, misuse, or interfere with the service.'] },
    ],
  },
} satisfies Record<string, InfoPageContent>
