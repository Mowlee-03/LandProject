import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import logo from '../Assets/LOGO.png'
import logoname from '../Assets/LogoName.png'
export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className='flex bg-white rounded-lg border shadow-sm p-4 items-center  gap-3'>
              <img src={logo} alt="logo" className='h-10' />
              <img src={logoname} alt="logo" className='h-10' />
            </div>
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
              <li>Chennimalai-638051</li>
              <li>Erode,Tamilnadu</li>
              <li>Phone: +91 7530081966</li>
              <li>Email: sundaramagency1@gmail.com</li>
            </ul>
          </div>

          {/* Social Links */}
          {/* <div>
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
          </div> */}
        </div>

        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Sundaram Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

