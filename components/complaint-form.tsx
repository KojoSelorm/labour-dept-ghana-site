"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Send, Upload } from "lucide-react"

export function ComplaintForm() {
  const [formData, setFormData] = useState({
    complainant_name: "",
    complainant_email: "",
    complainant_phone: "",
    company_name: "",
    complaint_type: "",
    description: "",
    anonymous: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const complaintTypes = [
    "Wage & Payment Issues",
    "Workplace Safety",
    "Discrimination",
    "Unfair Dismissal",
    "Working Hours",
    "Child Labour",
    "Sexual Harassment",
    "Union Rights",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitted(true)
      setFormData({
        complainant_name: "",
        complainant_email: "",
        complainant_phone: "",
        company_name: "",
        complaint_type: "",
        description: "",
        anonymous: false,
      })
    } catch (error) {
      console.error("Error submitting complaint:", error)
      alert("Failed to submit complaint. Please try again or contact us directly at 0800 600 400.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h3 className="text-2xl font-bold text-green-600 mb-4">Complaint Submitted Successfully</h3>
          <p className="text-gray-600 mb-6">
            Thank you for reporting this issue. Your complaint has been received and will be investigated. You will
            receive updates on the progress of your case.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Reference Number: <strong>LC-{Date.now().toString().slice(-6)}</strong>
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> This is a demo version. In production, complaints would be stored in the database
              and you would receive email confirmations. For real complaints, please call 0800 600 400.
            </p>
          </div>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Submit Another Complaint
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-[#231f20]">Complaint Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Demo Notice */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> This form is for demonstration purposes. Real complaints should be submitted
              by calling 0800 600 400 or visiting our offices.
            </p>
          </div>

          {/* Anonymous Option */}
          <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Checkbox
              id="anonymous"
              checked={formData.anonymous}
              onCheckedChange={(checked) => setFormData({ ...formData, anonymous: checked as boolean })}
            />
            <label htmlFor="anonymous" className="text-sm font-medium">
              Submit this complaint anonymously
            </label>
          </div>

          {/* Personal Information */}
          {!formData.anonymous && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#231f20]">Your Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name *</label>
                  <Input
                    value={formData.complainant_name}
                    onChange={(e) => setFormData({ ...formData, complainant_name: e.target.value })}
                    placeholder="Enter your full name"
                    required={!formData.anonymous}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.complainant_email}
                    onChange={(e) => setFormData({ ...formData, complainant_email: e.target.value })}
                    placeholder="Enter your email"
                    required={!formData.anonymous}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  value={formData.complainant_phone}
                  onChange={(e) => setFormData({ ...formData, complainant_phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          )}

          {/* Complaint Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#231f20]">Complaint Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Company/Organization Name</label>
                <Input
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Type of Complaint *</label>
                <Select
                  value={formData.complaint_type}
                  onValueChange={(value) => setFormData({ ...formData, complaint_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent>
                    {complaintTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Detailed Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Please provide a detailed description of the issue, including dates, times, witnesses, and any other relevant information..."
                rows={6}
                required
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#231f20]">Supporting Documents (Optional)</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">
                Upload any supporting documents (contracts, emails, photos, etc.)
              </p>
              <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
              <Button type="button" variant="outline" className="mt-4">
                Choose Files
              </Button>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Privacy & Confidentiality</h4>
            <p className="text-sm text-blue-700">
              Your complaint will be handled confidentially. Information will only be shared with authorized personnel
              involved in the investigation. We are committed to protecting your privacy and preventing any form of
              retaliation.
            </p>
          </div>

          <Button type="submit" className="w-full bg-[#dd2a1b] hover:bg-[#c02419]" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Complaint
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
