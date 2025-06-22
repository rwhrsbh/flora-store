
import { Product, HeroSlide, Testimonial, Category } from './types';

const placeholderProductCategoryAvatarUrl = 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=400&h=500&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const placeholderHeroUrl = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&h=600&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Ruby Red Rose Bouquet',
    price: 52.99,
    imageUrl: placeholderProductCategoryAvatarUrl,
    description: 'A dozen classic long-stemmed red roses, expressing deep affection.',
    category: 'Bouquets',
  },
  {
    id: '2',
    name: 'Sunny Day Tulips',
    price: 42.50,
    imageUrl: placeholderProductCategoryAvatarUrl,
    description: 'Bright and cheerful tulips to bring sunshine into any room.',
    category: 'Seasonal',
  },
  {
    id: '3',
    name: 'Majestic White Orchid',
    price: 75.00,
    imageUrl: placeholderProductCategoryAvatarUrl,
    description: 'An elegant Phalaenopsis orchid, a statement of refined taste.',
    category: 'Plants',
  },
  {
    id: '4',
    name: 'Pastel Dream Wildflowers',
    price: 38.99,
    imageUrl: placeholderProductCategoryAvatarUrl,
    description: 'A delicate mix of seasonal wildflowers in soft pastel shades.',
    category: 'Bouquets',
  },
];

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide1',
    imageUrl: placeholderHeroUrl,
    title: 'Artistry in Every Petal',
    subtitle: 'Exquisite, hand-arranged flowers delivered with care.',
    ctaText: 'Discover Collections',
    ctaLink: '#featured-products',
  },
  {
    id: 'slide2',
    imageUrl: placeholderHeroUrl,
    title: 'Moments Made Memorable',
    subtitle: 'The perfect floral expression for every occasion and emotion.',
    ctaText: 'Shop Bouquets',
    ctaLink: '#categories',
  },
  {
    id: 'slide3',
    imageUrl: placeholderHeroUrl,
    title: 'Modern Elegance, Naturally',
    subtitle: 'Curated floral designs that blend sophistication with nature.',
    ctaText: 'View Our Best',
    ctaLink: '#featured-products',
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    quote: 'Absolutely stunning flowers and top-notch service. FloraModern is my new favorite!',
    author: 'Jessica P.',
    location: 'San Francisco, USA',
    avatarUrl: placeholderProductCategoryAvatarUrl,
  },
  {
    id: 't2',
    quote: 'The wedding flowers were a dream come true. Thank you, FloraModern, for making our day so special.',
    author: 'David & Emily R.',
    location: 'Toronto, Canada',
    avatarUrl: placeholderProductCategoryAvatarUrl,
  },
  {
    id: 't3',
    quote: 'Quick delivery, and the flowers were incredibly fresh and vibrant. Will order again!',
    author: 'Chloe M.',
    location: 'Sydney, Australia',
    avatarUrl: placeholderProductCategoryAvatarUrl,
  },
];

export const categories: Category[] = [
    {
        id: 'cat1',
        name: 'Vibrant Bouquets',
        imageUrl: placeholderProductCategoryAvatarUrl,
        description: 'Colorful hand-tied bouquets, full of life and joy.'
    },
    {
        id: 'cat2',
        name: 'Chic Arrangements',
        imageUrl: placeholderProductCategoryAvatarUrl,
        description: 'Sophisticated floral designs for a touch of modern luxury.'
    },
    {
        id: 'cat3',
        name: 'Lush Potted Plants',
        imageUrl: placeholderProductCategoryAvatarUrl,
        description: 'Beautiful green and flowering plants to enhance your space.'
    }
];
