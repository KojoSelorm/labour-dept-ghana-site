import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  GraduationCap, 
  Users, 
  Clock, 
  MapPin, 
  Calendar,
  Star,
  BookOpen,
  Award,
  TrendingUp,
  Filter,
  ExternalLink,
  Play,
  Download
} from "lucide-react"
import Link from "next/link"

const trainingCategories = [
  { id: "all", name: "All Programs", count: 45 },
  { id: "digital_skills", name: "Digital Skills", count: 12 },
  { id: "vocational", name: "Vocational Training", count: 18 },
  { id: "leadership", name: "Leadership & Management", count: 8 },
  { id: "safety", name: "Workplace Safety", count: 7 },
]

const featuredPrograms = [
  {
    id: 1,
    title: "Digital Skills for the Modern Workplace",
    description: "Comprehensive training in essential digital tools and technologies for today's workplace",
    category: "digital_skills",
    duration: "6 weeks",
    location: "Accra, Kumasi, Tamale",
    startDate: "2024-02-15",
    seats: 25,
    enrolled: 18,
    rating: 4.8,
    featured: true,
    price: "Free",
    instructor: "Dr. Kwame Mensah",
  },
  {
    id: 2,
    title: "Advanced Leadership & Team Management",
    description: "Develop essential leadership skills for managing teams and driving organizational success",
    category: "leadership",
    duration: "8 weeks",
    location: "Accra",
    startDate: "2024-03-01",
    seats: 20,
    enrolled: 15,
    rating: 4.9,
    featured: true,
    price: "GH₵ 500",
    instructor: "Prof. Sarah Addo",
  },
  {
    id: 3,
    title: "Workplace Safety & Compliance",
    description: "Essential training on workplace safety standards and regulatory compliance",
    category: "safety",
    duration: "4 weeks",
    location: "All Regions",
    startDate: "2024-02-20",
    seats: 30,
    enrolled: 25,
    rating: 4.7,
    featured: true,
    price: "Free",
    instructor: "Mr. John Asante",
  },
]

const vocationalPrograms = [
  {
    id: 4,
    title: "Welding & Metal Fabrication",
    description: "Hands-on training in welding techniques and metal fabrication skills",
    category: "vocational",
    duration: "12 weeks",
    location: "Tema",
    startDate: "2024-03-15",
    seats: 15,
    enrolled: 12,
    rating: 4.6,
    price: "GH₵ 800",
    instructor: "Mr. Kwesi Boateng",
  },
  {
    id: 5,
    title: "Electrical Installation & Maintenance",
    description: "Comprehensive electrical training for residential and commercial installations",
    category: "vocational",
    duration: "16 weeks",
    location: "Kumasi",
    startDate: "2024-04-01",
    seats: 20,
    enrolled: 16,
    rating: 4.8,
    price: "GH₵ 1,200",
    instructor: "Eng. Michael Osei",
  },
  {
    id: 6,
    title: "Plumbing & Pipe Fitting",
    description: "Professional plumbing training with modern tools and techniques",
    category: "vocational",
    duration: "10 weeks",
    location: "Accra",
    startDate: "2024-03-10",
    seats: 18,
    enrolled: 14,
    rating: 4.5,
    price: "GH₵ 600",
    instructor: "Mr. Daniel Kofi",
  },
]

const digitalSkillsPrograms = [
  {
    id: 7,
    title: "Microsoft Office Mastery",
    description: "Master Excel, Word, PowerPoint, and Outlook for workplace productivity",
    category: "digital_skills",
    duration: "4 weeks",
    location: "Online",
    startDate: "2024-02-25",
    seats: 50,
    enrolled: 35,
    rating: 4.7,
    price: "Free",
    instructor: "Ms. Grace Akoto",
  },
  {
    id: 8,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript for web development",
    category: "digital_skills",
    duration: "8 weeks",
    location: "Accra",
    startDate: "2024-03-20",
    seats: 25,
    enrolled: 20,
    rating: 4.9,
    price: "GH₵ 400",
    instructor: "Mr. Emmanuel Tetteh",
  },
]

const upcomingPrograms = [
  {
    id: 9,
    title: "Project Management Professional",
    description: "PMI-aligned project management certification preparation",
    category: "leadership",
    duration: "12 weeks",
    location: "Accra",
    startDate: "2024-04-15",
    seats: 30,
    enrolled: 22,
    rating: 4.8,
    price: "GH₵ 1,500",
    instructor: "Dr. Patricia Owusu",
  },
  {
    id: 10,
    title: "Data Analysis & Visualization",
    description: "Learn data analysis using Excel, Power BI, and Python",
    category: "digital_skills",
    duration: "6 weeks",
    location: "Online",
    startDate: "2024-04-01",
    seats: 40,
    enrolled: 28,
    rating: 4.6,
    price: "GH₵ 300",
    instructor: "Ms. Abena Osei",
  },
]

export default function TrainingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Skills Development</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Training & Development Programs</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Enhance your skills and advance your career with our comprehensive training programs. 
              From digital skills to vocational training, we offer opportunities for all skill levels.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search training programs..."
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Filter by:</span>
              <div className="flex gap-2">
                {trainingCategories.map((category) => (
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

      {/* Featured Programs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Featured Programs</h2>
            <p className="text-gray-600">Our most popular and highly-rated training programs</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {featuredPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-[#dd2a1b]">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-[#dd2a1b] text-white">Featured</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{program.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Starts {new Date(program.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{program.enrolled}/{program.seats} enrolled</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-[#dd2a1b]">{program.price}</p>
                      <p className="text-sm text-gray-600">Instructor: {program.instructor}</p>
                    </div>
                    <Button size="sm" className="bg-[#dd2a1b] hover:bg-[#c02419]">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vocational Training */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Vocational Training</h2>
            <p className="text-gray-600">Hands-on training for practical skills and trades</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocationalPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">Vocational</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{program.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">{program.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>{program.enrolled}/{program.seats} enrolled</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-[#2b3990]">{program.price}</p>
                    <Button size="sm" variant="outline" className="border-[#2b3990] text-[#2b3990] hover:bg-[#2b3990] hover:text-white">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Skills */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Digital Skills Training</h2>
            <p className="text-gray-600">Master essential digital tools and technologies</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {digitalSkillsPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">Digital Skills</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{program.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">{program.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>{program.enrolled}/{program.seats} enrolled</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-[#dd2a1b]">{program.price}</p>
                    <Button size="sm" variant="outline" className="border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                      Enroll
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Upcoming Programs</h2>
            <p className="text-gray-600">New training opportunities starting soon</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Upcoming</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{program.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">{program.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Starts {new Date(program.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-[#2b3990]">{program.price}</p>
                    <Button size="sm" variant="outline" className="border-[#2b3990] text-[#2b3990] hover:bg-[#2b3990] hover:text-white">
                      Pre-register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Centers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Our Training Centers</h2>
            <p className="text-lg text-gray-600">State-of-the-art facilities across Ghana</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Accra Training Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Main training facility with modern equipment and experienced instructors</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Address:</strong> 123 Training Street, Accra</p>
                  <p><strong>Phone:</strong> +233 20 123 4567</p>
                  <p><strong>Email:</strong> accra@training.gov.gh</p>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-[#2b3990] mx-auto mb-4" />
                <CardTitle>Kumasi Training Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Regional center specializing in vocational and technical training</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Address:</strong> 456 Skill Avenue, Kumasi</p>
                  <p><strong>Phone:</strong> +233 24 987 6543</p>
                  <p><strong>Email:</strong> kumasi@training.gov.gh</p>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Tema Industrial Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Specialized facility for industrial and technical training</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Address:</strong> 789 Industrial Road, Tema</p>
                  <p><strong>Phone:</strong> +233 22 456 7890</p>
                  <p><strong>Email:</strong> tema@training.gov.gh</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#2b3990] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Advance Your Career?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of professionals who have enhanced their skills through our training programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#dd2a1b] hover:bg-[#c02419]">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse All Programs
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#2b3990]">
                <ExternalLink className="mr-2 h-5 w-5" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 