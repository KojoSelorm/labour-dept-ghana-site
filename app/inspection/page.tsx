"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Building,
  FileText,
  Phone,
  Mail,
  Calendar,
  Users,
  TrendingUp,
  Filter
} from "lucide-react"
import { useState } from "react"

const inspectionTypes = [
  { id: "safety", name: "Safety Inspection", description: "Workplace safety and health standards" },
  { id: "compliance", name: "Compliance Inspection", description: "Labour law and regulation compliance" },
  { id: "wage", name: "Wage & Benefits Inspection", description: "Minimum wage and benefits compliance" },
  { id: "working_hours", name: "Working Hours Inspection", description: "Working hours and overtime compliance" },
  { id: "child_labour", name: "Child Labour Inspection", description: "Child labour prevention and monitoring" },
  { id: "general", name: "General Inspection", description: "General workplace conditions and practices" },
]

const priorityLevels = [
  { id: "low", name: "Low Priority", description: "Non-urgent issues", color: "bg-green-100 text-green-800" },
  { id: "medium", name: "Medium Priority", description: "Standard inspection request", color: "bg-yellow-100 text-yellow-800" },
  { id: "high", name: "High Priority", description: "Urgent safety concerns", color: "bg-orange-100 text-orange-800" },
  { id: "urgent", name: "Urgent", description: "Immediate safety threats", color: "bg-red-100 text-red-800" },
]

const sampleInspections = [
  {
    id: "INS-2024-001",
    type: "Safety Inspection",
    status: "Scheduled",
    priority: "high",
    businessName: "Ghana Manufacturing Co",
    address: "123 Industrial Road, Tema",
    requestedDate: "2024-01-15",
    scheduledDate: "2024-01-25",
    description: "Workplace safety concerns reported by employees",
  },
  {
    id: "INS-2024-002",
    type: "Compliance Inspection",
    status: "In Progress",
    priority: "medium",
    businessName: "Accra Retail Store",
    address: "456 High Street, Accra",
    requestedDate: "2024-01-10",
    scheduledDate: "2024-01-20",
    description: "Routine compliance check for labour law adherence",
  },
  {
    id: "INS-2024-003",
    type: "Wage & Benefits Inspection",
    status: "Completed",
    priority: "high",
    businessName: "Kumasi Textiles Ltd",
    address: "789 Factory Lane, Kumasi",
    requestedDate: "2024-01-05",
    scheduledDate: "2024-01-15",
    completedDate: "2024-01-15",
    description: "Employee complaints about wage violations",
  },
]

export default function InspectionPage() {
  const [inspectionType, setInspectionType] = useState("")
  const [priority, setPriority] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setInspectionType("")
    setPriority("")
    setBusinessName("")
    setAddress("")
    setDescription("")
    setContactName("")
    setContactPhone("")
    setContactEmail("")
    setIsSubmitting(false)
    
    alert("Inspection request submitted successfully. You will receive a confirmation email within 24 hours.")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Labour Inspection</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Request Workplace Inspection</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Report workplace violations, request safety inspections, and ensure compliance with labour laws. 
              Our inspection team is here to protect worker rights and maintain safe working conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Inspection Request Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-[#dd2a1b]" />
                  <CardTitle className="text-2xl">Request Inspection</CardTitle>
                </div>
                <CardDescription>
                  Fill out the form below to request a workplace inspection. All information will be kept confidential.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Inspection Type</label>
                      <Select value={inspectionType} onValueChange={setInspectionType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inspection type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inspectionTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              <div>
                                <div className="font-medium">{type.name}</div>
                                <div className="text-sm text-gray-500">{type.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Priority Level</label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority level" />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityLevels.map((level) => (
                            <SelectItem key={level.id} value={level.id}>
                              <div>
                                <div className="font-medium">{level.name}</div>
                                <div className="text-sm text-gray-500">{level.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Business/Organization Name</label>
                    <Input
                      type="text"
                      placeholder="Enter business or organization name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Business Address</label>
                    <Textarea
                      placeholder="Enter complete business address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description of Concerns</label>
                    <Textarea
                      placeholder="Describe the issues or concerns that require inspection..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Contact Name</label>
                      <Input
                        type="text"
                        placeholder="Your full name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Contact Phone</label>
                      <Input
                        type="tel"
                        placeholder="Phone number"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Contact Email</label>
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#dd2a1b] hover:bg-[#c02419]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Submit Inspection Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Inspections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Recent Inspection Requests</h2>
            <p className="text-gray-600">Examples of inspection requests and their current status</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleInspections.map((inspection) => (
              <Card key={inspection.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{inspection.type}</Badge>
                    <Badge className={getStatusColor(inspection.status)}>
                      {inspection.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mb-2">{inspection.businessName}</CardTitle>
                  <CardDescription className="line-clamp-2">{inspection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span className="line-clamp-1">{inspection.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Requested: {new Date(inspection.requestedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Scheduled: {new Date(inspection.scheduledDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">ID: {inspection.id}</span>
                    <Button size="sm" variant="outline" className="border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                      Track Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inspection Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Inspection Process</h2>
            <p className="text-lg text-gray-600">How we handle inspection requests and ensure compliance</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[#dd2a1b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <CardTitle>Request Submission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Submit your inspection request with detailed information about the workplace and concerns.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[#2b3990] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <CardTitle>Review & Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our team reviews the request and schedules an inspection based on priority and urgency.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[#dd2a1b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <CardTitle>On-Site Inspection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Trained inspectors conduct thorough on-site examinations of workplace conditions and practices.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[#2b3990] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <CardTitle>Report & Follow-up</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Detailed report is generated with findings and recommendations for compliance improvement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-[#dd2a1b] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Emergency Safety Concerns?</h2>
            <p className="text-xl opacity-90 mb-8">
              For immediate safety threats or urgent workplace violations, contact us directly
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-4" />
                <CardTitle>Emergency Hotline</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-xl font-bold mb-2">0800 600 400</p>
                <p className="text-sm opacity-80">24/7 Emergency Response</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-4" />
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-bold mb-2">inspections@labour.gov.gh</p>
                <p className="text-sm opacity-80">Urgent inspection requests</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader className="text-center">
                <Building className="h-8 w-8 mx-auto mb-4" />
                <CardTitle>Regional Offices</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-bold mb-2">Walk-in Service</p>
                <p className="text-sm opacity-80">Visit any of our 16 regional offices</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Why Request an Inspection?</h2>
            <p className="text-lg text-gray-600">Protect workers and ensure workplace compliance</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Protect Worker Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ensure workers are protected from unsafe conditions, unfair treatment, and labour law violations.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-[#2b3990] mx-auto mb-4" />
                <CardTitle>Ensure Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Verify that workplaces meet safety standards and comply with Ghana's labour regulations.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Improve Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Help businesses improve their workplace practices and maintain high safety standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 