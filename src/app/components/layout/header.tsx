"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

// Style constants for better readability and DRY principles
const STYLES = {
  navLink: {
    base: "relative px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary",
    inactive: "text-foreground hover:text-primary",
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
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
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
    <header className="w-full">
      {/* Main Navigation */}
      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? "bg-secondary/95 backdrop-blur-sm shadow-md py-3" 
            : "bg-secondary py-3"
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-xl font-bold text-primary transition-transform duration-300 transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="NRB Markketings - Home"
            >
              NRB Markketings
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group ${STYLES.navLink.base} ${
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
          className={`fixed inset-0 z-50 bg-secondary lg:hidden transition-all duration-300 ease-in-out transform ${
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
            <div className="flex justify-end p-4">
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Close Navigation Menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-4 p-8">
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
                className="mt-6 px-4 py-3 bg-primary text-primary-foreground rounded-md text-center font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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