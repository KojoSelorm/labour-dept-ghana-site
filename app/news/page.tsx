import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "News & Announcements - Labour Department of Ghana",
  description: "Stay updated with the latest news, announcements, and events from the Labour Department of Ghana.",
}

export default function NewsPage() {
  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">News & Announcements</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest news, announcements, policy changes, and events from the Labour Department of
          Ghana.
        </p>
      </div>

      <div className="mb-12">
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-[300px] md:h-auto">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Minister announces new labour policy"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center mb-2">
                <Badge>Featured</Badge>
                <span className="text-sm text-muted-foreground ml-2">July 15, 2023</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">Minister Announces New Labour Policy Framework</h2>
              <p className="mb-4">
                The Minister for Employment and Labour Relations has announced a comprehensive new policy framework
                aimed at modernizing Ghana's labour regulations and improving working conditions across all sectors.
              </p>
              <p className="mb-6 text-muted-foreground">
                The framework, which will be implemented over the next two years, includes provisions for enhanced
                worker protections, streamlined dispute resolution, and incentives for employers who exceed minimum
                standards.
              </p>
              <Button className="self-start">Read Full Story</Button>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="policies">Policy Updates</TabsTrigger>
          <TabsTrigger value="press">Press Releases</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Minimum wage increase"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Announcement</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>July 10, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">National Daily Minimum Wage Increased by 15%</CardTitle>
                <CardDescription>
                  The National Tripartite Committee has announced a 15% increase in the National Daily Minimum Wage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Following extensive negotiations between government, employer organizations, and labour unions, the
                  National Daily Minimum Wage has been increased from GH₵ 13.53 to GH₵ 15.56, effective September 1,
                  2023.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/news/minimum-wage-increase" className="text-primary hover:underline flex items-center">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Labour conference"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Event</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>August 5-7, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Annual Labour Conference 2023</CardTitle>
                <CardDescription>
                  Registration now open for the Annual Labour Conference to be held in Accra.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The 2023 Annual Labour Conference will focus on "The Future of Work in Ghana: Embracing Technology
                  While Protecting Workers' Rights." The three-day event will feature keynote speakers, panel
                  discussions, and workshops.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/news/annual-conference-2023" className="text-primary hover:underline flex items-center">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="New safety regulations"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Policy Update</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>June 28, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">New Workplace Safety Regulations for Construction Industry</CardTitle>
                <CardDescription>
                  Enhanced safety regulations for the construction industry have been approved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The new regulations include stricter requirements for scaffolding, fall protection, and personal
                  protective equipment. Construction companies have until January 2024 to ensure full compliance.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/news/construction-safety-regulations"
                  className="text-primary hover:underline flex items-center"
                >
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Labour department inspection"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Press Release</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>July 5, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Labour Department Intensifies Workplace Inspections</CardTitle>
                <CardDescription>
                  The Department has launched a nationwide inspection campaign targeting high-risk industries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The inspection campaign will focus on industries with high rates of workplace accidents and labour
                  violations, including mining, manufacturing, and agriculture. Over 500 inspections are planned for the
                  next three months.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/news/inspection-campaign" className="text-primary hover:underline flex items-center">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Youth employment program"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Announcement</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>June 20, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Launch of Youth Employment Initiative</CardTitle>
                <CardDescription>New program aims to create 10,000 jobs for young Ghanaians.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The Youth Employment Initiative, a collaboration between the Labour Department and private sector
                  partners, will provide training, internships, and job placement services for young people aged 18-35.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/news/youth-employment-initiative"
                  className="text-primary hover:underline flex items-center"
                >
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Labour department workshop"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Event</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>July 25, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Workshop on New Employment Regulations</CardTitle>
                <CardDescription>
                  Free workshop for employers on complying with recent regulatory changes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The Labour Department will host a workshop to help employers understand and implement recent changes
                  to employment regulations. The workshop will cover contract requirements, leave entitlements, and
                  termination procedures.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/news/regulations-workshop" className="text-primary hover:underline flex items-center">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline">Load More News</Button>
          </div>
        </TabsContent>

        <TabsContent value="announcements">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Announcement content would go here - similar structure to "all" tab but filtered */}
            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Minimum wage increase"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Announcement</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>July 10, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">National Daily Minimum Wage Increased by 15%</CardTitle>
                <CardDescription>
                  The National Tripartite Committee has announced a 15% increase in the National Daily Minimum Wage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Following extensive negotiations between government, employer organizations, and labour unions, the
                  National Daily Minimum Wage has been increased from GH₵ 13.53 to GH₵ 15.56, effective September 1,
                  2023.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/news/minimum-wage-increase" className="text-primary hover:underline flex items-center">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Youth employment program"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Announcement</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>June 20, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Launch of Youth Employment Initiative</CardTitle>
                <CardDescription>New program aims to create 10,000 jobs for young Ghanaians.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The Youth Employment Initiative, a collaboration between the Labour Department and private sector
                  partners, will provide training, internships, and job placement services for young people aged 18-35.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/news/youth-employment-initiative"
                  className="text-primary hover:underline flex items-center"
                >
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Events content would go here - similar structure to "all" tab but filtered */}
            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Labour conference"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Event</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>August 5-7, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Annual Labour Conference 2023</CardTitle>
                <CardDescription>
                  Registration now open for the Annual Labour Conference to be held in Accra.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The 2023 Annual Labour Conference will focus on "The Future of Work in Ghana: Embracing Technology
                  While Protecting Workers' Rights." The three-day event will feature keynote speakers, panel
                  discussions, and workshops.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/news/annual-conference-2023" className="text-primary hover:underline flex items-center">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Labour department workshop"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Event</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>July 25, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Workshop on New Employment Regulations</CardTitle>
                <CardDescription>
                  Free workshop for employers on complying with recent regulatory changes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The Labour Department will host a workshop to help employers understand and implement recent changes
                  to employment regulations. The workshop will cover contract requirements, leave entitlements, and
                  termination procedures.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/news/regulations-workshop" className="text-primary hover:underline flex items-center">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="policies">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Policy updates content would go here - similar structure to "all" tab but filtered */}
            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="New safety regulations"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Policy Update</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>June 28, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">New Workplace Safety Regulations for Construction Industry</CardTitle>
                <CardDescription>
                  Enhanced safety regulations for the construction industry have been approved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The new regulations include stricter requirements for scaffolding, fall protection, and personal
                  protective equipment. Construction companies have until January 2024 to ensure full compliance.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/news/construction-safety-regulations"
                  className="text-primary hover:underline flex items-center"
                >
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="press">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Press releases content would go here - similar structure to "all" tab but filtered */}
            <Card>
              <div className="relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Labour department inspection"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Press Release</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>July 5, 2023</span>
                  </div>
                </div>
                <CardTitle className="mt-2">Labour Department Intensifies Workplace Inspections</CardTitle>
                <CardDescription>
                  The Department has launched a nationwide inspection campaign targeting high-risk industries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The inspection campaign will focus on industries with high rates of workplace accidents and labour
                  violations, including mining, manufacturing, and agriculture. Over 500 inspections are planned for the
                  next three months.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/news/inspection-campaign" className="text-primary hover:underline flex items-center">
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-muted p-6 rounded-lg">
        <div className="md:flex items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h2>
            <p>Stay updated with the latest news and announcements from the Labour Department.</p>
          </div>
          <div className="flex gap-4">
            <Button>Subscribe Now</Button>
            <Button variant="outline">RSS Feed</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
