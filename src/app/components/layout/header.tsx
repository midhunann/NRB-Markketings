"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

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
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ]
  
  const isActive = (path: string) => pathname === path

  return (
    <header className="w-full">
      {/* Top Info Bar */}
      <div className="bg-secondary text-secondary-foreground py-2">
        <div className="container mx-auto px-4 text-sm flex justify-between items-center">
          <div>
            <span className="hidden sm:inline">We are the Trend Setter in the industry</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+919496899999" className="hover:text-white transition-colors duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +91 94968 99999
            </a>
            <a href="mailto:nrbmarkketings@gmail.com" className="hover:text-white transition-colors duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              nrbmarkketings@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? "bg-background/95 backdrop-blur-sm shadow-md py-3" 
            : "bg-background py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-primary transition-transform duration-300 transform hover:scale-105">
              NRB Markketings
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    relative px-5 py-2 rounded-md text-sm font-medium transition-all duration-300
                    hover:text-primary
                    ${isActive(item.href) 
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:transform after:scale-x-100 after:transition-transform after:duration-300" 
                      : "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
              <a 
                href="tel:+919496899999"
                className="ml-4 px-5 py-2 bg-primary text-primary-foreground rounded-md transition-all duration-300 transform hover:shadow-lg hover:-translate-y-0.5"
              >
                Get in Touch
              </a>
            </div>

            {/* Mobile Navigation Toggle */}
            <button 
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 z-50 bg-background lg:hidden transition-all duration-300 transform ${
            isOpen 
              ? "translate-x-0 opacity-100" 
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex justify-end p-4">
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  px-4 py-3 text-lg rounded-md transition-all duration-300
                  ${isActive(item.href) 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
            <a 
              href="tel:+919496899999"
              className="mt-6 px-4 py-3 bg-primary text-primary-foreground rounded-md text-center font-medium transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default MainNavigation