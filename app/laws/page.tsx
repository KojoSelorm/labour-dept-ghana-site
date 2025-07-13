import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Scale, Download, ExternalLink, BookOpen, FileText, Gavel } from "lucide-react"
import Link from "next/link"

const labourLaws = [
  {
    id: 1,
    title: "Labour Act, 2003 (Act 651)",
    description: "The principal legislation governing employment relations in Ghana",
    category: "Primary Legislation",
    year: "2003",
    status: "Active",
    downloadUrl: "/documents/labour-act-651.pdf",
    sections: [
      "Employment Contracts",
      "Working Hours and Rest Periods",
      "Wages and Remuneration",
      "Termination of Employment",
      "Trade Unions and Industrial Relations",
    ],
  },
  {
    id: 2,
    title: "Labour Regulations, 2007 (L.I 1833)",
    description: "Detailed regulations implementing the Labour Act provisions",
    category: "Regulations",
    year: "2007",
    status: "Active",
    downloadUrl: "/documents/labour-regulations-1833.pdf",
    sections: [
      "Employment Records",
      "Workplace Registration",
      "Safety and Health Standards",
      "Dispute Resolution Procedures",
    ],
  },
  {
    id: 3,
    title: "Workmen's Compensation Act, 1987 (PNDCL 187)",
    description: "Compensation framework for workplace injuries and occupational diseases",
    category: "Compensation",
    year: "1987",
    status: "Active",
    downloadUrl: "/documents/workmens-compensation-187.pdf",
    sections: ["Compensation Claims", "Medical Treatment", "Disability Benefits", "Death Benefits"],
  },
  {
    id: 4,
    title: "Factories, Offices and Shops Act, 1970 (Act 328)",
    description: "Safety and health regulations for workplaces",
    category: "Safety",
    year: "1970",
    status: "Active",
    downloadUrl: "/documents/factories-act-328.pdf",
    sections: ["Workplace Safety Standards", "Health Requirements", "Inspection Powers", "Penalties and Enforcement"],
  },
  {
    id: 5,
    title: "Children's Act, 1998 (Act 560)",
    description: "Protection of children including provisions on child labour",
    category: "Child Protection",
    year: "1998",
    status: "Active",
    downloadUrl: "/documents/childrens-act-560.pdf",
    sections: [
      "Child Labour Prohibition",
      "Minimum Age Requirements",
      "Hazardous Work Definition",
      "Penalties for Violations",
    ],
  },
]

const iloConventions = [
  {
    id: 1,
    title: "ILO Convention No. 150 - Labour Administration",
    ratified: "1985",
    status: "Ratified",
    description: "Establishes standards for labour administration systems",
  },
  {
    id: 2,
    title: "ILO Convention No. 182 - Worst Forms of Child Labour",
    ratified: "2000",
    status: "Ratified",
    description: "Prohibits and eliminates the worst forms of child labour",
  },
  {
    id: 3,
    title: "ILO Convention No. 87 - Freedom of Association",
    ratified: "1965",
    status: "Ratified",
    description: "Protects workers' and employers' right to organize",
  },
  {
    id: 4,
    title: "ILO Convention No. 98 - Right to Organise and Collective Bargaining",
    ratified: "1959",
    status: "Ratified",
    description: "Protects the right to organize and bargain collectively",
  },
]

export default function LawsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Legal Framework</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Labour Laws & Regulations</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Access Ghana's comprehensive labour legislation, regulations, and international conventions that govern
              employment relations and protect worker rights.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center border-t-4 border-t-[#dd2a1b]">
              <CardHeader>
                <Scale className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Primary Laws</CardTitle>
                <CardDescription>Core labour legislation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-[#dd2a1b] mb-2">5</p>
                <p className="text-sm text-gray-600">Active laws</p>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-t-[#2b3990]">
              <CardHeader>
                <FileText className="h-12 w-12 text-[#2b3990] mx-auto mb-4" />
                <CardTitle>Regulations</CardTitle>
                <CardDescription>Implementation guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-[#2b3990] mb-2">12</p>
                <p className="text-sm text-gray-600">Active regulations</p>
              </CardContent>
            </Card>

            <Card className="text-center border-t-4 border-t-[#dd2a1b]">
              <CardHeader>
                <Gavel className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>ILO Conventions</CardTitle>
                <CardDescription>International standards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-[#dd2a1b] mb-2">24</p>
                <p className="text-sm text-gray-600">Ratified conventions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* National Laws */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">National Labour Laws</h2>
            <p className="text-lg text-gray-600">Ghana's primary labour legislation and regulations</p>
          </div>

          <div className="space-y-6">
            {labourLaws.map((law) => (
              <Card key={law.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="secondary">{law.category}</Badge>
                        <Badge className="bg-green-100 text-green-800">{law.status}</Badge>
                        <span className="text-sm text-gray-500">{law.year}</span>
                      </div>
                      <CardTitle className="text-xl mb-2">{law.title}</CardTitle>
                      <CardDescription className="text-base">{law.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Online
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-3">Key Sections:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {law.sections.map((section, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-[#dd2a1b] rounded-full mr-3"></div>
                          <span className="text-sm">{section}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ILO Conventions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">International Labour Standards</h2>
            <p className="text-lg text-gray-600">ILO Conventions ratified by Ghana</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {iloConventions.map((convention) => (
              <Card key={convention.id}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-blue-100 text-blue-800">{convention.status}</Badge>
                    <span className="text-sm text-gray-500">Ratified: {convention.ratified}</span>
                  </div>
                  <CardTitle className="text-lg">{convention.title}</CardTitle>
                  <CardDescription>{convention.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Convention Text
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="https://www.ilo.org/dyn/normlex/en/f?p=NORMLEXPUB:11200:0::NO::P11200_COUNTRY_ID:102750">
              <Button variant="outline" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Ghana's ILO Ratifications
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Legal Resources</h2>
            <p className="text-lg text-gray-600">Additional resources for understanding labour law</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-[#dd2a1b] mb-4" />
                <CardTitle>Legal Guides</CardTitle>
                <CardDescription>Simplified explanations of complex legal provisions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Understanding Employment Contracts</li>
                  <li>• Worker Rights and Obligations</li>
                  <li>• Employer Compliance Guide</li>
                  <li>• Dispute Resolution Process</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Access Guides
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-[#2b3990] mb-4" />
                <CardTitle>Case Studies</CardTitle>
                <CardDescription>Real-world applications of labour law principles</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Wrongful Dismissal Cases</li>
                  <li>• Wage Dispute Resolutions</li>
                  <li>• Safety Violation Penalties</li>
                  <li>• Union Recognition Cases</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  View Cases
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Scale className="h-8 w-8 text-[#dd2a1b] mb-4" />
                <CardTitle>Legal Updates</CardTitle>
                <CardDescription>Recent amendments and new regulations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 2024 Minimum Wage Updates</li>
                  <li>• New Safety Regulations</li>
                  <li>• Digital Workplace Guidelines</li>
                  <li>• COVID-19 Workplace Protocols</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  View Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact for Legal Help */}
      <section className="py-16 bg-[#2b3990] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Need Legal Assistance?</h2>
            <p className="text-xl opacity-90 mb-8">
              Our legal team is available to help interpret labour laws and provide guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  Contact Legal Team
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#2b3990]"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
