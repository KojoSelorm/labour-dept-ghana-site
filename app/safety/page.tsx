import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, FileText, Download, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Workplace Safety - Labour Department of Ghana",
  description:
    "Information and resources on workplace safety standards, regulations, and best practices from the Labour Department of Ghana.",
}

export default function SafetyPage() {
  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Workplace Safety & Health</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Promoting safe and healthy working environments through regulations, inspections, and educational resources
          for employers and workers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Workplace safety inspection"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Our Commitment to Safety</h2>
          <p className="mb-4">
            The Labour Department of Ghana is committed to ensuring that all workplaces in Ghana meet the highest
            standards of safety and health. We work to prevent workplace injuries, illnesses, and fatalities through a
            comprehensive approach that includes:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Development and enforcement of safety regulations</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Regular workplace inspections and monitoring</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Education and training for employers and workers</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Investigation of workplace accidents and incidents</span>
            </li>
          </ul>
        </div>
      </div>

      <Tabs defaultValue="regulations" className="w-full mb-12">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="reporting">Incident Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="regulations">
          <Card>
            <CardHeader>
              <CardTitle>Safety Regulations & Standards</CardTitle>
              <CardDescription>Key regulations governing workplace safety in Ghana</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Ghana has comprehensive regulations to ensure workplace safety and health. These regulations establish
                minimum standards that employers must meet to protect workers from hazards.
              </p>

              <div className="grid gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Factories, Offices and Shops Act, 1970 (Act 328)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Establishes basic safety and health requirements for factories, offices, and shops, including
                    provisions for fire safety, ventilation, lighting, and sanitation.
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" /> View Full Act
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Mining Regulations, 2012 (L.I. 2182)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Specific safety regulations for the mining industry, covering areas such as ventilation, ground
                    control, electrical safety, and emergency response.
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" /> View Full Regulations
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Labour Act, 2003 (Act 651) - Safety Provisions</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Contains general provisions on workplace safety and health, including employer obligations and
                    worker rights regarding safety.
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" /> View Safety Provisions
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Workmen's Compensation Law, 1987 (PNDC Law 187)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Provides for compensation for work-related injuries and establishes reporting requirements for
                    workplace accidents.
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" /> View Full Law
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/laws" className="text-primary hover:underline">
                View all safety regulations and standards →
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Safety Resources</CardTitle>
              <CardDescription>Guides, checklists, and tools to help improve workplace safety</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Workplace Safety Checklist</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    A comprehensive checklist to help employers identify and address potential safety hazards in the
                    workplace.
                  </p>
                  <Button size="sm" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" /> Download Checklist
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Risk Assessment Guide</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Step-by-step guide to conducting workplace risk assessments and implementing control measures.
                  </p>
                  <Button size="sm" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" /> Download Guide
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Personal Protective Equipment (PPE) Guide</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Information on selecting, using, and maintaining appropriate personal protective equipment for
                    different work environments.
                  </p>
                  <Button size="sm" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" /> Download Guide
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Emergency Response Plan Template</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Template for developing a comprehensive emergency response plan for workplace incidents and
                    accidents.
                  </p>
                  <Button size="sm" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" /> Download Template
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Industry-Specific Safety Guides</h3>
                <p className="text-sm mb-3">
                  We offer specialized safety guides for various industries with specific hazards and requirements:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button variant="outline" size="sm">
                    Construction
                  </Button>
                  <Button variant="outline" size="sm">
                    Manufacturing
                  </Button>
                  <Button variant="outline" size="sm">
                    Mining
                  </Button>
                  <Button variant="outline" size="sm">
                    Agriculture
                  </Button>
                  <Button variant="outline" size="sm">
                    Healthcare
                  </Button>
                  <Button variant="outline" size="sm">
                    Transportation
                  </Button>
                  <Button variant="outline" size="sm">
                    Hospitality
                  </Button>
                  <Button variant="outline" size="sm">
                    Office Work
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/resources" className="text-primary hover:underline">
                Browse all safety resources →
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Safety Training Programs</CardTitle>
              <CardDescription>Training opportunities to enhance workplace safety knowledge and skills</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                The Labour Department offers various training programs to help employers and workers develop the
                knowledge and skills needed to create and maintain safe workplaces.
              </p>

              <div className="grid gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">Basic Workplace Safety Training</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Introductory training covering fundamental safety principles and practices.
                      </p>
                    </div>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Monthly</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <span className="text-xs text-muted-foreground">Duration:</span>
                      <p className="text-sm">2 days</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Location:</span>
                      <p className="text-sm">Accra & Kumasi</p>
                    </div>
                  </div>
                  <Button size="sm">Register for Training</Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">Safety Committee Training</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Specialized training for members of workplace safety committees.
                      </p>
                    </div>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Quarterly</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <span className="text-xs text-muted-foreground">Duration:</span>
                      <p className="text-sm">3 days</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Location:</span>
                      <p className="text-sm">Accra</p>
                    </div>
                  </div>
                  <Button size="sm">Register for Training</Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">Hazard Identification and Risk Assessment</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Training on identifying workplace hazards and conducting risk assessments.
                      </p>
                    </div>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Bi-monthly</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <span className="text-xs text-muted-foreground">Duration:</span>
                      <p className="text-sm">2 days</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Location:</span>
                      <p className="text-sm">Accra, Kumasi, Takoradi</p>
                    </div>
                  </div>
                  <Button size="sm">Register for Training</Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">Safety for Supervisors and Managers</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Training for supervisors and managers on their safety responsibilities.
                      </p>
                    </div>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Monthly</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <span className="text-xs text-muted-foreground">Duration:</span>
                      <p className="text-sm">3 days</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Location:</span>
                      <p className="text-sm">Accra</p>
                    </div>
                  </div>
                  <Button size="sm">Register for Training</Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Custom Training Programs</h3>
                <p className="text-sm mb-3">
                  We also offer customized safety training programs tailored to the specific needs of your organization
                  or industry. Contact us to discuss your training requirements.
                </p>
                <Button variant="outline">Request Custom Training</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/training-calendar" className="text-primary hover:underline">
                View full training calendar →
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reporting">
          <Card>
            <CardHeader>
              <CardTitle>Incident Reporting</CardTitle>
              <CardDescription>Information on reporting workplace accidents, injuries, and near-misses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800 mb-1">Important Notice</h3>
                    <p className="text-sm text-yellow-700">
                      All workplace accidents resulting in serious injury, fatality, or significant property damage must
                      be reported to the Labour Department within 24 hours of occurrence.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-medium mb-3">Reporting Requirements</h3>
              <p className="mb-4">
                Under Ghana's labour laws, employers are required to report certain workplace incidents to the Labour
                Department. These include:
              </p>

              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Any accident resulting in death</li>
                <li>
                  Any accident resulting in serious injury (requiring hospitalization or more than 3 days off work)
                </li>
                <li>
                  Any dangerous occurrence as defined in the regulations (e.g., collapse of structures, explosions)
                </li>
                <li>Any diagnosed case of occupational disease</li>
              </ul>

              <h3 className="font-medium mb-3">How to Report an Incident</h3>

              <div className="grid gap-4 mb-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Online Reporting</h4>
                  <p className="text-sm mb-3">
                    The fastest way to report an incident is through our online reporting portal.
                  </p>
                  <Button className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" /> Access Online Reporting Portal
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Paper Form</h4>
                  <p className="text-sm mb-3">
                    Download and complete the Incident Report Form, then submit it to your nearest Labour Department
                    office.
                  </p>
                  <Button variant="outline" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" /> Download Incident Report Form
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">By Telephone</h4>
                  <p className="text-sm mb-3">
                    For urgent reporting of serious incidents, call our 24-hour incident reporting hotline.
                  </p>
                  <div className="text-lg font-medium">0302-123-4567</div>
                </div>
              </div>

              <h3 className="font-medium mb-3">After Reporting</h3>
              <p className="mb-4">After an incident is reported, the Labour Department may:</p>

              <ul className="list-disc pl-5 space-y-2">
                <li>Conduct an investigation of the incident</li>
                <li>Issue improvement or prohibition notices if necessary</li>
                <li>Provide guidance on preventing similar incidents</li>
                <li>Monitor the implementation of corrective actions</li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground mb-3">
                Failure to report notifiable incidents is an offense under Ghana's labour laws and may result in
                penalties.
              </p>
              <Link href="/incident-reporting-guide" className="text-primary hover:underline">
                View detailed incident reporting guide →
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Request an Inspection</CardTitle>
            <CardDescription>Schedule a workplace safety inspection</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Employers can request voluntary safety inspections to identify potential hazards and receive guidance on
              compliance with safety regulations.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Request Inspection</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safety Consultation</CardTitle>
            <CardDescription>Get expert advice on workplace safety</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Our safety experts can provide consultation on specific safety concerns, compliance issues, or safety
              program development.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Schedule Consultation</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report a Hazard</CardTitle>
            <CardDescription>Report unsafe working conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Workers can confidentially report unsafe working conditions or safety violations to the Labour Department
              for investigation.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Report Hazard</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Safety Recognition Program</h2>
        <p className="mb-6">
          The Labour Department recognizes organizations that demonstrate exceptional commitment to workplace safety
          through our Safety Excellence Recognition Program.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button>Learn About the Program</Button>
          <Button variant="outline">View Past Recipients</Button>
        </div>
      </div>
    </div>
  )
}
