import { Service, ServiceCategory, CategoryGuidelines } from './types';

export const services: Service[] = [
  {
    id: 'eyebrow-shaping',
    category: 'brows',
    name: 'Eyebrow Shaping',
    description: 'Precision waxing and tweezing to create the perfect arch for your face shape.',
    price: 35,
    touchUpPrice: 0,
    deposit: 10,
    hasTouchUp: false,
  },
  {
    id: 'threading',
    category: 'brows',
    name: 'Threading',
    description: 'Ancient technique using twisted cotton thread for precise, gentle hair removal.',
    price: 30,
    touchUpPrice: 0,
    deposit: 10,
    hasTouchUp: false,
  },
  {
    id: 'eyebrow-tint',
    category: 'brows',
    name: 'Eyebrow Tint',
    description: 'Semi-permanent dye to enhance your natural brow color and fill sparse areas.',
    price: 45,
    touchUpPrice: 0,
    deposit: 10,
    hasTouchUp: false,
  },
  {
    id: 'henna-brows',
    category: 'brows',
    name: 'Henna Brows',
    description: 'Natural plant-based tint that stains both hair and skin for a fuller look.',
    price: 70,
    touchUpPrice: 0,
    deposit: 15,
    hasTouchUp: false,
  },
  {
    id: 'brow-lamination',
    category: 'brows',
    name: 'Brow Lamination',
    description: 'Non-chemical treatment that sets brows in place for a fluffy, brushed-up look.',
    price: 100,
    touchUpPrice: 50,
    deposit: 25,
    hasTouchUp: true,
  },
  {
    id: 'brow-lamination-tint',
    category: 'brows',
    name: 'Brow Lamination + Tint',
    description: 'Lamination with custom tint for added depth and definition.',
    price: 120,
    touchUpPrice: 60,
    deposit: 25,
    hasTouchUp: true,
  },
  {
    id: 'brow-lamination-tint-design',
    category: 'brows',
    name: 'Brow Lamination + Tint + Design',
    description: 'Complete brow transformation with lamination, tint, and precision shaping.',
    price: 150,
    touchUpPrice: 75,
    deposit: 30,
    hasTouchUp: true,
  },
  {
    id: 'classic-lashes',
    category: 'lashes',
    name: 'Classic Lashes',
    description: '1 extension applied to each natural lash. Natural and elegant.',
    price: 45,
    touchUpPrice: 22,
    deposit: 20,
    hasTouchUp: true,
  },
  {
    id: 'hybrid-lashes',
    category: 'lashes',
    name: 'Hybrid Lashes',
    description: 'Combination of Classic and Volume. One of the most popular services.',
    price: 50,
    touchUpPrice: 25,
    deposit: 20,
    hasTouchUp: true,
  },
  {
    id: 'volume-lashes',
    category: 'lashes',
    name: 'Volume Lashes',
    description: 'Fuller glamorous effect ideal for events and photography.',
    price: 65,
    touchUpPrice: 32,
    deposit: 20,
    hasTouchUp: true,
  },
  {
    id: 'mega-volume-lashes',
    category: 'lashes',
    name: 'Mega Volume Lashes',
    description: 'Maximum density and dramatic luxury effect.',
    price: 70,
    touchUpPrice: 35,
    deposit: 20,
    hasTouchUp: true,
  },
];

export const categories: {
  id: ServiceCategory;
  name: string;
  description: string;
  tagline: string;
}[] = [
  {
    id: 'brows',
    name: 'Eyebrow Services',
    description:
      'Precision shaping, tinting, and lamination techniques for beautifully defined brows.',
    tagline: 'Define Your Gaze',
  },
  {
    id: 'lashes',
    name: 'Lash Extensions',
    description:
      'Individually applied extensions crafted to enhance your natural beauty with lasting elegance.',
    tagline: 'Elevate Your Look',
  },
];

export const guidelines: Record<ServiceCategory, CategoryGuidelines> = {
  brows: {
    before: [
      {
        title: 'Inform your technician if you:',
        items: [
          'Are pregnant or breastfeeding',
          'Have allergies to cosmetics, dyes, pigments, latex, or skincare products',
          'Have a history of allergic reactions',
          'Have an active skin infection, cuts, burns, severe acne, or irritation in the eyebrow area',
          'Have recently had a chemical peel, laser treatment, or other facial procedures',
          'Have a medical condition that may affect the healing process',
          'Have a fever or any contagious illness',
        ],
      },
      {
        title: 'Please:',
        items: [
          'Complete a Patch Test 24–48 hours before your appointment if you have sensitive skin or a history of allergies',
          'Avoid drinking alcoholic beverages for at least 24 hours before your appointment',
          'Limit your caffeine intake (coffee, energy drinks, and caffeinated teas) on the day of your appointment',
          'Arrive with clean skin and no makeup on your eyebrows',
        ],
      },
    ],
    after: [
      {
        title: 'During the First 24–48 Hours:',
        items: [
          'Keep your eyebrows completely dry',
          'Do not touch, rub, scratch, or pick the treated area',
          'Do not apply makeup to your eyebrows',
          'Avoid products containing alcohol, retinol, acids, or exfoliants on the treated area',
          'Avoid excessive sweating and intense physical exercise',
          'Do not use swimming pools, hot tubs, saunas, or steam rooms',
          'Avoid direct sunlight and tanning beds',
          'Do not consume alcoholic beverages',
          'Limit your caffeine intake',
          'Drink plenty of water to stay hydrated',
        ],
      },
      {
        title: 'Until Fully Healed:',
        items: [
          'Do not pick or remove any scabs or flakes',
          'Use only the aftercare products recommended by your technician',
          'Avoid chemical peels, laser treatments, or facial procedures around the eyebrow area',
          'Once healed, apply sunscreen to help protect the color and prolong your results',
        ],
      },
    ],
  },
  lashes: {
    before: [
      {
        title: 'Inform your lash technician if you:',
        items: [
          'Are allergic to eyelash extension adhesive, latex, or cosmetic products',
          'Have sensitive eyes or a history of allergic reactions',
          'Have an eye infection, conjunctivitis (pink eye), styes, or any eye irritation',
          'Have recently had eye surgery or a medical eye procedure',
          'Have excessive tearing or a medical condition affecting your eyes',
          'Are currently using prescription eye medications',
          'Are pregnant or breastfeeding',
        ],
      },
      {
        title: 'Please:',
        items: [
          'Arrive with clean eyes and lashes',
          'Remove all eye makeup, mascara, eyeliner, and eyeshadow',
          'Do not curl your natural lashes before your appointment',
          'Avoid wearing contact lenses during the procedure if possible',
          'Avoid oil-based products around the eyes on the day of your appointment',
          'Limit caffeine before your appointment, as it may make it more difficult to keep your eyes relaxed',
        ],
      },
    ],
    after: [
      {
        title: 'During the First 24–48 Hours:',
        items: [
          'Keep your lash extensions dry',
          'Avoid steam, saunas, swimming pools, and hot tubs',
          'Do not rub or pull on your lashes',
          'Avoid sleeping face down',
          'Do not apply mascara to your extensions',
          'Avoid oil-based makeup removers, cleansers, or skincare products around the eyes',
          'Avoid excessive heat and direct steam',
        ],
      },
      {
        title: 'Daily Care:',
        items: [
          'Clean your lash extensions with a lash-safe cleanser',
          'Brush your lashes gently with a clean spoolie brush',
          'Avoid rubbing your eyes',
          'Schedule refill appointments every 2–3 weeks to maintain a full look',
        ],
      },
    ],
    contraindications: [
      'Active eye infection or contagious eye condition',
      'Severe irritation, swelling, or inflammation around the eyes',
      'Positive allergy test to the adhesive',
      'Unable to keep eyes closed throughout the procedure',
    ],
  },
};
