import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Contact Us</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We're here to help with your labour-related needs. Contact us through any of the channels below or visit
              one of our offices nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-t-4 border-t-[#dd2a1b]">
              <CardHeader>
                <Phone className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle className="text-[#dd2a1b]">Phone Support</CardTitle>
                <CardDescription>24/7 hotline service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-[#2b3990]">0800 600 300</p>
                  <p className="text-lg font-semibold text-[#2b3990]">0800 600 400</p>
                  <p className="text-sm text-gray-600">Toll-free nationwide</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-t-[#2b3990]">
              <CardHeader>
                <Mail className="h-12 w-12 text-[#2b3990] mx-auto mb-4" />
                <CardTitle className="text-[#2b3990]">Email Support</CardTitle>
                <CardDescription>Response within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-[#dd2a1b]">info@labour.gov.gh</p>
                  <p className="text-sm text-gray-600">General inquiries</p>
                  <p className="text-lg font-semibold text-[#dd2a1b]">complaints@labour.gov.gh</p>
                  <p className="text-sm text-gray-600">Formal complaints</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-t-[#dd2a1b]">
              <CardHeader>
                <MapPin className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle className="text-[#dd2a1b]">Office Locations</CardTitle>
                <CardDescription>16 regional offices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-[#2b3990]">Head Office</p>
                  <p className="text-sm text-gray-600">Accra, Greater Accra Region</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    View All Locations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Office Hours */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#231f20]">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            {/* Office Hours and Additional Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-[#2b3990] mr-3" />
                    <CardTitle className="text-xl">Office Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday</span>
                      <span className="text-[#2b3990]">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span className="text-[#2b3990]">9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span className="text-gray-500">Closed</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <p className="text-sm text-gray-600">
                        <strong>Emergency Hotline:</strong> Available 24/7 for urgent labour issues
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Regional Offices</CardTitle>
                  <CardDescription>Find your nearest Labour Department office</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { region: "Greater Accra", city: "Accra", phone: "030-2123456" },
                      { region: "Ashanti", city: "Kumasi", phone: "032-2123456" },
                      { region: "Western", city: "Takoradi", phone: "031-2123456" },
                      { region: "Northern", city: "Tamale", phone: "037-2123456" },
                    ].map((office, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{office.region} Region</p>
                          <p className="text-sm text-gray-600">{office.city}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[#2b3990] font-medium">{office.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All 16 Offices
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#2b3990] text-white">
                <CardHeader>
                  <CardTitle>Suggestion Box</CardTitle>
                  <CardDescription className="text-white/80">Help us improve our services</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    We value your feedback and suggestions for improving our services and operations.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Submit Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
