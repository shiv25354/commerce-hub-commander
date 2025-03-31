
import { Product } from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    sku: 'FRUIT-001',
    category: 'Fruits',
    price: 1.99,
    stock: 150,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=100&auto=format'
  },
  {
    id: '2',
    name: 'Fresh Milk (1 gallon)',
    sku: 'DAIRY-002',
    category: 'Dairy',
    price: 3.49,
    stock: 75,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=100&auto=format'
  },
  {
    id: '3',
    name: 'Whole Grain Bread',
    sku: 'BAKE-003',
    category: 'Bakery',
    price: 2.99,
    stock: 45,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?q=80&w=100&auto=format'
  },
  {
    id: '4',
    name: 'Chicken Breast (1 lb)',
    sku: 'MEAT-004',
    category: 'Meat',
    price: 5.99,
    stock: 62,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=100&auto=format'
  },
  {
    id: '5',
    name: 'Avocados (bag of 4)',
    sku: 'FRUIT-005',
    category: 'Fruits',
    price: 4.99,
    stock: 0,
    status: 'out-of-stock',
    image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=100&auto=format'
  },
  {
    id: '6',
    name: 'Organic Eggs (dozen)',
    sku: 'DAIRY-006',
    category: 'Dairy',
    price: 4.49,
    stock: 8,
    status: 'low-stock',
    image: 'https://images.unsplash.com/photo-1598965402089-897c5de12559?q=80&w=100&auto=format'
  },
  {
    id: '7',
    name: 'Fresh Spinach (1 lb)',
    sku: 'VEG-007',
    category: 'Vegetables',
    price: 2.99,
    stock: 35,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=100&auto=format'
  },
  {
    id: '8',
    name: 'Bottled Water (24-pack)',
    sku: 'BEV-008',
    category: 'Beverages',
    price: 6.99,
    stock: 85,
    status: 'in-stock',
    image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?q=80&w=100&auto=format'
  },
];
