"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Mail } from "lucide-react"
import { SearchBar } from "@/components/search/search-bar"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Labour Laws", href: "/laws" },
  { name: "News & Media", href: "/news" },
  { name: "GLIMS", href: "/glims" },
  { name: "Reports", href: "/reports" },
  { name: "Training", href: "/training" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#231f20] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                <span>0800 600 300 / 0800 600 400</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                <span>info@labour.gov.gh</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Ministry of Employment and Labour Relations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#dd2a1b] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">GH</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#231f20]">Labour Department</h1>
              <p className="text-sm text-gray-600">Republic of Ghana</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#dd2a1b] font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <SearchBar />
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-[#dd2a1b] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
