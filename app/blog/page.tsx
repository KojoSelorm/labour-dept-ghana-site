import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "New Labour Law Amendments: What Employers Need to Know",
    excerpt:
      "Comprehensive guide to the latest amendments in Ghana's Labour Act and their implications for businesses.",
    content:
      "The recent amendments to Ghana's Labour Act introduce significant changes that affect both employers and employees...",
    author: "Labour Department Legal Team",
    date: "2024-12-15",
    readTime: "8 min read",
    category: "Legal Updates",
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
  },
  {
    id: 2,
    title: "Workplace Safety Standards: A Complete Guide",
    excerpt: "Essential safety protocols and regulations every workplace in Ghana must implement.",
    content: "Workplace safety is a fundamental right of every worker. This comprehensive guide outlines...",
    author: "Safety Inspection Team",
    date: "2024-12-12",
    readTime: "6 min read",
    category: "Safety",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 3,
    title: "Child Labour Elimination: Progress Report 2024",
    excerpt: "Annual report on Ghana's efforts to eliminate child labour and protect young people.",
    content: "Ghana has made significant strides in combating child labour through coordinated efforts...",
    author: "Child Labour Monitoring Unit",
    date: "2024-12-10",
    readTime: "10 min read",
    category: "Child Protection",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 4,
    title: "Digital Transformation in Labour Administration",
    excerpt: "How technology is revolutionizing labour services and improving accessibility for all Ghanaians.",
    content: "The Labour Department's digital transformation initiative is changing how we deliver services...",
    author: "IT Department",
    date: "2024-12-08",
    readTime: "5 min read",
    category: "Technology",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 5,
    title: "Understanding Your Rights as a Worker in Ghana",
    excerpt: "A comprehensive guide to worker rights under Ghanaian law and how to protect them.",
    content: "Every worker in Ghana has fundamental rights protected by law. This guide explains...",
    author: "Worker Rights Division",
    date: "2024-12-05",
    readTime: "7 min read",
    category: "Worker Rights",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
  {
    id: 6,
    title: "Skills Development Programs: Empowering Ghana's Workforce",
    excerpt: "Overview of training programs and initiatives designed to enhance workforce capabilities.",
    content: "The Labour Department's skills development programs are designed to meet the evolving needs...",
    author: "Training and Development Team",
    date: "2024-12-03",
    readTime: "6 min read",
    category: "Training",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
  },
]

const categories = ["All", "Legal Updates", "Safety", "Child Protection", "Technology", "Worker Rights", "Training"]

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">News & Insights</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Labour Department Blog</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Stay informed with the latest news, updates, and insights from Ghana's Labour Department. Get expert
              analysis on labour laws, workplace safety, and employment trends.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Badge className="mb-4 bg-[#dd2a1b] text-white">Featured Article</Badge>
              <Card className="overflow-hidden shadow-lg">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4 text-[#231f20]">{featuredPost.title}</h2>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <User className="h-4 w-4 mr-2" />
                      <span className="mr-4">{featuredPost.author}</span>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="mr-4">{new Date(featuredPost.date).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button className="bg-[#dd2a1b] hover:bg-[#c02419] w-fit">
                        Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-[#231f20]">Browse by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={category === "All" ? "bg-[#2b3990] hover:bg-[#1e2a70]" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-[#231f20]">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {post.category}
                    </Badge>
                    <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="mr-3">{new Date(post.date).toLocaleDateString()}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Read More <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-[#2b3990] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl opacity-90 mb-8">
              Subscribe to our newsletter for the latest labour news and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
              />
              <Button className="bg-[#dd2a1b] hover:bg-[#c02419]">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
