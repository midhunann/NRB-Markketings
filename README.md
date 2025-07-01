# NRB Markketings Website

A modern, responsive corporate website built for NRB Markketings - a government surplus dealer specializing in electronics, chemicals, plumbing supplies, and PSDAS (water management systems).

## 🏗️ Technical Architecture

### Core Stack
- **Framework**: Next.js 15.3.2 with App Router
- **Runtime**: React 19.0.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.0 + Custom CSS Variables
- **Animations**: Framer Motion 12.10.5
- **UI Components**: Radix UI + Custom shadcn/ui components

### Project Structure
```
src/
├── app/
│   ├── (routes)/           # Route groups
│   │   ├── page.tsx        # Homepage
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   └── products/       # Products catalog
│   ├── components/         # Reusable components
│   │   ├── hero/          # Hero section
│   │   ├── home/          # Homepage-specific components
│   │   ├── layout/        # Header & Footer
│   │   ├── product/       # Product-related components
│   │   └── ui/            # Base UI components (shadcn/ui)
│   ├── lib/               # Utilities & configurations
│   │   ├── animations.ts  # Framer Motion variants
│   │   ├── data.ts        # Static data & types
│   │   ├── fonts.ts       # Next.js font optimization
│   │   └── tab-utils.ts   # Tab navigation utilities
│   ├── globals.css        # Global styles & CSS variables
│   └── layout.tsx         # Root layout
```

## 🎨 Design System

### Color Palette
- **Primary**: `#2c3b4d` (Dark blue)
- **Secondary**: `#ffb162` (Gold)
- **Muted**: `#e3e4e5` (Light gray)
- **Nude**: `#eee9df` (Off-white)

### Typography
- **Body**: Manrope (Google Fonts via next/font)
- **Headings**: Lora (Google Fonts via next/font)
- Optimized loading with font display swap

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Fluid typography and spacing

## 🔧 Key Features & Components

### 1. Hero Section (`/components/hero/hero.tsx`)
- Full-viewport height with background image
- Smooth animations with Framer Motion
- Responsive typography
- Call-to-action button with hover effects

### 2. Service Carousel (`/components/home/service-carousel.tsx`)
- Auto-scrolling infinite carousel
- Pause on hover functionality
- Displays government service areas
- Smooth CSS animations

### 3. Product Catalog (`/(routes)/products/page.tsx`)
- Dynamic tab navigation with keyboard support
- Scroll-synchronized active tab highlighting
- Hash-based URL routing (#electronics, #chemicals, etc.)
- Intersection Observer for auto-tab switching
- Smooth scrolling with offset calculations

### 4. Product Cards (`/components/product/product-card.tsx`)
- Image optimization with Next.js Image component
- Hover animations and scale effects
- Lazy loading for performance
- Responsive aspect ratios

### 5. Animation System (`/lib/animations.ts`)
- Centralized animation variants
- Consistent easing functions
- Performance-optimized motion values
- Stagger animations for lists

## 📊 Data Architecture

### Product Categories (`/lib/data.ts`)
```typescript
type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  items: ProductItem[];
};
```

### Static Data Management
- Type-safe product catalog
- Company information
- Navigation links
- Features list
- All data centralized in `/lib/data.ts`

## 🎯 Performance Optimizations

### Image Optimization
- Next.js Image component with responsive sizing
- Lazy loading on product cards
- Priority loading for hero images
- WebP format support

### Font Optimization
- Google Fonts loaded via next/font
- Font display swap for FOIT prevention
- Preload critical fonts

### Code Splitting
- Route-based code splitting with App Router
- Dynamic imports for heavy components
- Tree shaking for unused code

### Animation Performance
- CSS transforms over layout properties
- Will-change hints for GPU acceleration
- Reduced motion respect

## 🧭 Navigation & Routing

### URL Structure
- `/` - Homepage
- `/about` - Company information
- `/products` - Product catalog with hash navigation
- `/contact` - Contact information

### Hash Navigation
Products page supports hash-based category navigation:
- `/products#electronics`
- `/products#chemicals`
- `/products#plumbing`
- `/products#psdas`

## 🎨 Styling Architecture

### CSS Custom Properties
```css
:root {
  --primary: #2c3b4d;
  --secondary: #ffb162;
  --muted: #e3e4e5;
  --nude: #eee9df;
}
```

### Tailwind Configuration
- Custom color palette integration
- Extended theme configuration
- Custom component classes
- Responsive design tokens

### Component Styling Strategy
- Utility-first with Tailwind CSS
- CSS custom properties for theming
- Component-scoped styles when needed
- Consistent spacing and sizing

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation
```bash
npm install
npm run dev
```

### Build Process
```bash
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint checks
```

### Environment
- Development: `http://localhost:3000`
- Auto-reload on file changes
- Error overlay for development

## 📱 Browser Support

- Chrome 91+
- Firefox 90+
- Safari 14+
- Edge 91+

## 🔄 State Management

### Client-Side State
- React useState for component state
- URL state for navigation (hash routing)
- No external state management library

### Data Flow
```
Static Data (data.ts) → Components → UI Rendering
      ↓
URL State ↔ Navigation Components ↔ Product Filters
```

## 🎭 Animation Strategy

### Motion Philosophy
- Smooth, purposeful animations
- Respect user preferences (reduced motion)
- Performance-first approach
- Consistent timing and easing

### Animation Types
- **Entrance**: fadeIn, slideUp
- **Interaction**: hover, focus, tap
- **Navigation**: smooth scrolling, tab switching
- **Background**: parallax, carousel

This website showcases modern web development practices with a focus on performance, accessibility, and user experience.
