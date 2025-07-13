"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, FileText, MessageSquare, Upload, Edit, Trash2, Plus, Save } from "lucide-react"

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

// Static demo data
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

export default function AdminPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(demoBlogPosts)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    featured: false,
  })

  const handleCreatePost = async () => {
    const post: BlogPost = {
      id: Date.now(),
      ...newPost,
      created_at: new Date().toISOString(),
    }

    setBlogPosts([post, ...blogPosts])
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      featured: false,
    })
    alert("Blog post created successfully! (Demo mode - not saved to database)")
  }

  const handleUpdatePost = async () => {
    if (!editingPost) return

    setBlogPosts(blogPosts.map((post) => (post.id === editingPost.id ? editingPost : post)))
    setEditingPost(null)
    alert("Blog post updated successfully! (Demo mode - not saved to database)")
  }

  const handleDeletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    setBlogPosts(blogPosts.filter((post) => post.id !== id))
    alert("Blog post deleted successfully! (Demo mode)")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#231f20] mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Labour Department website content</p>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> This admin panel is for demonstration purposes. Changes are not saved to a
              real database.
            </p>
          </div>
        </div>

        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="blog" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Blog Posts</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Site Content</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
          </TabsList>

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

          {/* Site Content Management */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Content Management</CardTitle>
                <CardDescription>Update text and images across your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold">Homepage - Hero Title</h3>
                      <Badge variant="secondary">text</Badge>
                    </div>
                    <Textarea defaultValue="Creating a Favourable Employment Environment" rows={2} />
                    <Button className="mt-2 bg-[#2b3990] hover:bg-[#1e2a70]" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Update
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold">About - Mission Statement</h3>
                      <Badge variant="secondary">text</Badge>
                    </div>
                    <Textarea
                      defaultValue="To create and maintain a favourable employment environment through employment service delivery, labour inspections, promotion of harmonious industrial relations, elimination of child labour, health and safety, and international relations for national development."
                      rows={4}
                    />
                    <Button className="mt-2 bg-[#2b3990] hover:bg-[#1e2a70]" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Management */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials Management</CardTitle>
                <CardDescription>Manage customer testimonials and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Testimonials management interface - Demo mode</p>
                <div className="mt-4 space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Kwame Asante - Factory Worker</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      "The Labour Department helped resolve my workplace dispute quickly and fairly..."
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Management */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Knowledge Base Documents</CardTitle>
                <CardDescription>Manage PDF documents for the AI chatbot knowledge base</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Document management interface - Demo mode</p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    In production, this would allow uploading PDF documents that the AI chatbot can reference when
                    answering questions about labour laws and regulations.
                  </p>
                </div>
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
