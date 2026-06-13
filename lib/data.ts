import { Service, ServiceCategory } from './types';

export const services: Service[] = [
  {
    id: 'combo-brows',
    category: 'brows',
    name: 'Combo Brows',
    description:
      'Combines microblading hair strokes and shading; one of the most sought-after procedures.',
    price: 250,
    touchUpPrice: 125,
    deposit: 30,
  },
  {
    id: 'microblading',
    category: 'brows',
    name: 'Microblading',
    description:
      'Creates strokes that mimic natural hair for a more natural-looking result; recommended for sparse brows.',
    price: 150,
    touchUpPrice: 75,
    deposit: 30,
  },
  {
    id: 'powder-brows',
    category: 'brows',
    name: 'Powder Brows',
    description: 'Soft makeup effect with longer-lasting durability.',
    price: 200,
    touchUpPrice: 100,
    deposit: 30,
  },
  {
    id: 'classic-lashes',
    category: 'lashes',
    name: 'Classic Lashes',
    description: '1 extension applied to each natural lash. Natural and elegant.',
    price: 45,
    touchUpPrice: 22,
    deposit: 20,
  },
  {
    id: 'hybrid-lashes',
    category: 'lashes',
    name: 'Hybrid Lashes',
    description: 'Combination of Classic and Volume. One of the most popular services.',
    price: 50,
    touchUpPrice: 25,
    deposit: 20,
  },
  {
    id: 'volume-lashes',
    category: 'lashes',
    name: 'Volume Lashes',
    description: 'Fuller glamorous effect ideal for events and photography.',
    price: 65,
    touchUpPrice: 32,
    deposit: 20,
  },
  {
    id: 'mega-volume-lashes',
    category: 'lashes',
    name: 'Mega Volume Lashes',
    description: 'Maximum density and dramatic luxury effect.',
    price: 70,
    touchUpPrice: 35,
    deposit: 20,
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
    name: 'Brow Services',
    description:
      'Precision micropigmentation techniques for defined, natural-looking brows that frame your face.',
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
