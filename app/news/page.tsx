import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, Tag, ArrowRight, Filter, FileText, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const newsCategories = [
  { id: "all", name: "All News", count: 45 },
  { id: "legislation", name: "Legislation Updates", count: 12 },
  { id: "employment", name: "Employment News", count: 18 },
  { id: "safety", name: "Workplace Safety", count: 8 },
  { id: "training", name: "Training Programs", count: 7 },
]

const featuredArticles = [
  {
    id: 1,
    title: "New Minimum Wage Guidelines for 2024 Announced",
    excerpt: "The Labour Department has released updated minimum wage guidelines effective January 2024, ensuring fair compensation across all sectors.",
    category: "legislation",
    author: "Labour Department",
    date: "2024-01-15",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "Enhanced Workplace Safety Regulations Now in Effect",
    excerpt: "Updated safety protocols and inspection procedures to protect workers across Ghana's industrial sectors.",
    category: "safety",
    author: "Safety Division",
    date: "2024-01-12",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: 3,
    title: "Digital Skills Training Program Launches Nationwide",
    excerpt: "Free digital literacy and workplace technology training available for workers in all 16 regions.",
    category: "training",
    author: "Training Division",
    date: "2024-01-10",
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
]

const recentArticles = [
  {
    id: 4,
    title: "Labour Dispute Resolution Process Simplified",
    excerpt: "Streamlined procedures for faster resolution of workplace conflicts and grievances.",
    category: "employment",
    author: "Industrial Relations",
    date: "2024-01-08",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Child Labour Prevention Campaign Results",
    excerpt: "Successful reduction in child labour cases across mining and agricultural sectors.",
    category: "safety",
    author: "Child Labour Unit",
    date: "2024-01-05",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Employer Registration Portal Now Live",
    excerpt: "New online system for business registration and compliance monitoring.",
    category: "legislation",
    author: "Registration Division",
    date: "2024-01-03",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "Regional Employment Statistics Q4 2023",
    excerpt: "Comprehensive employment data and trends across Ghana's 16 regions.",
    category: "employment",
    author: "Statistics Division",
    date: "2023-12-28",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Workplace Mental Health Guidelines",
    excerpt: "New guidelines for promoting mental health and well-being in the workplace.",
    category: "safety",
    author: "Health & Safety",
    date: "2023-12-25",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 9,
    title: "Union Formation Rights Clarified",
    excerpt: "Updated guidance on worker rights to form and join trade unions.",
    category: "legislation",
    author: "Legal Division",
    date: "2023-12-22",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">News & Media</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Latest News & Updates</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Stay informed about labour laws, employment trends, workplace safety, and important announcements from the Ghana Labour Department.
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
                placeholder="Search news and articles..."
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Filter by:</span>
              <div className="flex gap-2">
                {newsCategories.map((category) => (
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

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Featured Articles</h2>
            <p className="text-gray-600">Latest important updates and announcements</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#dd2a1b] text-white">
                    {article.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {article.author}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/news/${article.id}`}>
                    <Button variant="outline" className="w-full border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Recent Articles</h2>
            <p className="text-gray-600">Stay updated with the latest labour news and developments</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-[#2b3990] text-white text-xs">
                    {article.category}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.author}
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2 line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/news/${article.id}`}>
                    <Button variant="ghost" className="p-0 h-auto text-[#dd2a1b] hover:text-[#c02419]">
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-[#2b3990] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl opacity-90 mb-8">
              Subscribe to our newsletter for the latest labour news, policy updates, and important announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/70"
              />
              <Button className="bg-[#dd2a1b] hover:bg-[#c02419]">
                Subscribe
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Media Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Media Resources</h2>
            <p className="text-lg text-gray-600">Access press releases, media kits, and official statements</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <FileText className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Press Releases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Official statements and announcements</p>
                <Button variant="outline" className="w-full border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                  View Releases
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Image className="h-12 w-12 text-[#2b3990] mx-auto mb-4" />
                <CardTitle>Media Kit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Logos, photos, and brand guidelines</p>
                <Button variant="outline" className="w-full border-[#2b3990] text-[#2b3990] hover:bg-[#2b3990] hover:text-white">
                  Download Kit
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Media Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Contact our media relations team</p>
                <Button variant="outline" className="w-full border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 