
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  quantity?: number; // Optional: for cart items
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  avatarUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  // In a real app, never store passwords directly
  // passwordHash: string; 
}

export interface CartItem extends Product {
  quantity: number;
}
