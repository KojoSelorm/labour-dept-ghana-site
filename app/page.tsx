import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, FileText, Briefcase, Shield, Phone, MapPin, Mail } from "lucide-react"
import Link from "next/link"
import { HeroCarousel } from "@/components/hero-carousel"
import { QuickLinks } from "@/components/quick-links"
import { NewsSection } from "@/components/news-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ChatBot } from "@/components/chat-bot"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#dd2a1b] to-[#2b3990] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                  <div className="w-12 h-12 bg-[#dd2a1b] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">GH</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold">Labour Department</h1>
                  <p className="text-lg opacity-90">Republic of Ghana</p>
                </div>
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">Creating a Favourable Employment Environment</h2>
              <p className="text-xl mb-8 opacity-90">
                Enforcing labour laws, facilitating employment services, and promoting industrial harmony nationwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="https://glmis.gov.gh" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-[#dd2a1b] hover:bg-gray-100">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Find a Job
                  </Button>
                </Link>
                <Link href="/complaints">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#dd2a1b]"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Report an Issue
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <QuickLinks />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#2b3990] text-white">About Labour Department</Badge>
              <h2 className="text-3xl font-bold mb-6 text-[#231f20]">Ghana's Premier Labour Administration</h2>
              <p className="text-lg text-gray-600 mb-6">
                The Ghana Labour Department (LD) ensures a favourable employment environment through enforcement of
                labour laws, employment service delivery, labour inspections, industrial relations, child labour
                elimination, and workmen's compensation facilitation.
              </p>
              <p className="text-gray-600 mb-8">
                We serve as a key arm of the Ministry of Employment and Labour Relations, guided by the Labour Act, 2003
                (Act 651) and international labour standards, committed to fostering a fair and productive labour
                environment.
              </p>
              <Link href="/about">
                <Button className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-[#dd2a1b]">
                <CardHeader className="pb-3">
                  <Users className="h-8 w-8 text-[#dd2a1b] mb-2" />
                  <CardTitle className="text-lg">50,000+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Workers Protected</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-[#2b3990]">
                <CardHeader className="pb-3">
                  <Briefcase className="h-8 w-8 text-[#2b3990] mb-2" />
                  <CardTitle className="text-lg">15,000+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Jobs Facilitated</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-[#dd2a1b]">
                <CardHeader className="pb-3">
                  <Shield className="h-8 w-8 text-[#dd2a1b] mb-2" />
                  <CardTitle className="text-lg">2,500+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Inspections Conducted</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-[#2b3990]">
                <CardHeader className="pb-3">
                  <FileText className="h-8 w-8 text-[#2b3990] mb-2" />
                  <CardTitle className="text-lg">1,200+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Disputes Resolved</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Core Mandates */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Our Foundation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Guided by our vision, mission, and core mandates to serve Ghana's labour market effectively.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[#dd2a1b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">V</span>
                </div>
                <CardTitle className="text-[#dd2a1b]">Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A one-stop shop state-of-the-art centre of excellence for Labour Market Information and
                  employer/employee protection.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[#2b3990] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">M</span>
                </div>
                <CardTitle className="text-[#2b3990]">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To create and maintain a favourable employment environment through employment service delivery, labour
                  inspections, and promotion of harmonious industrial relations.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[#231f20] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">C</span>
                </div>
                <CardTitle className="text-[#231f20]">Core Mandates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Industrial relations, labour inspection, national employment services, vocational guidance,
                  international labour affairs, and child labour monitoring.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* News & Updates */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-[#231f20]">Latest News & Updates</h2>
              <p className="text-gray-600">Stay informed about labour developments in Ghana</p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                View All News
              </Button>
            </Link>
          </div>
          <NewsSection />
        </div>
      </section>

      {/* Call to Actions */}
      <section className="py-16 bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Can We Help You?</h2>
            <p className="text-xl opacity-90">Access our key services and resources</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <CardTitle>Report a Labour Issue</CardTitle>
                <CardDescription className="text-white/80">
                  File complaints about workplace violations or disputes
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/complaints">
                  <Button className="bg-white text-[#2b3990] hover:bg-gray-100">Report Now</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
              <CardHeader className="text-center">
                <Briefcase className="h-12 w-12 mx-auto mb-4" />
                <CardTitle>Find a Job</CardTitle>
                <CardDescription className="text-white/80">
                  Search our comprehensive job portal for opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="https://glmis.gov.gh" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-white text-[#2b3990] hover:bg-gray-100">Search Jobs</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
              <CardHeader className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4" />
                <CardTitle>Verify Business License</CardTitle>
                <CardDescription className="text-white/80">
                  Check the validity of employment agency licenses
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/verify">
                  <Button className="bg-white text-[#2b3990] hover:bg-gray-100">Verify Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Get in Touch</h2>
            <p className="text-lg text-gray-600">We're here to help with your labour-related needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Hotline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-[#2b3990]">0800 600 300</p>
                <p className="text-lg font-semibold text-[#2b3990]">0800 600 400</p>
                <p className="text-sm text-gray-600 mt-2">24/7 Support Available</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Mail className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-[#2b3990]">info@labour.gov.gh</p>
                <p className="text-sm text-gray-600 mt-2">Response within 24 hours</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-[#2b3990]">Head Office</p>
                <p className="text-sm text-gray-600 mt-2">Accra, Ghana</p>
                <Link href="/contact">
                  <Button variant="outline" size="sm" className="mt-2">
                    View All Locations
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  )
}
