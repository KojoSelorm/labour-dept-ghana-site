import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  Users,
  GraduationCap,
  Shield,
  FileText,
  Scale,
  Phone,
  Award,
  Briefcase,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Our Services</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Comprehensive Labour Services</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We offer a range of services including workplace registration, dispute resolution, labour inspections,
              grievance filing, vocational guidance, and licensing to support Ghana's labour market.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Employer Services */}
            <div className="lg:col-span-2">
              <Card className="h-full border-l-4 border-l-[#dd2a1b]">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Building className="h-8 w-8 text-[#dd2a1b] mr-3" />
                    <div>
                      <CardTitle className="text-2xl text-[#dd2a1b]">Employer Services</CardTitle>
                      <CardDescription>Supporting businesses and employers</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#dd2a1b] rounded-full mt-2 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Workplace Registration</h4>
                        <p className="text-sm text-gray-600">
                          Register your business and comply with labour regulations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#dd2a1b] rounded-full mt-2 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Job Posting Portal</h4>
                        <p className="text-sm text-gray-600">Post job vacancies on GLIMS for nationwide reach</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#dd2a1b] rounded-full mt-2 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Dispute Resolution Services</h4>
                        <p className="text-sm text-gray-600">Professional mediation for workplace conflicts</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#dd2a1b] rounded-full mt-2 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Labour Inspections</h4>
                        <p className="text-sm text-gray-600">
                          Ensuring compliance with labour laws and workplace safety
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Link href="https://glmis.gov.gh" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#dd2a1b] hover:bg-[#c02419] mb-2">Post Jobs on GLIMS</Button>
                    </Link>
                    <Link href="/services/employer">
                      <Button
                        variant="outline"
                        className="w-full border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Worker Services */}
            <div className="lg:col-span-2">
              <Card className="h-full border-l-4 border-l-[#2b3990]">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Users className="h-8 w-8 text-[#2b3990] mr-3" />
                    <div>
                      <CardTitle className="text-2xl text-[#2b3990]">Worker Services</CardTitle>
                      <CardDescription>Protecting and empowering workers</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#2b3990] rounded-full mt-2 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Job Seeker Registration</h4>
                        <p className="text-sm text-gray-600">Register on GLIMS to access job opportunities</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#2b3990] rounded-full mt-2 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Grievance Filing</h4>
                        <p className="text-sm text-gray-600">Submit complaints about workplace violations</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#2b3990] rounded-full mt-2 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Labour Rights Information</h4>
                        <p className="text-sm text-gray-600">Clear guidance on worker rights under Ghanaian law</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-[#2b3990] rounded-full mt-2 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Union Support</h4>
                        <p className="text-sm text-gray-600">Assistance with union formation and activities</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Link href="https://glmis.gov.gh" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#2b3990] hover:bg-[#1e2a70] mb-2">Register on GLIMS</Button>
                    </Link>
                    <Link href="/services/worker">
                      <Button
                        variant="outline"
                        className="w-full border-[#2b3990] text-[#2b3990] hover:bg-[#2b3990] hover:text-white"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Additional Services</h2>
            <p className="text-lg text-gray-600">
              Comprehensive support for skills development and regulatory compliance
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Skills & Training */}
            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-8 w-8 text-[#dd2a1b] mr-3" />
                  <div>
                    <CardTitle className="text-xl">Skills & Training</CardTitle>
                    <CardDescription>Enhancing workforce capabilities</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-[#dd2a1b] mr-2" />
                    <span className="text-sm">Skills Training Projects</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-[#dd2a1b] mr-2" />
                    <span className="text-sm">Career Guidance Programs</span>
                  </div>
                  <div className="flex items-center">
                    <UserCheck className="h-4 w-4 text-[#dd2a1b] mr-2" />
                    <span className="text-sm">Apprenticeship Opportunities</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-4 text-sm">
                  Initiatives to enhance youth skills and provide career guidance for sustainable employment.
                </p>
                <Link href="/services/training">
                  <Button
                    variant="outline"
                    className="mt-4 border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white"
                  >
                    Explore Training
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Licensing & Certification */}
            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-[#2b3990] mr-3" />
                  <div>
                    <CardTitle className="text-xl">Licensing & Certification</CardTitle>
                    <CardDescription>Regulatory compliance and verification</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-[#2b3990] mr-2" />
                    <span className="text-sm">Employment Agencies Licensing</span>
                  </div>
                  <div className="flex items-center">
                    <Scale className="h-4 w-4 text-[#2b3990] mr-2" />
                    <span className="text-sm">Business License Verification</span>
                  </div>
                  <div className="flex items-center">
                    <UserCheck className="h-4 w-4 text-[#2b3990] mr-2" />
                    <span className="text-sm">Compliance Certification</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-4 text-sm">
                  Verification tools and licensing services for employers and job seekers.
                </p>
                <Link href="/services/licensing">
                  <Button
                    variant="outline"
                    className="mt-4 border-[#2b3990] text-[#2b3990] hover:bg-[#2b3990] hover:text-white"
                  >
                    Get Licensed
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Request Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">How to Access Our Services</h2>
            <p className="text-lg text-gray-600">Simple steps to get the support you need</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Identify Your Need",
                description: "Determine which service category applies to your situation",
              },
              {
                step: "2",
                title: "Contact Us",
                description: "Reach out via phone, email, or visit our offices",
              },
              {
                step: "3",
                title: "Submit Requirements",
                description: "Provide necessary documentation and information",
              },
              {
                step: "4",
                title: "Receive Support",
                description: "Get professional assistance and follow-up services",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#dd2a1b] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-[#dd2a1b] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Phone className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="text-xl mb-8 opacity-90">Our hotlines are available 24/7 for urgent labour-related issues</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-center">
                <p className="text-2xl font-bold">0800 600 300</p>
                <p className="text-sm opacity-75">General Inquiries</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <p className="text-2xl font-bold">0800 600 400</p>
                <p className="text-sm opacity-75">Emergency Complaints</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
