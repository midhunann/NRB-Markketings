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
    items: ProductItem[];
  };
  
  export const productCategories: ProductCategory[] = [
    {
      id: 'electronics',
      name: 'Electronics & Peripherals',
      slug: 'electronics',
      description: 'Quality electronics and computer peripherals for government and business use',
      items: [
        { id: 'e1', name: 'Sony 43" LED Smart TV KDL-43W6603' },
        { id: 'e2', name: 'HP 280G6 MT-389A1PA Core i3 10100/4GB/1TB' },
        { id: 'e3', name: 'Logitech BCC950 Conferencecam' },
        { id: 'e4', name: 'Dell Wireless Keyboard' },
        { id: 'e5', name: 'EVM DDR4 4GB Original Ram' },
        { id: 'e6', name: 'Tenda Wifi Adaptor' },
        { id: 'e7', name: 'Maxicom 1.5M HDMI Cable' },
        { id: 'e8', name: 'Maxicom 3M HDMI Cable' },
        { id: 'e9', name: 'Maxicom 5M HDMI Cable' },
        { id: 'e10', name: 'Maxicom Universal Power Extension 5M' },
        { id: 'e11', name: 'Maxicom Power Extension Box 2M' },
      ]
    },
    {
      id: 'chemicals',
      name: 'Chemical & Cleaning Materials',
      slug: 'chemicals',
      description: 'Industrial-grade cleaning solutions and chemicals',
      items: [
        { id: 'c1', name: 'Floor Cleaning Liquid', packSize: '20 / 40 / 50 L' },
        { id: 'c2', name: 'Detergent Liquid', packSize: '20 / 40 / 50 L' },
        { id: 'c3', name: 'Toilet Cleaner', packSize: '20 / 40 / 50 L' },
        { id: 'c4', name: 'Dish wash Liquid', packSize: '20 / 40 / 50 L' },
        { id: 'c5', name: 'HCL Full concentration', packSize: '20 / 40 / 50 L' },
        { id: 'c6', name: 'Air Freshener', packSize: '20 / 40 / 50 L' },
        { id: 'c7', name: 'Bleach Liquid', packSize: '20 / 40 / 50 L' },
        { id: 'c8', name: 'Car Wash Liquid', packSize: '20 / 40 / 50 L' },
        { id: 'c9', name: 'Glass Cleaner', packSize: '20 / 40 / 50 L' },
        { id: 'c10', name: 'Black Phynoil', packSize: '20 / 40 / 50 L' },
      ]
    },
    {
      id: 'plumbing',
      name: 'PVC Plumbing Items',
      slug: 'plumbing',
      description: 'High-quality PVC plumbing supplies for construction and maintenance',
      items: [
        { id: 'p1', name: '3" PVC Pipe' },
        { id: 'p2', name: '4" PVC Pipe' },
        { id: 'p3', name: '¾" Gate Valve (Gunmetal)' },
        { id: 'p4', name: '1" Gate Valve' },
        { id: 'p5', name: 'Solvent Cement' },
        { id: 'p6', name: 'Taplon Tape' },
        { id: 'p7', name: '3" Coupler' },
        { id: 'p8', name: '3" Elbow' },
        { id: 'p9', name: '3" Tee' },
        { id: 'p10', name: '3" Bend' },
        { id: 'p11', name: '3" End Cap' },
      ]
    },
    {
      id: 'seafood',
      name: 'Seafood Products',
      slug: 'seafood',
      description: 'Fresh seafood products sourced from quality suppliers',
      items: [
        { id: 's1', name: 'Parla Fish' },
        { id: 's2', name: 'SF (Vanjaram)' },
        { id: 's3', name: 'Sea White Prawn' },
        { id: 's4', name: 'Squid' },
        { id: 's5', name: 'Blue Sea Crab' },
        { id: 's6', name: 'Three Spot Crab' },
      ]
    },
    {
      id: 'psdas',
      name: 'PSDAS',
      slug: 'psdas',
      description: 'Centralized Water Management System for efficient water distribution and monitoring',
      items: [
        { id: 'psd1', name: 'Tank Level Indicator (EB/Solar)', description: 'Hydrostatic sensor, 4G GSM/GPRS, maintenance-free' },
        { id: 'psd2', name: 'Mobile Controller (PMC-V13/V14)', description: 'Remote ON/OFF via phone/app, 2G/4G GSM/GPRS' },
        { id: 'psd3', name: 'Valve Controller', description: 'Remote valve actuation (app), 2G/4G GSM/GPRS' },
        { id: 'psd4', name: 'Ultrasonic Flow Meter', description: 'Measures flow in kL, 2G/4G GSM/GPRS, real-time RS485 output' },
        { id: 'psd5', name: 'Street Light Management System', description: 'Remote ON/OFF (astronomical/RTC timing), power monitoring, fault alerts' },
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
    msme: "TN-27-0021489",
    aboutShort: "Leading supplier of a wide variety of products and services to Central and State Government departments across India, with over 15 years of experience, strict delivery commitments, and 100% client satisfaction.",
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
    { title: 'Assured Warranty', description: 'All our products come with guaranteed warranty' },
    { title: 'Quality Assurance', description: 'Strict quality-assurance policy for all products' },
    { title: 'All-India Network', description: 'Distribution network covering the entire country' },
    { title: 'Premium Materials', description: 'Quality raw materials used in all our products' },
    { title: 'Cost-Effective', description: 'Competitive pricing due to high volumes' },
    { title: 'Quick Service', description: 'Responsive after-sales service' },
  ];