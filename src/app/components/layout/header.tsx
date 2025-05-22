"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, Mail, Menu, X } from "lucide-react"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ]
  
  const isActive = (path: string) => pathname === path

  return (
    <header className="w-full h-16">
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-[var(--primary)] shadow-md'
            : 'bg-[var(--primary)]'
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center transition-colors duration-150 ease-in-out"
              aria-label="NRB Markketings - Home"
            >
              {/* FONT OPTION 1: Enhanced Bold with Logo Styling - CURRENTLY ACTIVE */}
              <span className="text-[var(--nude)] hover:text-[var(--secondary)] font-extrabold text-xl tracking-wide hover:[text-shadow:0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 transform hover:scale-101 select-none">
                NRB Markketings
              </span>

              {/* FONT OPTION 2: Gotham Bold/Ultra - UNCOMMENT TO USE (and comment out option 1 above) */}
              {/* 
              <span 
                className="text-[var(--nude)] hover:text-[var(--secondary)] text-2xl hover:[text-shadow:0_2px_8px_rgba(0,0,0,0.4)] transition-all duration-200 transform hover:scale-105 select-none"
                style={{ 
                  fontFamily: '"Gotham Ultra", "Gotham Bold", "Gotham", "Helvetica Neue", "Arial Black", sans-serif',
                  fontWeight: 900,
                  letterSpacing: '0.05em'
                }}
              >
                NRB Markketings
              </span>
              */}
            </Link>

            <div className="hidden sm:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative py-1 text-[var(--nude)] font-medium transition-colors duration-150 ease-in-out hover:text-[var(--secondary)] ${
                    isActive(item.href) ? "text-[var(--secondary)]" : ""
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 w-full bg-[var(--secondary)] transform transition-transform duration-150 ease-in-out ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <div className="hidden sm:flex items-center space-x-3">
              <a 
                href="tel:+919496899999"
                className="p-1.5 rounded-full text-[var(--nude)] transition-all duration-150 ease-in-out hover:text-[var(--secondary)]"
                aria-label="Call us"
              >
                <Phone size={18} />
              </a>
              <a 
                href="mailto:info@nrbmarkketings.com"
                className="p-1.5 rounded-full text-[var(--nude)] transition-all duration-150 ease-in-out hover:text-[var(--secondary)]"
                aria-label="Email us"
              >
                <Mail size={18} />
              </a>
            </div>

            <button 
              className="sm:hidden p-2 rounded-md text-[var(--nude)] hover:bg-[var(--nude)]/10 transition-colors duration-150"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div 
          id="mobile-menu"
          className={`fixed inset-0 z-50 bg-gradient-to-b from-[var(--primary)]/90 to-[var(--primary)]/95 backdrop-blur-lg sm:hidden transition-all duration-300 ease-in-out transform ${
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
            <div className="flex justify-between items-center p-3 border-b border-[var(--nude)]/10">
              {/* MOBILE LOGO - OPTION 1: Enhanced Bold - CURRENTLY ACTIVE */}
              <span className="text-xl font-black tracking-wide text-[var(--nude)]">NRB Markketings</span>
              
              {/* MOBILE LOGO - OPTION 2: Gotham Bold/Ultra - UNCOMMENT TO USE (and comment out option 1 above) */}
              {/* 
              <span 
                className="text-xl text-[var(--nude)]"
                style={{ 
                  fontFamily: '"Gotham Ultra", "Gotham Bold", "Gotham", "Helvetica Neue", "Arial Black", sans-serif',
                  fontWeight: 900,
                  letterSpacing: '0.05em'
                }}
              >
                NRB Markketings
              </span>
              */}
              
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-[var(--nude)] hover:bg-whit[var(--nude)]e/10 transition-colors duration-150"
                aria-label="Close Navigation Menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col space-y-2 p-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    px-3 py-2 text-lg rounded-md transition-all duration-150 ease-in-out
                    ${isActive(item.href) 
                      ? "bg-[var(--nude)]/10 text-[var(--nude)] font-medium" 
                      : "text-[var(--nude)]/90 hover:bg-[var(--nude)]/5 hover:text-[var(--nude)]"
                    }
                  `}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex space-x-3 mt-4 px-3 py-2">
                <a 
                  href="tel:+919496899999"
                  className="flex items-center space-x-2 text-[var(--nude)]/90 hover:text-[var(--nude)] transition-colors duration-150"
                  aria-label="Call us at +91 94968 99999"
                >
                  <Phone size={18} />
                  <span>Call Us</span>
                </a>
                <a 
                  href="mailto:info@nrbmarkketings.com"
                  className="flex items-center space-x-2 text-[var(--nude)]/90 hover:text-[var(--nude)] transition-colors duration-150"
                  aria-label="Email us at info@nrbmarkketings.com"
                >
                  <Mail size={18} />
                  <span>Email</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header