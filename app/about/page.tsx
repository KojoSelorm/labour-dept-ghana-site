import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, Globe, Shield, Briefcase } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">About Us</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Ghana's Premier Labour Administration</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Established under the Labour Act, 2003 (Act 651), we serve as the principal government agency enforcing
              labour laws and providing employment-related services across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#231f20]">Our History</h2>
              <p className="text-lg text-gray-600 mb-6">
                The Labour Department has evolved as Ghana's cornerstone institution for labour administration, built on
                decades of commitment to fair employment practices and worker protection.
              </p>
              <p className="text-gray-600 mb-6">
                Guided by the Labour Act, 2003 (Act 651) and aligned with international labour standards, we have
                continuously adapted to meet the changing needs of Ghana's dynamic labour market.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-l-4 border-l-[#dd2a1b]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl text-[#dd2a1b]">2003</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Labour Act Established</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-[#2b3990]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl text-[#2b3990]">16</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">Regional Offices</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Labour Department History"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Organizational Structure</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive structure ensures effective service delivery across all aspects of labour
              administration.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Industrial Relations",
                description: "Promoting harmonious workplace relationships and dispute resolution",
                icon: Users,
                color: "text-[#dd2a1b]",
              },
              {
                title: "Labour Inspection",
                description: "Ensuring compliance with labour laws and workplace safety standards",
                icon: Shield,
                color: "text-[#2b3990]",
              },
              {
                title: "National Employment Service",
                description: "Facilitating job matching and employment opportunities",
                icon: Briefcase,
                color: "text-[#dd2a1b]",
              },
              {
                title: "Vocational Guidance",
                description: "Career counseling and skills development programs",
                icon: Target,
                color: "text-[#2b3990]",
              },
              {
                title: "International Labour Affairs",
                description: "Managing international labour relations and conventions",
                icon: Globe,
                color: "text-[#dd2a1b]",
              },
              {
                title: "Child Labour Monitoring",
                description: "Protecting children from harmful labour practices",
                icon: Award,
                color: "text-[#2b3990]",
              },
            ].map((division, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <division.icon className={`h-12 w-12 ${division.color} mb-4`} />
                  <CardTitle className="text-lg">{division.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{division.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Leadership Team</h2>
            <p className="text-lg text-gray-600">Experienced professionals leading Ghana's labour administration</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mr. Braimah Ibrahim Dawuda",
                position: "Chief Labour Officer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Mr. Frederick Abekah",
                position: "Deputy Chief Labour Officer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Mr. Isaac Maalma-Kaminta",
                position: "Director, Industrial Relations",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-[#2b3990] font-medium">{member.position}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Framework */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Legal Framework</h2>
            <p className="text-lg text-gray-600">
              Our operations are guided by comprehensive legislation and international standards
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#dd2a1b]">National Legislation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#dd2a1b] rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-medium">Labour Act, 2003 (Act 651)</p>
                      <p className="text-sm text-gray-600">Primary legislation governing employment relations</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#dd2a1b] rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-medium">Labour Regulations, 2007 (L.I 1833)</p>
                      <p className="text-sm text-gray-600">Detailed implementation guidelines</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#dd2a1b] rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-medium">Workmen's Compensation Act, 1987</p>
                      <p className="text-sm text-gray-600">Worker injury and compensation framework</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2b3990]">International Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#2b3990] rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-medium">ILO Convention No. 150</p>
                      <p className="text-sm text-gray-600">Labour Administration Convention</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#2b3990] rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-medium">ILO Convention No. 182</p>
                      <p className="text-sm text-gray-600">Worst Forms of Child Labour</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#2b3990] rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-medium">ILO Convention No. 87</p>
                      <p className="text-sm text-gray-600">Freedom of Association</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide our work and service delivery</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-t-4 border-t-[#dd2a1b]">
              <CardHeader>
                <div className="w-16 h-16 bg-[#dd2a1b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[#dd2a1b]">Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Upholding the highest standards of honesty and ethical conduct in all our operations.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-t-4 border-t-[#2b3990]">
              <CardHeader>
                <div className="w-16 h-16 bg-[#2b3990] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[#2b3990]">Professionalism</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Delivering services with competence, expertise, and dedication to excellence.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-t-4 border-t-[#dd2a1b]">
              <CardHeader>
                <div className="w-16 h-16 bg-[#dd2a1b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[#dd2a1b]">Fairness & Equity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ensuring equal treatment and opportunities for all workers and employers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
