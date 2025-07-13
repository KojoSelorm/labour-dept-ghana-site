import { ComplaintForm } from "@/components/complaint-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, Mail, MapPin } from "lucide-react"

export default function ComplaintsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">File a Complaint</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Report Labour Issues</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Your voice matters. Report workplace violations, unfair treatment, or safety concerns. We're here to
              protect your rights and ensure fair working conditions for all.
            </p>
          </div>
        </div>
      </section>

      {/* Complaint Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Types of Complaints We Handle</h2>
            <p className="text-lg text-gray-600">We investigate and resolve various workplace issues</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Wage & Payment Issues",
                description: "Unpaid wages, overtime disputes, minimum wage violations",
                icon: "💰",
              },
              {
                title: "Workplace Safety",
                description: "Unsafe working conditions, lack of safety equipment, accidents",
                icon: "🛡️",
              },
              {
                title: "Discrimination",
                description: "Unfair treatment based on gender, religion, ethnicity, or disability",
                icon: "⚖️",
              },
              {
                title: "Unfair Dismissal",
                description: "Wrongful termination, lack of proper notice, procedural violations",
                icon: "📋",
              },
              {
                title: "Working Hours",
                description: "Excessive overtime, denied breaks, forced work on rest days",
                icon: "⏰",
              },
              {
                title: "Child Labour",
                description: "Employment of minors, hazardous work for children",
                icon: "👶",
              },
            ].map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Complaint Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Submit Your Complaint</h2>
              <p className="text-lg text-gray-600">
                Provide detailed information about your complaint. All submissions are confidential and will be
                investigated thoroughly.
              </p>
            </div>
            <ComplaintForm />
          </div>
        </div>
      </section>

      {/* Process Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Our Investigation Process</h2>
            <p className="text-lg text-gray-600">How we handle your complaint from submission to resolution</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Complaint Received",
                description: "Your complaint is logged and assigned a reference number",
                timeframe: "Within 24 hours",
              },
              {
                step: "2",
                title: "Initial Assessment",
                description: "We review the complaint and determine the appropriate action",
                timeframe: "2-3 business days",
              },
              {
                step: "3",
                title: "Investigation",
                description: "Our team conducts a thorough investigation of the matter",
                timeframe: "5-15 business days",
              },
              {
                step: "4",
                title: "Resolution",
                description: "We work to resolve the issue and provide feedback",
                timeframe: "Varies by case",
              },
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#dd2a1b] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  <Badge variant="secondary">{step.timeframe}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-[#dd2a1b] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Urgent Complaints</h2>
            <p className="text-xl opacity-90 mb-8">
              For immediate safety concerns or urgent labour violations, contact us directly
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
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-bold mb-2">complaints@labour.gov.gh</p>
                <p className="text-sm opacity-80">Formal complaint submissions</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-4" />
                <CardTitle>Walk-in Service</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-bold mb-2">Regional Offices</p>
                <p className="text-sm opacity-80">Visit any of our 16 regional offices</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
