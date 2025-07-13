"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Building, 
  FileText, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react"
import { useState } from "react"

const verificationTypes = [
  { id: "employment_agency", name: "Employment Agency License", description: "Verify employment agency licenses" },
  { id: "business_registration", name: "Business Registration", description: "Check business registration status" },
  { id: "workplace_registration", name: "Workplace Registration", description: "Verify workplace registrations" },
  { id: "safety_certificate", name: "Safety Certificate", description: "Check workplace safety certificates" },
]

const sampleResults = {
  valid: {
    licenseNumber: "EA-2024-001234",
    businessName: "Ghana Talent Solutions Ltd",
    type: "Employment Agency",
    status: "Active",
    issuedDate: "2024-01-15",
    expiryDate: "2025-01-15",
    address: "123 High Street, Accra, Greater Accra",
    phone: "+233 20 123 4567",
    email: "info@ghanatalent.com",
    verified: true,
  },
  expired: {
    licenseNumber: "EA-2023-007890",
    businessName: "Outdated Recruitment Agency",
    type: "Employment Agency",
    status: "Expired",
    issuedDate: "2023-01-15",
    expiryDate: "2024-01-15",
    address: "456 Old Road, Kumasi, Ashanti",
    phone: "+233 24 987 6543",
    email: "contact@outdated.com",
    verified: false,
  },
  invalid: {
    licenseNumber: "INVALID-123",
    businessName: "Unknown Business",
    type: "Not Found",
    status: "Invalid",
    issuedDate: "N/A",
    expiryDate: "N/A",
    address: "N/A",
    phone: "N/A",
    email: "N/A",
    verified: false,
  },
}

export default function VerifyPage() {
  const [searchType, setSearchType] = useState("employment_agency")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!licenseNumber.trim()) return

    setIsSearching(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate different results based on input
    let result
    if (licenseNumber.includes("001234")) {
      result = sampleResults.valid
    } else if (licenseNumber.includes("007890")) {
      result = sampleResults.expired
    } else {
      result = sampleResults.invalid
    }

    setSearchResult(result)
    setIsSearching(false)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">License Verification</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Verify Business Licenses</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Check the validity of employment agency licenses, business registrations, and workplace certificates. 
              Ensure you're working with legitimate and compliant organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-[#dd2a1b]" />
                  <CardTitle className="text-2xl">License Verification</CardTitle>
                </div>
                <CardDescription>
                  Enter the license number or business registration number to verify its validity and current status.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Verification Type</label>
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {verificationTypes.map((type) => (
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
                  <label className="text-sm font-medium mb-2 block">License/Registration Number</label>
                  <Input
                    type="text"
                    placeholder="Enter license number (e.g., EA-2024-001234)"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-500">
                    Example formats: EA-2024-001234 (Employment Agency), BR-2024-005678 (Business Registration)
                  </p>
                </div>

                <Button 
                  onClick={handleSearch}
                  disabled={!licenseNumber.trim() || isSearching}
                  className="w-full bg-[#dd2a1b] hover:bg-[#c02419]"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Verify License
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchResult && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {searchResult.verified ? (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      ) : searchResult.status === "Expired" ? (
                        <AlertTriangle className="h-8 w-8 text-yellow-600" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-600" />
                      )}
                      <div>
                        <CardTitle className="text-xl">Verification Result</CardTitle>
                        <CardDescription>License number: {licenseNumber}</CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={searchResult.verified ? "default" : "destructive"}
                      className={searchResult.status === "Expired" ? "bg-yellow-100 text-yellow-800" : ""}
                    >
                      {searchResult.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Business Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Business Name:</span>
                            <span className="font-medium">{searchResult.businessName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">License Type:</span>
                            <span className="font-medium">{searchResult.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">License Number:</span>
                            <span className="font-medium">{searchResult.licenseNumber}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Validity Period</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Issued Date:</span>
                            <span className="font-medium">{searchResult.issuedDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Expiry Date:</span>
                            <span className="font-medium">{searchResult.expiryDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{searchResult.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span>{searchResult.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{searchResult.email}</span>
                          </div>
                        </div>
                      </div>

                      {searchResult.status === "Expired" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <span className="font-medium text-yellow-800">License Expired</span>
                          </div>
                          <p className="text-sm text-yellow-700">
                            This license has expired. Please contact the business to verify their current status.
                          </p>
                        </div>
                      )}

                      {!searchResult.verified && searchResult.status === "Invalid" && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span className="font-medium text-red-800">Invalid License</span>
                          </div>
                          <p className="text-sm text-red-700">
                            This license number was not found in our database. Please verify the number and try again.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="outline" className="border-[#dd2a1b] text-[#dd2a1b] hover:bg-[#dd2a1b] hover:text-white">
                        <FileText className="mr-2 h-4 w-4" />
                        Download Certificate
                      </Button>
                      <Button variant="outline" className="border-[#2b3990] text-[#2b3990] hover:bg-[#2b3990] hover:text-white">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Report Issue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Why Verify Licenses?</h2>
            <p className="text-lg text-gray-600">Protect yourself and ensure compliance with labour regulations</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Protect Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ensure you're working with legitimate employment agencies that comply with labour laws and protect worker rights.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Building className="h-12 w-12 text-[#2b3990] mx-auto mb-4" />
                <CardTitle>Verify Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Check if businesses are properly registered and licensed to operate in Ghana's labour market.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Ensure Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Verify that organizations meet safety standards and regulatory requirements for workplace operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#2b3990] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with Verification?</h2>
            <p className="text-xl opacity-90 mb-8">
              Contact our verification team for assistance with license checks and compliance questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#dd2a1b] hover:bg-[#c02419]">
                <Phone className="mr-2 h-5 w-5" />
                Call Verification Team
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#2b3990]">
                <Mail className="mr-2 h-5 w-5" />
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
