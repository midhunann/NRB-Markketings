import Link from 'next/link';
import { companyInfo, navLinks } from '@/app/lib/data';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{companyInfo.name}</h3>
            <p className="mb-4">{companyInfo.aboutShort}</p>
            <p className="text-sm mb-2">
              <strong>Address:</strong> {companyInfo.address}
            </p>
            <p className="text-sm mb-2">
              <strong>Email:</strong> {companyInfo.email}
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> {companyInfo.mobile}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Registration Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Registration Info</h3>
            <p className="text-sm mb-2">
              <strong>GST:</strong> {companyInfo.gst}
            </p>
            <p className="text-sm mb-4">
              <strong>MSME UDYAM:</strong> {companyInfo.msme}
            </p>
            <Link 
              href="/contact" 
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/90"
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
    );
  }