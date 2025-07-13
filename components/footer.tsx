import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#231f20] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#dd2a1b] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">GH</span>
              </div>
              <div>
                <h3 className="font-bold">Labour Department</h3>
                <p className="text-sm text-gray-300">Republic of Ghana</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Creating and maintaining a favourable employment environment through comprehensive labour administration
              services.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-gray-300 hover:text-[#dd2a1b] transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#dd2a1b] transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#dd2a1b] transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-[#dd2a1b]">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/laws" className="text-gray-300 hover:text-white transition-colors">
                  Labour Laws
                </Link>
              </li>
              <li>
                <Link href="/glims" className="text-gray-300 hover:text-white transition-colors">
                  GLIMS
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-gray-300 hover:text-white transition-colors">
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-[#dd2a1b]">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/employer" className="text-gray-300 hover:text-white transition-colors">
                  Employer Services
                </Link>
              </li>
              <li>
                <Link href="/services/worker" className="text-gray-300 hover:text-white transition-colors">
                  Worker Services
                </Link>
              </li>
              <li>
                <Link href="/services/training" className="text-gray-300 hover:text-white transition-colors">
                  Skills & Training
                </Link>
              </li>
              <li>
                <Link href="/services/licensing" className="text-gray-300 hover:text-white transition-colors">
                  Licensing
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="text-gray-300 hover:text-white transition-colors">
                  File Complaint
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-[#dd2a1b]">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-[#dd2a1b]" />
                <div>
                  <p className="text-gray-300">0800 600 300</p>
                  <p className="text-gray-300">0800 600 400</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-[#dd2a1b]" />
                <p className="text-gray-300">info@labour.gov.gh</p>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-[#dd2a1b] mt-0.5" />
                <div>
                  <p className="text-gray-300">Labour Department</p>
                  <p className="text-gray-300">Accra, Ghana</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Labour Department of Ghana. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-300 hover:text-white text-sm transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
