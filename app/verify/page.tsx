"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Shield, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface LicenseResult {
  licenseNumber: string
  companyName: string
  licenseType: string
  status: "valid" | "expired" | "suspended" | "revoked"
  issueDate: string
  expiryDate: string
  address: string
  contactPerson: string
}

export default function VerifyPage() {
  const [licenseNumber, setLicenseNumber] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<LicenseResult | null>(null)
  const [error, setError] = useState("")

  // Mock data for demonstration
  const mockLicenses: Record<string, LicenseResult> = {
    EMP001234: {
      licenseNumber: "EMP001234",
      companyName: "Ghana Employment Services Ltd",
      licenseType: "Employment Agency License",
      status: "valid",
      issueDate: "2023-01-15",
      expiryDate: "2025-01-14",
      address: "123 Independence Avenue, Accra",
      contactPerson: "John Mensah",
    },
    EMP005678: {
      licenseNumber: "EMP005678",
      companyName: "Kumasi Recruitment Agency",
      licenseType: "Private Employment Agency",
      status: "expired",
      issueDate: "2021-06-01",
      expiryDate: "2023-05-31",
      address: "45 Prempeh II Street, Kumasi",
      contactPerson: "Mary Asante",
    },
    EMP009876: {
      licenseNumber: "EMP009876",
      companyName: "Northern Jobs Connect",
      licenseType: "Employment Agency License",
      status: "suspended",
      issueDate: "2022-03-10",
      expiryDate: "2024-03-09",
      address: "78 Hospital Road, Tamale",
      contactPerson: "Ibrahim Yakubu",
    },
  }

  const handleSearch = async () => {
    if (!licenseNumber.trim()) {
      setError("Please enter a license number")
      return
    }

    setIsSearching(true)
    setError("")
    setResult(null)

    // Simulate API call
    setTimeout(() => {
      const foundLicense = mockLicenses[licenseNumber.toUpperCase()]

      if (foundLicense) {
        setResult(foundLicense)
      } else {
        setError("License number not found. Please check the number and try again.")
      }

      setIsSearching(false)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-orange-100 text-orange-800"
      case "revoked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "expired":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "suspended":
        return <XCircle className="h-5 w-5 text-orange-600" />
      case "revoked":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b3990] to-[#dd2a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">License Verification</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Verify Business License</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Verify the authenticity and status of employment agency licenses issued by the Ghana Labour Department.
              Protect yourself by ensuring you work with licensed and legitimate employment agencies.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle className="text-2xl">License Verification System</CardTitle>
                <CardDescription>
                  Enter the license number to verify the status of an employment agency license
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter license number (e.g., EMP001234)"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button onClick={handleSearch} disabled={isSearching} className="bg-[#dd2a1b] hover:bg-[#c02419]">
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Search className="h-4 w-4 mr-2" />
                    )}
                    {isSearching ? "Searching..." : "Verify"}
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {result && (
                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">License Verification Result</CardTitle>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(result.status)}
                          <Badge className={getStatusColor(result.status)}>{result.status.toUpperCase()}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">License Number</label>
                          <p className="font-semibold">{result.licenseNumber}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">License Type</label>
                          <p className="font-semibold">{result.licenseType}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Company Name</label>
                          <p className="font-semibold">{result.companyName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Contact Person</label>
                          <p className="font-semibold">{result.contactPerson}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Issue Date</label>
                          <p className="font-semibold">{new Date(result.issueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Expiry Date</label>
                          <p className="font-semibold">{new Date(result.expiryDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Registered Address</label>
                        <p className="font-semibold">{result.address}</p>
                      </div>

                      {result.status === "expired" && (
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            This license has expired. The company should renew their license to continue operations.
                          </AlertDescription>
                        </Alert>
                      )}

                      {result.status === "suspended" && (
                        <Alert variant="destructive">
                          <XCircle className="h-4 w-4" />
                          <AlertDescription>
                            This license is currently suspended. The company is not authorized to operate until the
                            suspension is lifted.
                          </AlertDescription>
                        </Alert>
                      )}

                      {result.status === "revoked" && (
                        <Alert variant="destructive">
                          <XCircle className="h-4 w-4" />
                          <AlertDescription>
                            This license has been revoked. The company is permanently prohibited from operating as an
                            employment agency.
                          </AlertDescription>
                        </Alert>
                      )}

                      {result.status === "valid" && (
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            This license is valid and the company is authorized to operate as an employment agency.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#231f20]">Why Verify Licenses?</h2>
            <p className="text-lg text-gray-600">Protect yourself from fraudulent employment agencies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Legal Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Licensed agencies are legally bound to follow employment regulations and protect your rights as a job
                  seeker.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CheckCircle className="h-12 w-12 text-[#2b3990] mx-auto mb-4" />
                <CardTitle>Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Licensed agencies meet professional standards and are regularly monitored by the Labour Department.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <AlertTriangle className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
                <CardTitle>Fraud Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Verification helps you avoid scams and fraudulent agencies that may exploit job seekers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample License Numbers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Sample License Numbers for Testing</CardTitle>
                <CardDescription>Use these sample license numbers to test the verification system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Valid License</h4>
                    <p className="text-sm text-green-700 mb-2">EMP001234</p>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">Expired License</h4>
                    <p className="text-sm text-yellow-700 mb-2">EMP005678</p>
                    <Badge className="bg-yellow-100 text-yellow-800">Expired</Badge>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">Suspended License</h4>
                    <p className="text-sm text-orange-700 mb-2">EMP009876</p>
                    <Badge className="bg-orange-100 text-orange-800">Suspended</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#2b3990] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with License Verification?</h2>
            <p className="text-xl opacity-90 mb-8">
              Contact our licensing department for assistance with verification or to report suspicious agencies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#dd2a1b] hover:bg-[#c02419]">
                Contact Licensing Department
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#2b3990]"
              >
                Report Fraudulent Agency
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
