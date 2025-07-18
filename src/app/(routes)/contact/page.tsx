"use client";
import { useState, useRef, useEffect } from 'react';
import { companyInfo } from '@/app/lib/data';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Honeypot field to catch bots
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successBannerRef = useRef<HTMLDivElement>(null);

  // Form validation
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address';
      case 'message':
        return value.trim() ? '' : 'Message is required';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if honeypot is filled (bot detection)
    if (formData.honeypot) {
      console.log('Bot detected');
      return;
    }
    
    // Validate all fields before submission
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    
    setFormErrors(newErrors);
    
    // If there are any errors, don't submit
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '', honeypot: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };

  // Handle success banner animation
  useEffect(() => {
    if (isSuccess && successBannerRef.current) {
      successBannerRef.current.classList.remove('translate-y-full');
      successBannerRef.current.classList.add('translate-y-0');
    } else if (successBannerRef.current) {
      successBannerRef.current.classList.remove('translate-y-0');
      successBannerRef.current.classList.add('translate-y-full');
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-[var(--nude)] pt-16 pb-24">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        {/* Page Header - Minimal and centered */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Let&apos;s Get in Touch</h1>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re here to answer your questions, explore partnerships, or hear your feedback—reach out, and we&apos;ll respond within one business day.
          </div>
        </div>

        {/* Contact Form - Single-column, centered layout */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-10 relative overflow-hidden">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {/* Name input with floating label */}
            <div className="relative">
              <div className="relative">
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`peer w-full px-4 pt-6 pb-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                    formErrors.name ? 'border-destructive focus:ring-destructive/30' : 'border-border focus:ring-primary/30 focus:border-primary'
                  } placeholder-transparent`}
                  placeholder="Your Name"
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-4 -top-0.5 text-sm text-muted-foreground transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-0.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  Your Name
                </label>
                {formData.name && !formErrors.name && (
                  <span className="absolute right-4 top-5 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                )}
              </div>
              {formErrors.name && (
                <p id="name-error" className="mt-1 text-sm text-destructive" aria-live="polite">
                  {formErrors.name}
                </p>
              )}
            </div>
            
            {/* Email input with floating label */}
            <div className="relative">
              <div className="relative">
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`peer w-full px-4 pt-6 pb-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
                    formErrors.email ? 'border-destructive focus:ring-destructive/30' : 'border-border focus:ring-primary/30 focus:border-primary'
                  } placeholder-transparent`}
                  placeholder="you@example.com"
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-4 -top-0.5 text-sm text-muted-foreground transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-0.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  Your Email
                </label>
                {formData.email && !formErrors.email && (
                  <span className="absolute right-4 top-5 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                )}
              </div>
              {formErrors.email && (
                <p id="email-error" className="mt-1 text-sm text-destructive" aria-live="polite">
                  {formErrors.email}
                </p>
              )}
            </div>
            
            {/* Message textarea with floating label */}
            <div className="relative">
              <div className="relative">
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5} 
                  className={`peer w-full px-4 pt-6 pb-2 border rounded-md focus:outline-none focus:ring-2 transition-all resize-none ${
                    formErrors.message ? 'border-destructive focus:ring-destructive/30' : 'border-border focus:ring-primary/30 focus:border-primary'
                  } placeholder-transparent`}
                  placeholder="How can we help you today?"
                  aria-invalid={!!formErrors.message}
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-4 -top-0.5 text-sm text-muted-foreground transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-0.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  How can we help you today?
                </label>
                {formData.message && !formErrors.message && (
                  <span className="absolute right-4 top-5 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                )}
              </div>
              {formErrors.message && (
                <p id="message-error" className="mt-1 text-sm text-destructive" aria-live="polite">
                  {formErrors.message}
                </p>
              )}
            </div>
            
            {/* Honeypot field for bot detection */}
            <div className="absolute top-0 left-0 -z-10 opacity-0 h-0 w-0 overflow-hidden">
              <label htmlFor="honeypot">Leave this field empty</label>
              <input 
                type="text" 
                id="honeypot" 
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            
            {/* Submit button with animation */}
            <div className="relative">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="relative min-h-11 min-w-44 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden"
                aria-label="Send your message"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : "Send Message"}
                <span className="ripple absolute rounded-full bg-white bg-opacity-30 pointer-events-none"></span>
              </button>
            </div>
          </form>

          {/* Company contact information - simplified and minimal */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-3 flex justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <p className="font-medium text-sm uppercase tracking-wider mb-1">Call Us</p>
                <a href={`tel:${companyInfo.mobile}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {companyInfo.mobile}
                </a>
              </div>
              
              <div className="text-center">
                <div className="mb-3 flex justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <p className="font-medium text-sm uppercase tracking-wider mb-1">Email Us</p>
                <a href={`mailto:${companyInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {companyInfo.email}
                </a>
              </div>
              
              <div className="text-center">
                <div className="mb-3 flex justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <p className="font-medium text-sm uppercase tracking-wider mb-1">Visit Us</p>
                <address className="text-muted-foreground not-italic">
                  {companyInfo.address}
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success message banner with slide-in animation */}
      <div 
        ref={successBannerRef} 
        className="fixed bottom-0 inset-x-0 bg-green-600 text-white p-4 transform translate-y-full transition-transform duration-500 ease-in-out"
        role="alert"
        aria-live="assertive"
      >
        <div className="container max-w-3xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Thank you! Your message has been sent successfully.</span>
          </div>
          <button 
            onClick={() => setIsSuccess(false)} 
            className="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}