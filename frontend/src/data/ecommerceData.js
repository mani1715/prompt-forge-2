// E-commerce Demo Data - Fashion Store

export const ecommerceCategories = [
  { id: 1, name: 'Men', slug: 'men', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&h=400&fit=crop' },
  { id: 2, name: 'Women', slug: 'women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop' },
  { id: 3, name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&h=400&fit=crop' },
  { id: 4, name: 'Shoes', slug: 'shoes', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop' }
];

export const ecommerceProducts = [
  // Men's Collection
  {
    id: 1,
    name: 'Classic Denim Jacket',
    slug: 'classic-denim-jacket',
    category: 'men',
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=800&fit=crop'
    ],
    description: 'Timeless denim jacket perfect for any casual occasion. Made from premium denim fabric with a comfortable fit.',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Black', 'Light Blue'],
    tags: ['denim', 'casual', 'jacket', 'men']
  },
  {
    id: 2,
    name: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-tshirt',
    category: 'men',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop'
    ],
    description: 'Soft, breathable cotton t-shirt. Perfect for everyday wear with a modern slim fit design.',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    featured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray', 'Navy'],
    tags: ['tshirt', 'casual', 'cotton', 'men']
  },
  {
    id: 3,
    name: 'Slim Fit Chinos',
    slug: 'slim-fit-chinos',
    category: 'men',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop'
    ],
    description: 'Modern slim-fit chinos that offer style and comfort. Perfect for both casual and smart-casual occasions.',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    featured: false,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Black', 'Olive'],
    tags: ['chinos', 'pants', 'formal', 'men']
  },
  {
    id: 4,
    name: 'Leather Bomber Jacket',
    slug: 'leather-bomber-jacket',
    category: 'men',
    price: 249.99,
    originalPrice: 349.99,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop'
    ],
    description: 'Genuine leather bomber jacket with premium finish. A timeless piece that adds edge to any outfit.',
    rating: 4.9,
    reviews: 78,
    inStock: true,
    featured: true,
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    tags: ['leather', 'jacket', 'premium', 'men']
  },

  // Women's Collection
  {
    id: 5,
    name: 'Floral Summer Dress',
    slug: 'floral-summer-dress',
    category: 'women',
    price: 79.99,
    originalPrice: 109.99,
    discount: 27,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop'
    ],
    description: 'Light and breezy floral dress perfect for summer days. Features a flattering silhouette and vibrant print.',
    rating: 4.8,
    reviews: 203,
    inStock: true,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral Blue', 'Floral Pink', 'Floral Yellow'],
    tags: ['dress', 'summer', 'floral', 'women']
  },
  {
    id: 6,
    name: 'Silk Blouse',
    slug: 'silk-blouse',
    category: 'women',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop'
    ],
    description: 'Elegant silk blouse with a modern cut. Perfect for office wear or evening occasions.',
    rating: 4.7,
    reviews: 167,
    inStock: true,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Ivory', 'Blush', 'Black'],
    tags: ['blouse', 'silk', 'formal', 'women']
  },
  {
    id: 7,
    name: 'High-Waist Skinny Jeans',
    slug: 'high-waist-skinny-jeans',
    category: 'women',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop'
    ],
    description: 'Flattering high-waist skinny jeans with stretch denim for ultimate comfort and style.',
    rating: 4.6,
    reviews: 298,
    inStock: true,
    featured: false,
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Dark Blue', 'Black', 'Light Blue'],
    tags: ['jeans', 'denim', 'skinny', 'women']
  },
  {
    id: 8,
    name: 'Cashmere Sweater',
    slug: 'cashmere-sweater',
    category: 'women',
    price: 159.99,
    originalPrice: 229.99,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop'
    ],
    description: 'Luxurious cashmere sweater that provides warmth and elegance. A wardrobe essential for colder months.',
    rating: 4.9,
    reviews: 142,
    inStock: true,
    featured: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beige', 'Gray', 'Black', 'Burgundy'],
    tags: ['sweater', 'cashmere', 'luxury', 'women']
  },

  // Accessories
  {
    id: 9,
    name: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    category: 'accessories',
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop'
    ],
    description: 'Stylish leather crossbody bag with adjustable strap. Perfect size for everyday essentials.',
    rating: 4.8,
    reviews: 187,
    inStock: true,
    featured: true,
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Tan'],
    tags: ['bag', 'leather', 'crossbody', 'accessories']
  },
  {
    id: 10,
    name: 'Classic Aviator Sunglasses',
    slug: 'classic-aviator-sunglasses',
    category: 'accessories',
    price: 49.99,
    originalPrice: 79.99,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop'
    ],
    description: 'Timeless aviator sunglasses with UV protection. A must-have accessory for sunny days.',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    featured: false,
    sizes: ['One Size'],
    colors: ['Gold Frame', 'Silver Frame', 'Black Frame'],
    tags: ['sunglasses', 'aviator', 'accessories']
  },
  {
    id: 11,
    name: 'Leather Belt',
    slug: 'leather-belt',
    category: 'accessories',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=600&h=800&fit=crop'
    ],
    description: 'Premium leather belt with classic buckle. Versatile accessory for any outfit.',
    rating: 4.6,
    reviews: 156,
    inStock: true,
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    tags: ['belt', 'leather', 'accessories']
  },
  {
    id: 12,
    name: 'Silk Scarf',
    slug: 'silk-scarf',
    category: 'accessories',
    price: 59.99,
    originalPrice: 89.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=800&fit=crop'
    ],
    description: 'Luxurious silk scarf with elegant patterns. Adds a touch of sophistication to any ensemble.',
    rating: 4.8,
    reviews: 98,
    inStock: true,
    featured: true,
    sizes: ['One Size'],
    colors: ['Floral', 'Abstract', 'Solid'],
    tags: ['scarf', 'silk', 'luxury', 'accessories']
  },

  // Shoes
  {
    id: 13,
    name: 'Classic White Sneakers',
    slug: 'classic-white-sneakers',
    category: 'shoes',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop'
    ],
    description: 'Versatile white sneakers that go with everything. Comfortable cushioning for all-day wear.',
    rating: 4.7,
    reviews: 412,
    inStock: true,
    featured: true,
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Off-White'],
    tags: ['sneakers', 'shoes', 'casual', 'unisex']
  },
  {
    id: 14,
    name: 'Leather Oxford Shoes',
    slug: 'leather-oxford-shoes',
    category: 'shoes',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop'
    ],
    description: 'Classic leather Oxford shoes for formal occasions. Handcrafted with attention to detail.',
    rating: 4.8,
    reviews: 167,
    inStock: true,
    featured: false,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Brown'],
    tags: ['oxford', 'formal', 'leather', 'shoes']
  },
  {
    id: 15,
    name: 'Athletic Running Shoes',
    slug: 'athletic-running-shoes',
    category: 'shoes',
    price: 119.99,
    originalPrice: 159.99,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop'
    ],
    description: 'High-performance running shoes with advanced cushioning. Perfect for athletes and fitness enthusiasts.',
    rating: 4.9,
    reviews: 523,
    inStock: true,
    featured: true,
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Black/Red', 'Blue/White', 'Gray/Orange'],
    tags: ['running', 'athletic', 'sports', 'shoes']
  },
  {
    id: 16,
    name: 'Ankle Boots',
    slug: 'ankle-boots',
    category: 'shoes',
    price: 139.99,
    originalPrice: 189.99,
    discount: 26,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop'
    ],
    description: 'Stylish ankle boots with comfortable heel. Perfect for transitional weather and versatile styling.',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    featured: false,
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['Black', 'Brown', 'Burgundy'],
    tags: ['boots', 'ankle', 'women', 'shoes']
  }
];

export const ecommerceBanners = [
  {
    id: 1,
    title: 'Summer Sale',
    subtitle: 'Up to 50% Off',
    description: 'Shop the latest trends at unbeatable prices',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    cta: 'Shop Now',
    link: '/demo/ecommerce/shop'
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh Styles Just In',
    description: 'Discover the latest fashion trends',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop',
    cta: 'Explore',
    link: '/demo/ecommerce/shop?filter=new'
  }
];

export const ecommerceTestimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    review: 'Amazing quality and fast shipping! The products exceeded my expectations.',
    date: '2024-11-20'
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
    review: 'Love the style and fit. Will definitely be ordering more!',
    date: '2024-11-18'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    review: 'Excellent customer service and beautiful products. Highly recommend!',
    date: '2024-11-15'
  }
];

export const ecommerceInfo = {
  name: 'StyleHub',
  tagline: 'Fashion That Speaks',
  description: 'Your destination for premium fashion and accessories',
  email: 'hello@stylehub.com',
  phone: '+1 (555) 987-6543',
  address: '123 Fashion Street, NY 10001'
};
