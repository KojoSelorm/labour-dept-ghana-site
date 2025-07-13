import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter
} from "lucide-react"
import Link from "next/link"

const reportCategories = [
  { id: "all", name: "All Reports", count: 45 },
  { id: "annual", name: "Annual Reports", count: 12 },
  { id: "statistics", name: "Statistics", count: 18 },
  { id: "research", name: "Research Papers", count: 8 },
  { id: "compliance", name: "Compliance Reports", count: 7 },
]

const annualReports = [
  {
    id: 1,
    title: "Labour Department Annual Report 2023",
    description: "Comprehensive overview of labour administration activities, achievements, and challenges in 2023",
    year: "2023",
    type: "annual",
    size: "15.2 MB",
    downloads: 1247,
    featured: true,
  },
  {
    id: 2,
    title: "Labour Department Annual Report 2022",
    description: "Annual performance report covering employment trends, inspections, and policy implementations",
    year: "2022",
    type: "annual",
    size: "12.8 MB",
    downloads: 892,
  },
  {
    id: 3,
    title: "Labour Department Annual Report 2021",
    description: "Comprehensive analysis of labour market developments and departmental activities",
    year: "2021",
    type: "annual",
    size: "14.1 MB",
    downloads: 756,
  },
]

const statisticalReports = [
  {
    id: 4,
    title: "Employment Statistics Q4 2023",
    description: "Quarterly employment data and trends across all 16 regions of Ghana",
    year: "2023",
    type: "statistics",
    size: "2.3 MB",
    downloads: 2341,
  },
  {
    id: 5,
    title: "Workplace Safety Report 2023",
    description: "Analysis of workplace accidents, safety violations, and improvement measures",
    year: "2023",
    type: "statistics",
    size: "4.7 MB",
    downloads: 1892,
  },
  {
    id: 6,
    title: "Labour Dispute Resolution Statistics",
    description: "Comprehensive data on workplace disputes, resolution times, and outcomes",
    year: "2023",
    type: "statistics",
    size: "3.1 MB",
    downloads: 1456,
  },
]

const researchPapers = [
  {
    id: 7,
    title: "Digital Transformation in Labour Administration",
    description: "Research paper on the impact of technology on labour market efficiency",
    year: "2023",
    type: "research",
    size: "8.9 MB",
    downloads: 567,
  },
  {
    id: 8,
    title: "Youth Employment Challenges in Ghana",
    description: "Analysis of youth unemployment trends and policy recommendations",
    year: "2023",
    type: "research",
    size: "6.2 MB",
    downloads: 423,
  },
]

const complianceReports = [
  {
    id: 9,
    title: "Child Labour Elimination Progress Report",
    description: "Progress report on child labour prevention and elimination efforts",
    year: "2023",
    type: "compliance",
    size: "5.4 MB",
    downloads: 678,
  },
  {
    id: 10,
    title: "Minimum Wage Compliance Report",
    description: "Analysis of minimum wage compliance across different sectors",
    year: "2023",
    type: "compliance",
    size: "3.8 MB",
    downloads: 892,
  },
]

const keyMetrics = [
  {
    title: "Total Inspections",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Complaints Resolved",
    value: "1,234",
    change: "+8%",
    trend: "up",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Active Employers",
    value: "15,678",
    change: "+5%",
    trend: "up",
    icon: Building,
    color: "text-blue-600",
  },
  {
    title: "Workers Protected",
    value: "45,892",
    change: "+15%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
  },
]

export default function ReportsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Reports & Statistics</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Reports & Publications</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Access comprehensive reports, statistics, and research publications from the Ghana Labour Department. 
              Stay informed about labour market trends, policy developments, and departmental activities.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search reports and publications..."
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Filter by:</span>
              <div className="flex gap-2">
                {reportCategories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={category.id === "all" ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-[#dd2a1b] hover:text-white"
                  >
                    {category.name} ({category.count})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Key Performance Indicators</h2>
            <p className="text-gray-600">Latest statistics and performance metrics</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <metric.icon className={`h-8 w-8 ${metric.color}`} />
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {metric.change}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#231f20] mb-2">{metric.value}</div>
                  <p className="text-gray-600">{metric.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Annual Report */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Featured Report</h2>
            <p className="text-gray-600">Our latest comprehensive annual report</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-l-4 border-l-[#dd2a1b]">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-[#dd2a1b] text-white">Featured</Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Download className="h-4 w-4" />
                    {annualReports[0].downloads} downloads
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{annualReports[0].title}</CardTitle>
                <CardDescription className="text-lg">{annualReports[0].description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {annualReports[0].year}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {annualReports[0].size}
                    </div>
                  </div>
                  <Button className="bg-[#dd2a1b] hover:bg-[#c02419]">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Annual Reports</h2>
            <p className="text-gray-600">Comprehensive yearly reports on labour administration activities</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {annualReports.slice(1).map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">Annual Report</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Download className="h-3 w-3" />
                      {report.downloads}
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">{report.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      {report.year}
                    </div>
                    <Button size="sm" variant="outline" className="border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistical Reports */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Statistical Reports</h2>
            <p className="text-gray-600">Data-driven insights and analysis</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statisticalReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">Statistics</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Download className="h-3 w-3" />
                      {report.downloads}
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">{report.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      {report.year}
                    </div>
                    <Button size="sm" variant="outline" className="border-[#2b3990] text-[#2b3990] hover:bg-[#2b3990] hover:text-white">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Papers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Research Publications</h2>
            <p className="text-gray-600">Academic research and policy analysis</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {researchPapers.map((paper) => (
              <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">Research</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Download className="h-3 w-3" />
                      {paper.downloads}
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">{paper.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{paper.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      {paper.year}
                    </div>
                    <Button size="sm" variant="outline" className="border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Reports */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Compliance Reports</h2>
            <p className="text-gray-600">Reports on regulatory compliance and enforcement activities</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">Compliance</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Download className="h-3 w-3" />
                      {report.downloads}
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">{report.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      {report.year}
                    </div>
                    <Button size="sm" variant="outline" className="border-[#2b3990] text-[#2b3990] hover:bg-[#2b3990] hover:text-white">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Reports */}
      <section className="py-16 bg-[#2b3990] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Need Custom Reports?</h2>
            <p className="text-xl opacity-90 mb-8">
              Contact us for specialized reports, data analysis, or research requests
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  Request Report
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#2b3990]">
                Contact Research Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 