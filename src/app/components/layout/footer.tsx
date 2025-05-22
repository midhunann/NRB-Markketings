'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { companyInfo, navLinks } from '@/app/lib/data';
import { 
  ChevronUp, 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Star,
  CheckCircle
} from 'lucide-react';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle expandable sections on mobile
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
        setShowNewsletter(false);
      }, 3000);
    }
  };

  const quickLinks = [
    ...navLinks,
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', Icon: Facebook },
    { name: 'Twitter', href: '#', Icon: Twitter },
    { name: 'LinkedIn', href: '#', Icon: Linkedin },
    { name: 'Instagram', href: '#', Icon: Instagram },
  ];

  return (
    <>
      <footer className="bg-primary text-primary-foreground relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative">
          {/* Brand Story Section */}
          <div className="text-center mb-12 border-b border-primary-foreground/20 pb-8">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-secondary mr-2" />
              <h2 className="text-2xl font-heading font-bold">{companyInfo.name}</h2>
              <Star className="h-6 w-6 text-secondary ml-2" />
            </div>
            <p className="text-lg font-medium text-primary-foreground/90 mb-2">
              {companyInfo.tagline}
            </p>
            <p className="text-sm text-primary-foreground/70 max-w-2xl mx-auto">
              Trusted by government departments nationwide • Quality assured • Delivered on time
            </p>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between md:justify-start mb-4">
                <h3 className="text-lg font-heading font-semibold">Company Information</h3>
                <button
                  onClick={() => toggleSection('company')}
                  className="md:hidden p-1 hover:bg-primary-foreground/10 rounded transition-colors"
                  aria-label="Toggle company information"
                >
                  {expandedSections.company ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
              
              <div className={`space-y-3 ${expandedSections.company || 'max-md:hidden'}`}>
                <p className="text-sm text-primary-foreground/80 leading-relaxed">
                  {companyInfo.aboutShort}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-start space-x-3 group">
                    <MapPin className="h-4 w-4 mt-0.5 text-secondary group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-primary-foreground/90">{companyInfo.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 group hover:text-secondary transition-colors">
                    <Mail className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" />
                    <a href={`mailto:${companyInfo.email}`} className="text-sm">
                      {companyInfo.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3 group hover:text-secondary transition-colors">
                    <Phone className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" />
                    <a href={`tel:${companyInfo.mobile}`} className="text-sm">
                      {companyInfo.mobile}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="flex items-center justify-between md:justify-start mb-4">
                <h3 className="text-lg font-heading font-semibold">Quick Links</h3>
                <button
                  onClick={() => toggleSection('links')}
                  className="md:hidden p-1 hover:bg-primary-foreground/10 rounded transition-colors"
                  aria-label="Toggle quick links"
                >
                  {expandedSections.links ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
              
              <ul className={`space-y-2 ${expandedSections.links || 'max-md:hidden'}`}>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-primary-foreground/80 hover:text-secondary hover:translate-x-1 transition-all duration-200 inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Registration & Certifications */}
            <div>
              <div className="flex items-center justify-between md:justify-start mb-4">
                <h3 className="text-lg font-heading font-semibold">Certifications</h3>
                <button
                  onClick={() => toggleSection('registration')}
                  className="md:hidden p-1 hover:bg-primary-foreground/10 rounded transition-colors"
                  aria-label="Toggle certifications"
                >
                  {expandedSections.registration ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
              
              <div className={`space-y-3 ${expandedSections.registration || 'max-md:hidden'}`}>
                <div className="bg-primary-foreground/5 rounded-lg p-3 border border-primary-foreground/10">
                  <p className="text-xs text-primary-foreground/60 mb-1">GST Registration</p>
                  <p className="text-sm font-mono">{companyInfo.gst}</p>
                </div>
                
                <div className="bg-primary-foreground/5 rounded-lg p-3 border border-primary-foreground/10">
                  <p className="text-xs text-primary-foreground/60 mb-1">MSME UDYAM</p>
                  <p className="text-sm font-mono">{companyInfo.msme}</p>
                </div>
                
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center w-full bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <Mail className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Get Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter & Social Section */}
          <div className="border-t border-primary-foreground/20 pt-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-primary-foreground/70">Follow us:</span>
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    className="p-2 bg-primary-foreground/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 hover:scale-110 group"
                    aria-label={`Follow us on ${name}`}
                  >
                    <Icon className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  </a>
                ))}
              </div>

              {/* Newsletter Subscription */}
              <div className="flex items-center space-x-4">
                {!showNewsletter ? (
                  <button
                    onClick={() => setShowNewsletter(true)}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors underline decoration-dotted underline-offset-4"
                  >
                    Subscribe to Updates
                  </button>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex items-center space-x-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-sm text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                      required
                    />
                    <button
                      type="submit"
                      className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors group"
                      disabled={isSubscribed}
                    >
                      {isSubscribed ? (
                        <CheckCircle className="h-4 w-4 scale-check" />
                      ) : (
                        <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-primary-foreground/60 border-t border-primary-foreground/20 pt-6">
            <p>
              &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved. 
              <span className="mx-2">•</span>
              Proudly serving government departments across India
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-secondary text-secondary-foreground rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Newsletter Success Message */}
      {isSubscribed && (
        <div className="fixed bottom-6 left-6 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg slide-in-up">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 scale-check" />
            <span className="text-sm">Successfully subscribed!</span>
          </div>
        </div>
      )}
    </>
  );
}