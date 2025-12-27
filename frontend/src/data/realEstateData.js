// Real Estate Property Data

export const properties = [
  {
    id: 1,
    slug: 'luxury-modern-villa-beverly-hills',
    title: 'Luxury Modern Villa',
    type: 'House',
    status: 'For Sale',
    price: 2850000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4500,
    lotSize: '8,500 sqft',
    yearBuilt: 2021,
    address: '1234 Sunset Boulevard',
    city: 'Beverly Hills',
    state: 'CA',
    zipCode: '90210',
    description: 'Stunning modern villa with breathtaking views, state-of-the-art smart home technology, and luxurious finishes throughout. This architectural masterpiece features floor-to-ceiling windows, an infinity pool, and a gourmet chef\'s kitchen.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
    ],
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    features: [
      'Smart Home System',
      'Infinity Pool',
      'Home Theater',
      'Wine Cellar',
      'Gym',
      'Garden',
      'Garage for 3 cars',
      'Security System',
      'Solar Panels',
      'Central AC'
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.j@realty.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    featured: true,
    views: 1250
  },
  {
    id: 2,
    slug: 'downtown-luxury-penthouse',
    title: 'Downtown Luxury Penthouse',
    type: 'Apartment',
    status: 'For Sale',
    price: 1950000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    lotSize: 'N/A',
    yearBuilt: 2020,
    address: '789 High Street, 45th Floor',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    description: 'Spectacular penthouse with panoramic city views from every room. Features include a private elevator, wraparound terrace, floor-to-ceiling windows, and premium finishes. Building amenities include concierge, fitness center, and rooftop pool.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    features: [
      'Private Elevator',
      'Terrace',
      'City Views',
      'Concierge Service',
      'Gym Access',
      'Rooftop Pool',
      'Pet Friendly',
      'In-unit Laundry',
      'Smart Home',
      'Parking Included'
    ],
    agent: {
      name: 'Michael Chen',
      phone: '+1 (555) 234-5678',
      email: 'michael.c@realty.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    featured: true,
    views: 980
  },
  {
    id: 3,
    slug: 'cozy-suburban-family-home',
    title: 'Cozy Suburban Family Home',
    type: 'House',
    status: 'For Sale',
    price: 675000,
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2400,
    lotSize: '6,000 sqft',
    yearBuilt: 2015,
    address: '456 Maple Street',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    description: 'Perfect family home in a quiet neighborhood with excellent schools. Open floor plan, updated kitchen with granite countertops, spacious master suite, and a large backyard perfect for entertaining.',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop'
    ],
    mainImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    features: [
      'Updated Kitchen',
      'Large Backyard',
      'Garage for 2 cars',
      'Hardwood Floors',
      'Energy Efficient',
      'Near Schools',
      'Fireplace',
      'Sprinkler System',
      'Storage Space',
      'Quiet Neighborhood'
    ],
    agent: {
      name: 'Emily Rodriguez',
      phone: '+1 (555) 345-6789',
      email: 'emily.r@realty.com',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    featured: false,
    views: 765
  },
  {
    id: 4,
    slug: 'modern-downtown-condo',
    title: 'Modern Downtown Condo',
    type: 'Condo',
    status: 'For Sale',
    price: 485000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    lotSize: 'N/A',
    yearBuilt: 2019,
    address: '321 Urban Avenue, Unit 12B',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    description: 'Stylish condo in the heart of downtown. Perfect for young professionals or investors. Walking distance to restaurants, shops, and public transportation. Building features include fitness center and secured entry.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    mainImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    features: [
      'Downtown Location',
      'Modern Design',
      'Fitness Center',
      'Secured Entry',
      'Balcony',
      'In-unit Laundry',
      'Stainless Appliances',
      'Hardwood Floors',
      'Pet Friendly',
      'Storage Unit'
    ],
    agent: {
      name: 'David Miller',
      phone: '+1 (555) 456-7890',
      email: 'david.m@realty.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    featured: true,
    views: 542
  },
  {
    id: 5,
    slug: 'beachfront-villa-malibu',
    title: 'Beachfront Villa',
    type: 'House',
    status: 'For Sale',
    price: 4200000,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 5200,
    lotSize: '12,000 sqft',
    yearBuilt: 2022,
    address: '789 Pacific Coast Highway',
    city: 'Malibu',
    state: 'CA',
    zipCode: '90265',
    description: 'Exclusive beachfront property with private beach access and stunning ocean views. This Mediterranean-style villa features a gourmet kitchen, home theater, infinity pool, and multiple outdoor entertaining areas.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop'
    ],
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    features: [
      'Private Beach Access',
      'Ocean Views',
      'Infinity Pool',
      'Home Theater',
      'Wine Cellar',
      'Outdoor Kitchen',
      'Guest House',
      'Gym',
      'Spa',
      'Security System'
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.j@realty.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    featured: true,
    views: 1890
  },
  {
    id: 6,
    slug: 'commercial-office-space',
    title: 'Prime Commercial Office Space',
    type: 'Commercial',
    status: 'For Lease',
    price: 8500,
    priceType: '/month',
    bedrooms: null,
    bathrooms: 2,
    sqft: 3500,
    lotSize: 'N/A',
    yearBuilt: 2018,
    address: '555 Business Park Drive',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    description: 'Premium office space in Class A building. Modern design with open floor plan, conference rooms, and stunning city views. Building amenities include fitness center, cafe, and ample parking.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop'
    ],
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    features: [
      'Prime Location',
      'Modern Design',
      'Conference Rooms',
      'High-Speed Internet',
      'Parking Available',
      'Fitness Center',
      'Cafe',
      '24/7 Access',
      'Security',
      'Flexible Layout'
    ],
    agent: {
      name: 'Michael Chen',
      phone: '+1 (555) 234-5678',
      email: 'michael.c@realty.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    featured: false,
    views: 432
  },
  {
    id: 7,
    slug: 'charming-historic-townhouse',
    title: 'Charming Historic Townhouse',
    type: 'House',
    status: 'For Sale',
    price: 825000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2100,
    lotSize: '2,500 sqft',
    yearBuilt: 1920,
    address: '234 Heritage Lane',
    city: 'Boston',
    state: 'MA',
    zipCode: '02108',
    description: 'Beautiful historic townhouse with original character and modern updates. Features exposed brick, hardwood floors, updated kitchen, and a private patio. Located in a desirable historic district.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop'
    ],
    mainImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    features: [
      'Historic Character',
      'Exposed Brick',
      'Hardwood Floors',
      'Updated Kitchen',
      'Private Patio',
      'Original Details',
      'Walk to Shops',
      'Near Transit',
      'High Ceilings',
      'Natural Light'
    ],
    agent: {
      name: 'Emily Rodriguez',
      phone: '+1 (555) 345-6789',
      email: 'emily.r@realty.com',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    featured: false,
    views: 621
  },
  {
    id: 8,
    slug: 'lakefront-retreat',
    title: 'Lakefront Retreat',
    type: 'House',
    status: 'For Sale',
    price: 1350000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    lotSize: '15,000 sqft',
    yearBuilt: 2017,
    address: '890 Lakeview Drive',
    city: 'Lake Tahoe',
    state: 'CA',
    zipCode: '96150',
    description: 'Stunning lakefront property with private dock and beach. Perfect vacation home or year-round residence. Features include vaulted ceilings, stone fireplace, gourmet kitchen, and expansive decks with panoramic lake views.',
    images: [
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop'
    ],
    mainImage: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800&h=600&fit=crop',
    features: [
      'Lake Access',
      'Private Dock',
      'Beach',
      'Mountain Views',
      'Stone Fireplace',
      'Vaulted Ceilings',
      'Large Deck',
      'Hot Tub',
      '2-Car Garage',
      'Storage'
    ],
    agent: {
      name: 'David Miller',
      phone: '+1 (555) 456-7890',
      email: 'david.m@realty.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    featured: true,
    views: 1120
  },
  {
    id: 9,
    slug: 'studio-apartment-downtown',
    title: 'Stylish Studio Apartment',
    type: 'Apartment',
    status: 'For Rent',
    price: 2200,
    priceType: '/month',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    lotSize: 'N/A',
    yearBuilt: 2020,
    address: '123 City Center, Unit 5C',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    description: 'Modern studio in a prime downtown location. Features Murphy bed, stainless steel appliances, in-unit laundry, and access to building amenities including rooftop terrace and bike storage.',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'
    ],
    mainImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
    features: [
      'Downtown Location',
      'Murphy Bed',
      'Modern Kitchen',
      'In-unit Laundry',
      'Rooftop Terrace',
      'Bike Storage',
      'Package Room',
      'Pet Friendly',
      'Near Transit',
      'Utilities Included'
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.j@realty.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    featured: false,
    views: 387
  },
  {
    id: 10,
    slug: 'mountain-cabin-retreat',
    title: 'Mountain Cabin Retreat',
    type: 'House',
    status: 'For Sale',
    price: 595000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    lotSize: '20,000 sqft',
    yearBuilt: 2016,
    address: '456 Mountain Ridge Road',
    city: 'Aspen',
    state: 'CO',
    zipCode: '81611',
    description: 'Cozy mountain cabin with rustic charm and modern amenities. Features include wood-burning fireplace, large windows with mountain views, wraparound deck, and proximity to ski resorts.',
    images: [
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop'
    ],
    mainImage: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop',
    features: [
      'Mountain Views',
      'Wood Fireplace',
      'Wraparound Deck',
      'Near Ski Resort',
      'Vaulted Ceilings',
      'Natural Light',
      'Garage',
      'Storage Shed',
      'Well Water',
      'Peaceful Location'
    ],
    agent: {
      name: 'Emily Rodriguez',
      phone: '+1 (555) 345-6789',
      email: 'emily.r@realty.com',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    featured: false,
    views: 712
  }
];

export const propertyTypes = ['All', 'House', 'Apartment', 'Condo', 'Commercial'];

export const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $500K', min: 0, max: 500000 },
  { label: '$500K - $1M', min: 500000, max: 1000000 },
  { label: '$1M - $2M', min: 1000000, max: 2000000 },
  { label: '$2M - $5M', min: 2000000, max: 5000000 },
  { label: '$5M+', min: 5000000, max: Infinity }
];