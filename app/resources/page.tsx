import type { Metadata } from "next"
import Link from "next/link"
import { Download, FileText, BookOpen, Video, FileCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Resources - Labour Department of Ghana",
  description: "Access forms, publications, guides, and resources from the Labour Department of Ghana.",
}

export default function ResourcesPage() {
  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Resources & Downloads</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access official forms, publications, guides, and resources from the Labour Department of Ghana to help
          employers and employees understand and comply with labour laws and regulations.
        </p>
      </div>

      <Tabs defaultValue="forms" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="guides">Guides & Manuals</TabsTrigger>
          <TabsTrigger value="multimedia">Multimedia</TabsTrigger>
        </TabsList>

        <TabsContent value="forms">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Complaint Form
                </CardTitle>
                <CardDescription>
                  Official form for filing workplace complaints with the Labour Department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Use this form to report workplace violations, unpaid wages, unfair dismissal, or other labour-related
                  complaints.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Last updated: May 2023</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Employer Registration Form
                </CardTitle>
                <CardDescription>Form for registering businesses with the Labour Department</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  All employers in Ghana are required to register with the Labour Department using this form.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Last updated: January 2023</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Workmen's Compensation Form
                </CardTitle>
                <CardDescription>Form for filing workmen's compensation claims</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">For employees seeking compensation for work-related injuries or illnesses.</p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Last updated: March 2023</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Labour Inspection Request Form
                </CardTitle>
                <CardDescription>Form to request workplace inspection by labour officers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Use this form to request an official inspection of workplace conditions or practices.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Last updated: February 2023</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/forms" className="text-primary hover:underline">
              View all forms →
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="publications">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Annual Labour Report 2022
                </CardTitle>
                <CardDescription>Comprehensive report on labour market trends and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This report provides detailed analysis of employment trends, wage statistics, and labour market
                  indicators for the year 2022.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Published: March 2023</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Labour Act 2003 (Act 651)
                </CardTitle>
                <CardDescription>Official publication of Ghana's Labour Act</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The complete text of Ghana's Labour Act 2003 (Act 651) with all amendments and updates.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Last updated: December 2022</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Publication
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Workplace Safety Standards
                </CardTitle>
                <CardDescription>Official safety standards for workplaces in Ghana</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Comprehensive guidelines on workplace safety requirements, hazard prevention, and occupational health
                  standards.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Last updated: July 2022</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Standards
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Quarterly Labour Bulletin
                </CardTitle>
                <CardDescription>Latest quarterly update on labour market developments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Updates on recent policy changes, labour market statistics, and departmental activities.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Q1 2023</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Bulletin
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/publications" className="text-primary hover:underline">
              View all publications →
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Employer's Guide to Labour Compliance
                </CardTitle>
                <CardDescription>Comprehensive guide for employers on labour law compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  This guide helps employers understand their obligations under Ghana's labour laws, including hiring
                  practices, wages, benefits, and termination procedures.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Last updated: April 2023</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Guide
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Employee Rights Handbook
                </CardTitle>
                <CardDescription>Guide for workers on their rights and protections</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  A comprehensive handbook explaining workers' rights, benefits, and protections under Ghana's labour
                  laws in simple, accessible language.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Last updated: June 2023</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Handbook
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Workplace Safety Manual
                </CardTitle>
                <CardDescription>Comprehensive guide to workplace safety practices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Detailed guidelines on implementing workplace safety measures, hazard identification, risk assessment,
                  and emergency procedures.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Last updated: February 2023</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Manual
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Dispute Resolution Procedures
                </CardTitle>
                <CardDescription>Guide to resolving workplace disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Step-by-step procedures for resolving workplace disputes, including mediation, arbitration, and formal
                  complaint processes.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>PDF</Badge>
                  <span className="text-xs text-muted-foreground ml-2">Last updated: March 2023</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download Guide
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/guides" className="text-primary hover:underline">
              View all guides →
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="multimedia">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  Know Your Rights: Worker's Guide
                </CardTitle>
                <CardDescription>Video series explaining worker rights in Ghana</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  A series of educational videos explaining various aspects of worker rights and protections under
                  Ghana's labour laws.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>Video</Badge>
                  <span className="text-xs text-muted-foreground ml-2">10 episodes</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Watch Series</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  Workplace Safety Training
                </CardTitle>
                <CardDescription>Training videos on workplace safety practices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Comprehensive training videos covering various aspects of workplace safety, hazard prevention, and
                  emergency procedures.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>Video</Badge>
                  <span className="text-xs text-muted-foreground ml-2">8 modules</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Access Training</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  Labour Law Webinar Series
                </CardTitle>
                <CardDescription>Recorded webinars on labour law topics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  A collection of webinars featuring labour experts discussing various aspects of Ghana's labour laws
                  and recent developments.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>Video</Badge>
                  <span className="text-xs text-muted-foreground ml-2">12 webinars</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Watch Webinars</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" />
                  Employer Compliance Tutorial
                </CardTitle>
                <CardDescription>Step-by-step tutorial for employer compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Interactive tutorial guiding employers through the process of ensuring compliance with Ghana's labour
                  laws and regulations.
                </p>
                <div className="mt-2 flex items-center">
                  <Badge>Interactive</Badge>
                  <span className="text-xs text-muted-foreground ml-2">6 modules</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Tutorial</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/multimedia" className="text-primary hover:underline">
              View all multimedia resources →
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Need Assistance?</h2>
        <p className="mb-6">
          If you need help finding specific resources or have questions about any of our publications, please contact
          our Resource Center.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-center"
          >
            Contact Resource Center
          </Link>
          <Link
            href="/faq"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md text-center"
          >
            View FAQs
          </Link>
        </div>
      </div>
    </div>
  )
}
