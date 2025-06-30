"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, FileText, MessageSquare, Upload, Edit, Trash2, Plus, Save, ImageIcon, LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  featured: boolean
  created_at: string
}

interface SiteContent {
  id: number
  section: string
  key: string
  value: string
  type: string
}

interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  content: string
  rating: number
  featured: boolean
  approved: boolean
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [siteContent, setSiteContent] = useState<SiteContent[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [editingContent, setEditingContent] = useState<SiteContent | null>(null)
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    featured: false,
  })
  const [saveStatus, setSaveStatus] = useState<string>("")
  const router = useRouter()

  // Demo data
  const demoBlogPosts: BlogPost[] = [
    {
      id: 1,
      title: "New Labour Law Amendments 2024",
      excerpt: "Important updates to the Labour Act affecting all employers and workers",
      content: "The recent amendments to Ghana's Labour Act introduce significant changes...",
      author: "Labour Department Legal Team",
      category: "Legal Updates",
      featured: true,
      created_at: "2024-12-15",
    },
    {
      id: 2,
      title: "Workplace Safety Standards Guide",
      excerpt: "Essential safety protocols and regulations every workplace must implement",
      content: "Workplace safety is a fundamental right of every worker...",
      author: "Safety Inspection Team",
      category: "Safety",
      featured: false,
      created_at: "2024-12-12",
    },
  ]

  const demoSiteContent: SiteContent[] = [
    {
      id: 1,
      section: "homepage",
      key: "hero_title",
      value: "Creating a Favourable Employment Environment",
      type: "text",
    },
    {
      id: 2,
      section: "homepage",
      key: "hero_subtitle",
      value: "Enforcing labour laws, facilitating employment services, and promoting industrial harmony nationwide.",
      type: "text",
    },
    {
      id: 3,
      section: "about",
      key: "vision",
      value:
        "A one-stop shop state-of-the-art centre of excellence for Labour Market Information and employer/employee protection.",
      type: "text",
    },
    {
      id: 4,
      section: "about",
      key: "mission",
      value:
        "To create and maintain a favourable employment environment through employment service delivery, labour inspections, promotion of harmonious industrial relations, elimination of child labour, health and safety, and international relations for national development.",
      type: "text",
    },
    {
      id: 5,
      section: "contact",
      key: "office_address",
      value: "Labour Department Head Office, Accra, Ghana",
      type: "text",
    },
    {
      id: 6,
      section: "contact",
      key: "phone_primary",
      value: "0800 600 300",
      type: "text",
    },
    {
      id: 7,
      section: "contact",
      key: "email_primary",
      value: "info@labour.gov.gh",
      type: "text",
    },
  ]

  const demoTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Kwame Asante",
      position: "Factory Worker",
      company: "Tema Industrial Area",
      content:
        "The Labour Department helped resolve my workplace dispute quickly and fairly. Their mediation services saved my job and improved working conditions for all employees.",
      rating: 5,
      featured: true,
      approved: true,
    },
    {
      id: 2,
      name: "Akosua Mensah",
      position: "HR Manager",
      company: "Accra Manufacturing Ltd",
      content:
        "Their workplace inspection services helped us improve our safety standards significantly. The team was professional and provided clear guidance on compliance requirements.",
      rating: 5,
      featured: true,
      approved: true,
    },
  ]

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

      if (!supabaseUrl || supabaseUrl === "https://demo.supabase.co") {
        // Demo mode - skip auth
        setIsDemoMode(true)
        setIsAuthenticated(true)
        loadDemoData()
        setIsLoading(false)
        return
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      // Check if user is admin
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("role")
        .eq("email", session.user.email)
        .single()

      if (!adminData) {
        router.push("/login")
        return
      }

      setIsAuthenticated(true)
      await loadData()
    } catch (error) {
      console.error("Auth check error:", error)
      // Fall back to demo mode
      setIsDemoMode(true)
      setIsAuthenticated(true)
      loadDemoData()
    } finally {
      setIsLoading(false)
    }
  }

  const loadDemoData = () => {
    setBlogPosts(demoBlogPosts)
    setSiteContent(demoSiteContent)
    setTestimonials(demoTestimonials)
  }

  const loadData = async () => {
    try {
      // Load blog posts
      const { data: posts } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

      if (posts) setBlogPosts(posts)

      // Load site content
      const { data: content } = await supabase.from("site_content").select("*").order("section", { ascending: true })

      if (content) setSiteContent(content)

      // Load testimonials
      const { data: testimonialData } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })

      if (testimonialData) setTestimonials(testimonialData)
    } catch (error) {
      console.error("Error loading data:", error)
      // Fall back to demo data
      loadDemoData()
      setIsDemoMode(true)
    }
  }

  const handleLogout = async () => {
    if (!isDemoMode) {
      await supabase.auth.signOut()
    }
    router.push("/")
  }

  const handleCreatePost = async () => {
    try {
      if (isDemoMode) {
        const post: BlogPost = {
          id: Date.now(),
          ...newPost,
          created_at: new Date().toISOString(),
        }
        setBlogPosts([post, ...blogPosts])
        setSaveStatus("Blog post created successfully! (Demo mode)")
      } else {
        const { data, error } = await supabase.from("blog_posts").insert([newPost]).select()

        if (error) throw error

        if (data) {
          setBlogPosts([data[0], ...blogPosts])
          setSaveStatus("Blog post created successfully!")
        }
      }

      setNewPost({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        category: "",
        featured: false,
      })
    } catch (error) {
      console.error("Error creating post:", error)
      setSaveStatus("Error creating blog post")
    }
  }

  const handleUpdatePost = async () => {
    if (!editingPost) return

    try {
      if (isDemoMode) {
        setBlogPosts(blogPosts.map((post) => (post.id === editingPost.id ? editingPost : post)))
        setSaveStatus("Blog post updated successfully! (Demo mode)")
      } else {
        const { error } = await supabase.from("blog_posts").update(editingPost).eq("id", editingPost.id)

        if (error) throw error

        setBlogPosts(blogPosts.map((post) => (post.id === editingPost.id ? editingPost : post)))
        setSaveStatus("Blog post updated successfully!")
      }

      setEditingPost(null)
    } catch (error) {
      console.error("Error updating post:", error)
      setSaveStatus("Error updating blog post")
    }
  }

  const handleDeletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      if (isDemoMode) {
        setBlogPosts(blogPosts.filter((post) => post.id !== id))
        setSaveStatus("Blog post deleted successfully! (Demo mode)")
      } else {
        const { error } = await supabase.from("blog_posts").delete().eq("id", id)

        if (error) throw error

        setBlogPosts(blogPosts.filter((post) => post.id !== id))
        setSaveStatus("Blog post deleted successfully!")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      setSaveStatus("Error deleting blog post")
    }
  }

  const handleUpdateSiteContent = async (content: SiteContent) => {
    try {
      if (isDemoMode) {
        setSiteContent(siteContent.map((item) => (item.id === content.id ? content : item)))
        setSaveStatus("Content updated successfully! (Demo mode)")
      } else {
        const { error } = await supabase.from("site_content").update({ value: content.value }).eq("id", content.id)

        if (error) throw error

        setSiteContent(siteContent.map((item) => (item.id === content.id ? content : item)))
        setSaveStatus("Content updated successfully!")
      }
    } catch (error) {
      console.error("Error updating content:", error)
      setSaveStatus("Error updating content")
    }
  }

  const handleApproveTestimonial = async (id: number) => {
    try {
      if (isDemoMode) {
        setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, approved: true } : t)))
        setSaveStatus("Testimonial approved! (Demo mode)")
      } else {
        const { error } = await supabase.from("testimonials").update({ approved: true }).eq("id", id)

        if (error) throw error

        setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, approved: true } : t)))
        setSaveStatus("Testimonial approved!")
      }
    } catch (error) {
      console.error("Error approving testimonial:", error)
      setSaveStatus("Error approving testimonial")
    }
  }

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      if (isDemoMode) {
        setTestimonials(testimonials.filter((t) => t.id !== id))
        setSaveStatus("Testimonial deleted! (Demo mode)")
      } else {
        const { error } = await supabase.from("testimonials").delete().eq("id", id)

        if (error) throw error

        setTestimonials(testimonials.filter((t) => t.id !== id))
        setSaveStatus("Testimonial deleted!")
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      setSaveStatus("Error deleting testimonial")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#dd2a1b]"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#231f20] mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your Labour Department website content</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {isDemoMode && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Demo Mode:</strong> This admin panel is running in demonstration mode. Changes are not saved to
                a real database. To enable full functionality, configure your Supabase environment variables.
              </p>
            </div>
          )}

          {saveStatus && (
            <Alert className="mt-4">
              <AlertDescription>{saveStatus}</AlertDescription>
            </Alert>
          )}
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Site Content</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Blog Posts</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center space-x-2">
              <ImageIcon className="h-4 w-4" />
              <span>Media</span>
            </TabsTrigger>
          </TabsList>

          {/* Site Content Management */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Content Management</CardTitle>
                <CardDescription>Update text content across your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {siteContent.map((content) => (
                    <div key={content.id} className="border rounded-lg p-4">
                      <div className="mb-2">
                        <h3 className="font-semibold capitalize">
                          {content.section} - {content.key.replace(/_/g, " ")}
                        </h3>
                        <Badge variant="secondary">{content.type}</Badge>
                      </div>
                      {content.type === "text" && (
                        <div className="space-y-2">
                          <Textarea
                            value={content.value}
                            onChange={(e) => {
                              const updatedContent = { ...content, value: e.target.value }
                              setSiteContent(
                                siteContent.map((item) => (item.id === content.id ? updatedContent : item)),
                              )
                            }}
                            rows={content.value.length > 100 ? 4 : 2}
                          />
                          <Button
                            onClick={() => handleUpdateSiteContent(content)}
                            className="bg-[#2b3990] hover:bg-[#1e2a70]"
                            size="sm"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Update
                          </Button>
                        </div>
                      )}
                      {content.type === "image" && (
                        <div className="space-y-2">
                          <Input
                            value={content.value}
                            onChange={(e) => {
                              const updatedContent = { ...content, value: e.target.value }
                              setSiteContent(
                                siteContent.map((item) => (item.id === content.id ? updatedContent : item)),
                              )
                            }}
                            placeholder="Image URL"
                          />
                          <Button
                            onClick={() => handleUpdateSiteContent(content)}
                            className="bg-[#2b3990] hover:bg-[#1e2a70]"
                            size="sm"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Update
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Posts Management */}
          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Create New Blog Post</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                  <Input
                    placeholder="Author"
                    value={newPost.author}
                    onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Category"
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newPost.featured}
                      onChange={(e) => setNewPost({ ...newPost, featured: e.target.checked })}
                    />
                    <label htmlFor="featured">Featured Post</label>
                  </div>
                </div>
                <Textarea
                  placeholder="Post Excerpt"
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                />
                <Textarea
                  placeholder="Post Content"
                  rows={6}
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <Button onClick={handleCreatePost} className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Blog Posts</CardTitle>
                <CardDescription>Edit, delete, or view existing blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-sm text-gray-600">
                            {post.author} • {post.category}
                          </p>
                          {post.featured && <Badge className="mt-1">Featured</Badge>}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeletePost(post.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{post.excerpt}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Management */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials Management</CardTitle>
                <CardDescription>Approve, edit, or delete customer testimonials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">
                            {testimonial.position} at {testimonial.company}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            {testimonial.approved ? (
                              <Badge className="bg-green-100 text-green-800">Approved</Badge>
                            ) : (
                              <Badge variant="secondary">Pending</Badge>
                            )}
                            {testimonial.featured && <Badge>Featured</Badge>}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!testimonial.approved && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApproveTestimonial(testimonial.id)}
                            >
                              Approve
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">"{testimonial.content}"</p>
                      <div className="flex mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Management */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media Management</CardTitle>
                <CardDescription>Upload and manage images for your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Upload ImageIcons</h3>
                  <p className="text-gray-600 mb-4">
                    {isDemoMode
                      ? "Media upload is available when connected to Supabase Storage"
                      : "Drag and drop images here or click to browse"}
                  </p>
                  <Button variant="outline" disabled={isDemoMode}>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>

                {isDemoMode && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Note:</strong> Media management requires Supabase Storage configuration. In production,
                      this would allow uploading and managing images for hero sections, blog posts, and other website
                      content.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Blog Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Post Title"
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Author"
                  value={editingPost.author}
                  onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                />
                <Input
                  placeholder="Category"
                  value={editingPost.category}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-featured"
                  checked={editingPost.featured}
                  onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                />
                <label htmlFor="edit-featured">Featured Post</label>
              </div>
              <Textarea
                placeholder="Post Excerpt"
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              />
              <Textarea
                placeholder="Post Content"
                rows={6}
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              />
              <div className="flex space-x-2">
                <Button onClick={handleUpdatePost} className="bg-[#dd2a1b] hover:bg-[#c02419]">
                  <Save className="h-4 w-4 mr-2" />
                  Update Post
                </Button>
                <Button variant="outline" onClick={() => setEditingPost(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
