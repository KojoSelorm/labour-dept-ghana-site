"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your message. We will respond within 24 hours.")
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      subject: "",
      message: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Full Name *</label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Email Address *</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Phone Number</label>
          <Input
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Category *</label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select inquiry type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="complaint">Formal Complaint</SelectItem>
              <SelectItem value="job">Job Application</SelectItem>
              <SelectItem value="licensing">Licensing</SelectItem>
              <SelectItem value="training">Training Programs</SelectItem>
              <SelectItem value="inspection">Labour Inspection</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Subject *</label>
        <Input
          value={formData.subject}
          onChange={(e) => handleInputChange("subject", e.target.value)}
          placeholder="Brief description of your inquiry"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Message *</label>
        <Textarea
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Provide detailed information about your inquiry"
          rows={5}
          required
        />
      </div>

      <Button type="submit" className="w-full bg-[#dd2a1b] hover:bg-[#c02419]">
        <Send className="h-4 w-4 mr-2" />
        Send Message
      </Button>
    </form>
  )
}
