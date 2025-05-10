"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

// Style constants for better readability and DRY principles
const STYLES = {
  navLink: {
    base: "relative px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary group",
    inactive: "text-foreground hover:text-primary hover:bg-primary/5 hover:shadow-sm hover:-translate-y-0.5",
    active: "text-primary",
    underline: {
      base: "absolute bottom-0 left-0 h-0.5 w-full bg-primary transform transition-transform duration-300",
      inactive: "scale-x-0 group-hover:scale-x-100",
      active: "scale-x-100"
    }
  },
  ctaButton: "px-5 py-2 bg-primary text-primary-foreground rounded-md transition-all duration-300 transform hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
}

interface NavItem {
  name: string;
  href: string;
}

const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Trap focus in mobile menu when open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.body.style.overflow = 'hidden' // Prevent background scrolling
      document.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])
  
  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ]
  
  const isActive = (path: string) => pathname === path

  return (
    <header className="w-full h-20">
      {/* Sticky Header - Always visible with backdrop blur */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white/85 backdrop-blur-md shadow-sm py-4"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo with image and text */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 transition-transform duration-300 transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="NRB Markketings - Home"
            >
              <Image
                src="/images/logo.png"
                alt="NRB Logo"
                width={40}
                height={40}
                className="w-20 h-auto"
              />
              <span className="text-xl font-bold text-primary">Markketings</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${STYLES.navLink.base} ${
                    isActive(item.href) 
                      ? STYLES.navLink.active
                      : STYLES.navLink.inactive
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                  <span 
                    className={`${STYLES.navLink.underline.base} ${
                      isActive(item.href)
                        ? STYLES.navLink.underline.active
                        : STYLES.navLink.underline.inactive
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Navigation Toggle */}
            <button 
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Uses CSS transitions with transform for smooth animation */}
        <div 
          id="mobile-menu"
          className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-md lg:hidden transition-all duration-300 ease-in-out transform ${
            isOpen 
              ? "translate-x-0 opacity-100" 
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-border/50">
              <Link 
                href="/" 
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src="/images/logo.png"
                  alt="NRB Logo"
                  width={32}
                  height={32}
                  className="w-8 h-auto"
                />
                <span className="text-lg font-bold text-primary">Markketings</span>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Close Navigation Menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    px-4 py-3 text-lg rounded-md transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                    ${isActive(item.href) 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }
                  `}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <a 
                href="tel:+919496899999"
                className="mt-6 px-4 py-3 bg-primary text-primary-foreground rounded-md text-center font-medium transition-all duration-300 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Call us at +91 94968 99999"
              >
                Get in Touch
              </a>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default MainNavigation