import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Building, 
  Users, 
  TrendingUp, 
  ExternalLink,
  Filter,
  Star,
  Clock,
  DollarSign
} from "lucide-react"
import Link from "next/link"

const jobCategories = [
  { id: "all", name: "All Jobs", count: 1247 },
  { id: "technology", name: "Technology", count: 234 },
  { id: "healthcare", name: "Healthcare", count: 189 },
  { id: "education", name: "Education", count: 156 },
  { id: "manufacturing", name: "Manufacturing", count: 203 },
  { id: "finance", name: "Finance", count: 167 },
  { id: "agriculture", name: "Agriculture", count: 98 },
  { id: "construction", name: "Construction", count: 145 },
]

const featuredJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Ghana",
    location: "Accra, Greater Accra",
    type: "Full-time",
    salary: "GH₵ 8,000 - 12,000",
    posted: "2 days ago",
    category: "technology",
    featured: true,
    description: "We are seeking an experienced software engineer to join our growing team in Accra.",
  },
  {
    id: 2,
    title: "Registered Nurse",
    company: "Ghana Health Services",
    location: "Kumasi, Ashanti",
    type: "Full-time",
    salary: "GH₵ 4,500 - 6,500",
    posted: "1 day ago",
    category: "healthcare",
    featured: true,
    description: "Join our healthcare team providing quality care to patients across the region.",
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "Global Brands Ltd",
    location: "Tema, Greater Accra",
    type: "Full-time",
    salary: "GH₵ 6,000 - 9,000",
    posted: "3 days ago",
    category: "marketing",
    featured: true,
    description: "Lead our marketing initiatives and drive brand growth in the Ghanaian market.",
  },
]

const recentJobs = [
  {
    id: 4,
    title: "Data Analyst",
    company: "Data Insights Ghana",
    location: "Accra, Greater Accra",
    type: "Full-time",
    salary: "GH₵ 5,000 - 7,500",
    posted: "4 hours ago",
    category: "technology",
  },
  {
    id: 5,
    title: "Primary School Teacher",
    company: "Ghana Education Service",
    location: "Tamale, Northern",
    type: "Full-time",
    salary: "GH₵ 3,500 - 5,000",
    posted: "6 hours ago",
    category: "education",
  },
  {
    id: 6,
    title: "Production Supervisor",
    company: "Ghana Manufacturing Co",
    location: "Kumasi, Ashanti",
    type: "Full-time",
    salary: "GH₵ 4,000 - 6,000",
    posted: "8 hours ago",
    category: "manufacturing",
  },
  {
    id: 7,
    title: "Accountant",
    company: "Finance Solutions Ltd",
    location: "Accra, Greater Accra",
    type: "Full-time",
    salary: "GH₵ 4,500 - 6,500",
    posted: "12 hours ago",
    category: "finance",
  },
  {
    id: 8,
    title: "Farm Manager",
    company: "AgroTech Farms",
    location: "Sunyani, Bono",
    type: "Full-time",
    salary: "GH₵ 3,500 - 5,500",
    posted: "1 day ago",
    category: "agriculture",
  },
  {
    id: 9,
    title: "Site Engineer",
    company: "Construction Plus",
    location: "Tema, Greater Accra",
    type: "Full-time",
    salary: "GH₵ 5,000 - 7,000",
    posted: "1 day ago",
    category: "construction",
  },
]

const employerServices = [
  {
    title: "Post Job Vacancies",
    description: "Advertise your job openings to thousands of qualified candidates",
    icon: Briefcase,
    color: "text-[#dd2a1b]",
  },
  {
    title: "Talent Search",
    description: "Search our database of registered job seekers by skills and experience",
    icon: Users,
    color: "text-[#2b3990]",
  },
  {
    title: "Market Analytics",
    description: "Access labour market trends and salary data for informed hiring",
    icon: TrendingUp,
    color: "text-[#dd2a1b]",
  },
  {
    title: "Compliance Support",
    description: "Ensure your hiring practices meet Ghana's labour regulations",
    icon: Building,
    color: "text-[#2b3990]",
  },
]

export default function GLIMSPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">GLIMS Portal</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Ghana Labour Market Information System</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Connect with opportunities across Ghana. Find your next career move or hire the perfect candidate for your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search jobs, companies, or keywords..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accra">Accra</SelectItem>
                    <SelectItem value="kumasi">Kumasi</SelectItem>
                    <SelectItem value="tema">Tema</SelectItem>
                    <SelectItem value="tamale">Tamale</SelectItem>
                    <SelectItem value="sunyani">Sunyani</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#231f20]">Popular Job Categories</h2>
            <p className="text-gray-600">Explore opportunities in your field of interest</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {jobCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-[#dd2a1b]">{category.count}</p>
                  <p className="text-sm text-gray-600">Available positions</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Featured Opportunities</h2>
            <p className="text-gray-600">Top positions from leading employers across Ghana</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-[#dd2a1b]">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-[#dd2a1b] text-white">Featured</Badge>
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                  <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Building className="h-4 w-4" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {job.salary}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{job.posted}</span>
                    <Button size="sm" className="bg-[#dd2a1b] hover:bg-[#c02419]">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Recent Job Postings</h2>
            <p className="text-gray-600">Latest opportunities from across Ghana</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Building className="h-4 w-4" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {job.salary}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{job.posted}</span>
                    <Button size="sm" variant="outline" className="border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Employer Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">For Employers</h2>
            <p className="text-lg text-gray-600">Comprehensive services to help you find the right talent</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {employerServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className={`h-12 w-12 ${service.color} mx-auto mb-4`} />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button variant="outline" className="w-full border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-[#2b3990] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">GLIMS Impact</h2>
            <p className="text-xl opacity-90">Connecting talent with opportunities across Ghana</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <p className="opacity-90">Job Seekers Registered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <p className="opacity-90">Employers Active</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <p className="opacity-90">Jobs Posted</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">8,500+</div>
              <p className="opacity-90">Successful Placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of job seekers and employers who trust GLIMS for their career and hiring needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://glmis.gov.gh" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Visit GLIMS Portal
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-[#2b3990] text-[#2b3990] hover:bg-[#2b3990] hover:text-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 