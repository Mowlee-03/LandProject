import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">RealEstate</h3>
            <p className="text-muted-foreground">
              Your trusted partner in finding the perfect property. We make real estate simple and
              accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="/properties" className="hover:text-primary">
                  Properties
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Real Estate Street</li>
              <li>Beverly Hills, CA 90210</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@realestate.com</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 RealEstate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

