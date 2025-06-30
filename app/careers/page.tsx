import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Briefcase, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Career Opportunities - Labour Department of Ghana",
  description:
    "Explore career opportunities with the Labour Department of Ghana and find information about job openings in the public and private sectors.",
}

export default function CareersPage() {
  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Career Opportunities</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore career opportunities with the Labour Department of Ghana and find information about job openings in
          the public and private sectors.
        </p>
      </div>

      <Tabs defaultValue="department" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="department">Department Vacancies</TabsTrigger>
          <TabsTrigger value="public">Public Sector Jobs</TabsTrigger>
          <TabsTrigger value="private">Private Sector Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="department">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Join Our Team</h2>
            <p className="text-muted-foreground">
              The Labour Department of Ghana is committed to building a skilled and diverse workforce dedicated to
              improving labour standards and employment conditions across the country.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Senior Labour Officer</CardTitle>
                    <CardDescription className="mt-1">Labour Standards Division</CardDescription>
                  </div>
                  <Badge>Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Accra (Headquarters)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Application Deadline: August 15, 2023</span>
                  </div>
                  <p className="mt-2 text-sm">
                    We are seeking an experienced professional to join our Labour Standards Division to oversee
                    compliance monitoring and enforcement of labour laws and regulations.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Job Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Labour Inspector</CardTitle>
                    <CardDescription className="mt-1">Inspectorate Division</CardDescription>
                  </div>
                  <Badge>Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Kumasi Regional Office</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Application Deadline: July 30, 2023</span>
                  </div>
                  <p className="mt-2 text-sm">
                    Join our team of inspectors responsible for conducting workplace inspections to ensure compliance
                    with labour laws, health, and safety regulations.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Job Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Data Analyst</CardTitle>
                    <CardDescription className="mt-1">Research & Statistics Unit</CardDescription>
                  </div>
                  <Badge>Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Accra (Headquarters)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Application Deadline: August 5, 2023</span>
                  </div>
                  <p className="mt-2 text-sm">
                    We are looking for a skilled Data Analyst to help collect, process, and analyze labour market data
                    to inform policy development and decision-making.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Job Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Administrative Assistant</CardTitle>
                    <CardDescription className="mt-1">Administration Department</CardDescription>
                  </div>
                  <Badge>Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Takoradi Regional Office</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Application Deadline: July 25, 2023</span>
                  </div>
                  <p className="mt-2 text-sm">
                    Join our administrative team to provide essential support services for the efficient operation of
                    our regional office in Takoradi.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Job Details</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Application Process</h3>
            <p className="mb-4">
              All applications for positions with the Labour Department must be submitted through our online recruitment
              portal. The selection process typically includes:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Online application submission</li>
              <li>Initial screening of qualifications</li>
              <li>Written examination (for technical positions)</li>
              <li>Panel interview</li>
              <li>Background and reference checks</li>
              <li>Final selection and offer</li>
            </ol>
          </div>
        </TabsContent>

        <TabsContent value="public">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Public Sector Opportunities</h2>
            <p className="text-muted-foreground">
              The Labour Department maintains a database of current job openings in the public sector. These positions
              are with various government ministries, departments, and agencies.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Project Manager</CardTitle>
                    <CardDescription className="mt-1">Ministry of Roads and Highways</CardDescription>
                  </div>
                  <Badge>Contract</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Accra</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Posted: July 5, 2023</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>5+ years experience required</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Public Health Officer</CardTitle>
                    <CardDescription className="mt-1">Ghana Health Service</CardDescription>
                  </div>
                  <Badge>Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Multiple Locations</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Posted: July 10, 2023</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>3+ years experience required</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>IT Systems Administrator</CardTitle>
                    <CardDescription className="mt-1">Ministry of Communications</CardDescription>
                  </div>
                  <Badge>Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Accra</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Posted: July 8, 2023</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>4+ years experience required</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline">Load More Public Sector Jobs</Button>
          </div>
        </TabsContent>

        <TabsContent value="private">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Private Sector Listings</h2>
            <p className="text-muted-foreground">
              The Labour Department partners with private sector employers to list job opportunities. These listings are
              provided as a service and do not constitute an endorsement by the Department.
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Marketing Manager</CardTitle>
                    <CardDescription className="mt-1">Global Telecom Ghana Ltd.</CardDescription>
                  </div>
                  <Badge>Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Accra</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Posted: July 12, 2023</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Application Deadline: July 26, 2023</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Production Supervisor</CardTitle>
                    <CardDescription className="mt-1">Accra Breweries Limited</CardDescription>
                  </div>
                  <Badge>Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Tema</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Posted: July 10, 2023</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Application Deadline: July 31, 2023</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Human Resources Officer</CardTitle>
                    <CardDescription className="mt-1">Ghana Commercial Bank</CardDescription>
                  </div>
                  <Badge>Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Accra</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Posted: July 8, 2023</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Application Deadline: July 22, 2023</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Software Developer</CardTitle>
                    <CardDescription className="mt-1">Tech Innovations Ghana</CardDescription>
                  </div>
                  <Badge>Full-time</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Accra</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Posted: July 15, 2023</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Application Deadline: August 5, 2023</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline">Load More Private Sector Jobs</Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Seeker Resources</CardTitle>
            <CardDescription>Tools and resources to help you in your job search</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Labour Department offers various resources to help job seekers find employment opportunities and
              develop their careers.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <span>Resume and cover letter writing guides</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <span>Interview preparation tips</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <span>Career counseling services</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <span>Skills assessment tools</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/resources" className="text-primary hover:underline">
              Access Job Seeker Resources →
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employer Services</CardTitle>
            <CardDescription>Services for employers looking to recruit qualified candidates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Labour Department provides services to help employers find qualified candidates and comply with labour
              regulations during the recruitment process.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <span>Job posting service</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <span>Candidate matching assistance</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <span>Recruitment compliance guidance</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2">•</div>
                <span>Labour market information</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/services" className="text-primary hover:underline">
              Learn About Employer Services →
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
