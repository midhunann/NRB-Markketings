// Product Categories and Their Items
export type ProductItem = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price?: string;
  packSize?: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Added icon field
  items: ProductItem[];
};

export const productCategories: ProductCategory[] = [
  {
    id: 'electronics',
    name: 'Electronics & Peripherals',
    slug: 'electronics',
    description: 'Quality electronics and computer peripherals for government and business use',
    icon: 'Monitor', // Lucide icon name
    items: [
      { id: 'e1', name: 'Sony 43" LED Smart TV KDL-43W6603', image: '/images/products/electronics/sony-tv.png'},
      { id: 'e2', name: 'HP 280G6 MT-389A1PA Core i3 10100/4GB/1TB', image: '/images/products/electronics/hp.png'},
      { id: 'e3', name: 'Logitech BCC950 Conferencecam', image: '/images/products/electronics/Logitech.png'},
      { id: 'e4', name: 'Dell Wireless Keyboard', image: '/images/products/electronics/dell-keyboard.png'},
      { id: 'e5', name: 'EVM DDR4 4GB Original Ram', image: '/images/products/electronics/evm-ram.png'},
      { id: 'e6', name: 'Tenda Wifi Adaptor', image: '/images/products/electronics/tenda.png'},
      { id: 'e7', name: 'Maxicom 1.5M HDMI Cable', image: '/images/products/electronics/maxicom-hdmi.png'},
      { id: 'e8', name: 'Maxicom 3M HDMI Cable', image: '/images/products/electronics/maxicom-hdmi.png'},
      { id: 'e9', name: 'Maxicom 5M HDMI Cable', image: '/images/products/electronics/maxicom-hdmi.png'},
      { id: 'e10', name: 'Maxicom Universal Power Extension 5M', image: '/images/products/electronics/maxicom-extension.png'},
      { id: 'e11', name: 'Maxicom Power Extension Box 2M', image: '/images/products/electronics/maxicom-extension.png'},
    ]
  },
  {
    id: 'chemicals',
    name: 'Chemical & Cleaning Materials',
    slug: 'chemicals',
    description: 'Industrial-grade cleaning solutions and chemicals',
    icon: 'Flask', // Lucide icon name
    items: [
      { id: 'c1', name: 'Floor Cleaning Liquid', packSize: '20 / 40 / 50 L', image: '/images/products/chemicals/floor-cleaning-liquid.png' },
      { id: 'c2', name: 'Detergent Liquid', packSize: '20 / 40 / 50 L', image: '/images/products/chemicals/detergent-liquid.png' },
      { id: 'c3', name: 'Toilet Cleaner', packSize: '20 / 40 / 50 L', image: '/images/products/chemicals/toilet-cleaner.png' },
      { id: 'c4', name: 'Dish wash Liquid', packSize: '20 / 40 / 50 L', image: '/images/products/chemicals/dish-wash-liquid.png' },
      { id: 'c5', name: 'HCL Full concentration', packSize: '20 / 40 / 50 L', image: '/images/products/chemicals/hcl-full-concentration.png' },
      { id: 'c6', name: 'Air Freshener', packSize: '20 / 40 / 50 L', image: '/images/products/chemicals/air-freshener.png' },
      { id: 'c7', name: 'Bleach Liquid', packSize: '20 / 40 / 50 L', image: '/images/products/chemicals/bleach-liquid.png' },
      { id: 'c8', name: 'Car Wash Liquid', packSize: '20 / 40 / 50 L', image: '/images/products/chemicals/car-wash-liquid.png' },
      { id: 'c9', name: 'Glass Cleaner', packSize: '20 / 40 / 50 L', image: '/images/products/chemicals/glass-cleaner.png' },
      { id: 'c10', name: 'Black Phynoil', packSize: '20 / 40 / 50 L', image: '/images/products/chemicals/black-phynoil.png' },
    ]
  },
  {
    id: 'plumbing',
    name: 'PVC Plumbing Items',
    slug: 'plumbing',
    description: 'High-quality PVC plumbing supplies for construction and maintenance',
    icon: 'PipelineIcon', // Lucide icon name
    items: [
      { id: 'p1', name: '3" PVC Pipe', image: '/images/products/plumbing/3-inch-pvc-pipe.png' },
      { id: 'p2', name: '4" PVC Pipe', image: '/images/products/plumbing/4-inch-pvc-pipe.png' },
      { id: 'p3', name: '¾" Gate Valve (Gunmetal)', image: '/images/products/plumbing/three-fourth-gate-valve.png' },
      { id: 'p4', name: '1" Gate Valve', image: '/images/products/plumbing/one-inch-gate-valve.png' },
      { id: 'p5', name: 'Solvent Cement', image: '/images/products/plumbing/solvent-cement.png' },
      { id: 'p6', name: 'Taplon Tape', image: '/images/products/plumbing/taplon-tape.png' },
      { id: 'p7', name: '3" Coupler', image: '/images/products/plumbing/three-inch-coupler.png' },
      { id: 'p8', name: '3" Elbow', image: '/images/products/plumbing/three-inch-elbow.png' },
      { id: 'p9', name: '3" Tee', image: '/images/products/plumbing/three-inch-tee.png' },
      { id: 'p10', name: '3" Bend', image: '/images/products/plumbing/three-inch-bend.png' },
      { id: 'p11', name: '3" End Cap', image: '/images/products/plumbing/three-inch-end-cap.png' },
    ]
  },
  // {
  //   id: 'seafood',
  //   name: 'Seafood Products',
  //   slug: 'seafood',
  //   description: 'Fresh seafood products sourced from quality suppliers',
  //   icon: 'Fish', // Lucide icon name
  //   items: [
  //     { id: 's1', name: 'Parla Fish', image: '/images/products/seafood/parla-fish.png' },
  //     { id: 's2', name: 'SF (Vanjaram)', image: '/images/products/seafood/sf-vanjaram.png' },
  //     { id: 's3', name: 'Sea White Prawn', image: '/images/products/seafood/sea-white-prawn.png' },
  //     { id: 's4', name: 'Squid', image: '/images/products/seafood/squid.png' },
  //     { id: 's5', name: 'Blue Sea Crab', image: '/images/products/seafood/blue-sea-crab.png' },
  //     { id: 's6', name: 'Three Spot Crab', image: '/images/products/seafood/three-spot-crab.png' },
  //   ]
  // },
  {
    id: 'psdas',
    name: 'PSDAS',
    slug: 'psdas',
    description: 'Centralized Water Management System for efficient water distribution and monitoring',
    icon: 'Droplets', // Lucide icon name
    items: [
      { id: 'psd1', name: 'Tank Level Indicator (EB/Solar)', description: 'Hydrostatic sensor, 4G GSM/GPRS, maintenance-free', image: '/images/products/psdas/tank-level-indicator.png' },
      { id: 'psd2', name: 'Mobile Controller (PMC-V13/V14)', description: 'Remote ON/OFF via phone/app, 2G/4G GSM/GPRS', image: '/images/products/psdas/mobile-controller.png' },
      { id: 'psd3', name: 'Valve Controller', description: 'Remote valve actuation (app), 2G/4G GSM/GPRS', image: '/images/products/psdas/valve-controller.png' },
      { id: 'psd4', name: 'Ultrasonic Flow Meter', description: 'Measures flow in kL, 2G/4G GSM/GPRS, real-time RS485 output', image: '/images/products/psdas/ultrasonic-flow-meter.png' },
      { id: 'psd5', name: 'Street Light Management System', description: 'Remote ON/OFF (astronomical/RTC timing), power monitoring, fault alerts', image: '/images/products/psdas/street-light-management-system.png' },
    ]
  },
];

// Company Information
export const companyInfo = {
  name: "NRB Markketings",
  tagline: "We are the Trend Setter in the industry",
  email: "nrbmarkketings@gmail.com",
  address: "TA1, Sree Ragaventhara Nestle, Kumbakonathan Salai, Old Kallanai Road, Thiruvanaikovil, Trichy – 620 005",
  mobile: "+91 94968 99999",
  gst: "33ANLPB9283E1Z0",
  msme: "UDYAM-TN-27-0021489",
  aboutShort: "Leading supplier of a wide variety of products and services to Central and State Government departments across India, with over years of experience, strict delivery commitments, and 100% client satisfaction.",
};

// Navigation Links
export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
];

// Features (Why Choose Us)
export const features = [
  {
    title: "Guaranteed Warranty",
    description: "Comprehensive coverage on every purchase to keep operations running smoothly."
  },
  {
    title: "Rigorous QA",
    description: "Multi‑point inspections ensure every item meets or exceeds industry specs."
  },
  {
    title: "Nationwide Reach",
    description: "Our logistics network delivers anywhere in India—on time, every time."
  },
  {
    title: "Volume Pricing",
    description: "Bulk auction sourcing means you pay less per unit without compromising quality."
  },
  {
    title: "Rapid Support",
    description: "Dedicated after‑sales team ready to resolve issues within 24 hours."
  },
  {
    title: "Eco-Conscious Operations",
    description: "We prioritize sustainable practices, ensuring our products and processes are environmentally friendly."
  }
];
