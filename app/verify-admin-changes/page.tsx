"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, AlertCircle, RefreshCw, Edit, Plus } from "lucide-react"

export default function VerifyAdminChanges() {
  const [loading, setLoading] = useState(false)
  const [siteContent, setSiteContent] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [activeTab, setActiveTab] = useState("content")

  const supabase = createClientComponentClient()

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch site content
      const { data: contentData, error: contentError } = await supabase.from("site_content").select("*")

      if (contentError) throw contentError

      // Fetch blog posts
      const { data: blogData, error: blogError } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })

      if (blogError) throw blogError

      // Fetch testimonials
      const { data: testimonialData, error: testimonialError } = await supabase.from("testimonials").select("*")

      if (testimonialError) throw testimonialError

      setSiteContent(contentData || [])
      setBlogPosts(blogData || [])
      setTestimonials(testimonialData || [])
      setTestResult({
        success: true,
        message: "Data fetched successfully! Your database connection is working.",
      })
    } catch (error: any) {
      console.error("Error fetching data:", error)
      setTestResult({
        success: false,
        message: `Error fetching data: ${error.message || "Unknown error"}`,
      })
    } finally {
      setLoading(false)
    }
  }

  const testHeroChange = async () => {
    setLoading(true)
    try {
      // Find hero content
      const heroContent = siteContent.find((item) => item.key === "hero_title")

      if (!heroContent) {
        // Create hero content if it doesn't exist
        const { data, error } = await supabase
          .from("site_content")
          .insert([
            {
              section: "homepage",
              key: "hero_title",
              value: "Test Hero Title - Updated " + new Date().toLocaleTimeString(),
              type: "text",
            },
          ])
          .select()

        if (error) throw error

        setTestResult({
          success: true,
          message: "Hero title created successfully! Check the homepage to see if it appears.",
        })
      } else {
        // Update existing hero content
        const { data, error } = await supabase
          .from("site_content")
          .update({ value: "Test Hero Title - Updated " + new Date().toLocaleTimeString() })
          .eq("key", "hero_title")
          .select()

        if (error) throw error

        setTestResult({
          success: true,
          message: "Hero title updated successfully! Check the homepage to see if it changed.",
        })
      }

      // Refresh data
      fetchData()
    } catch (error: any) {
      console.error("Error updating hero title:", error)
      setTestResult({
        success: false,
        message: `Error updating hero title: ${error.message || "Unknown error"}`,
      })
    } finally {
      setLoading(false)
    }
  }

  const testBlogPost = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert([
          {
            title: "Test Blog Post - " + new Date().toLocaleTimeString(),
            excerpt: "This is a test blog post excerpt to verify admin changes are working.",
            content:
              "This is a test blog post created to verify admin changes are working. The content includes detailed information about the testing process.",
            author: "Admin Test System",
            category: "General",
            featured: false,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error

      setTestResult({
        success: true,
        message: "Blog post created successfully! Check the blog page to see if it appears.",
      })

      // Refresh data
      fetchData()
    } catch (error: any) {
      console.error("Error creating blog post:", error)
      setTestResult({
        success: false,
        message: `Error creating blog post: ${error.message || "Unknown error"}`,
      })
    } finally {
      setLoading(false)
    }
  }

  const testTestimonial = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .insert([
          {
            name: "Test User",
            position: "System Tester",
            company: "Test Company",
            content:
              "This is a test testimonial created at " +
              new Date().toLocaleTimeString() +
              ". It demonstrates that the admin system is working correctly.",
            rating: 5,
            featured: false,
            approved: true,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error

      setTestResult({
        success: true,
        message: "Testimonial created successfully! Check the homepage to see if it appears.",
      })

      // Refresh data
      fetchData()
    } catch (error: any) {
      console.error("Error creating testimonial:", error)
      setTestResult({
        success: false,
        message: `Error creating testimonial: ${error.message || "Unknown error"}`,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Changes Verification System</h1>

      {testResult && (
        <Alert className={`mb-6 ${testResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          {testResult.success ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertTitle>{testResult.success ? "Success!" : "Error!"}</AlertTitle>
          <AlertDescription>{testResult.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap gap-4 mb-8">
        <Button onClick={fetchData} variant="outline" disabled={loading} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>

        <Button onClick={testHeroChange} variant="default" disabled={loading} className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Test Hero Title Change
        </Button>

        <Button onClick={testBlogPost} variant="default" disabled={loading} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Test Blog Post
        </Button>

        <Button onClick={testTestimonial} variant="default" disabled={loading} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Test Testimonial
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="content">Site Content</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Site Content</CardTitle>
              <CardDescription>
                Current site content in the database. Changes here should appear on the homepage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {siteContent.length > 0 ? (
                <div className="space-y-4">
                  {siteContent.map((item) => (
                    <div key={item.id} className="border p-4 rounded-md">
                      <div className="font-medium">{item.key}</div>
                      <div className="text-sm text-gray-500 mt-1">{item.value}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No site content found. Try creating some in the admin panel.
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => window.open("/", "_blank")}>
                View Homepage
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>
                Current blog posts in the database. New posts should appear on the blog page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {blogPosts.length > 0 ? (
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="border p-4 rounded-md">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500 mt-2 line-clamp-2">{post.content}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No blog posts found. Try creating some in the admin panel.
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => window.open("/blog", "_blank")}>
                View Blog Page
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials</CardTitle>
              <CardDescription>
                Current testimonials in the database. Approved testimonials should appear on the homepage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {testimonials.length > 0 ? (
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border p-4 rounded-md">
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {testimonial.role} • {testimonial.approved ? "Approved" : "Not Approved"}
                      </div>
                      <div className="text-sm text-gray-500 mt-2">"{testimonial.content}"</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No testimonials found. Try creating some in the admin panel.
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => window.open("/", "_blank")}>
                View Homepage
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How to Verify Admin Changes</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Use the buttons above to create test content (hero title, blog post, testimonial)</li>
          <li>Click "Refresh Data" to see the changes in the database</li>
          <li>Open the homepage or blog page to verify changes appear on the live site</li>
          <li>Go to the admin panel and make additional changes</li>
          <li>Return here and click "Refresh Data" to verify the changes were saved</li>
        </ol>
      </div>
    </div>
  )
}
