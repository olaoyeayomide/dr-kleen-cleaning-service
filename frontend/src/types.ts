export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  isNew?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number;
  specs?: { [key: string]: string };
  stock?: number;
  addedAt?: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  bgColor: string;
  addedAt?: string;
}
