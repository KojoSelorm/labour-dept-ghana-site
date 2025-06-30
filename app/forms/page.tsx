import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Forms & Applications - Labour Department of Ghana",
  description: "Access and download official forms and applications from the Labour Department of Ghana.",
}

export default function FormsPage() {
  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Forms & Applications</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access and download official forms and applications required for various services offered by the Labour
          Department of Ghana.
        </p>
      </div>

      <div className="flex items-center mb-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search forms by name or keyword..." className="pl-10" />
      </div>

      <Tabs defaultValue="employer" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="employer">Employer Forms</TabsTrigger>
          <TabsTrigger value="employee">Employee Forms</TabsTrigger>
          <TabsTrigger value="inspection">Inspection Forms</TabsTrigger>
          <TabsTrigger value="compensation">Compensation Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="employer">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Employer Registration Form
                </CardTitle>
                <CardDescription>Form for registering a business with the Labour Department</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  All employers in Ghana are required to register with the Labour Department using this form. The
                  registration provides important information about your business for regulatory and statistical
                  purposes.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge>Required</Badge>
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Jan 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Required Documents:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Business Registration Certificate</li>
                    <li>Tax Identification Number (TIN)</li>
                    <li>Company Profile</li>
                    <li>Proof of Address</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Annual Return Form
                </CardTitle>
                <CardDescription>Form for submitting annual employment data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Employers are required to submit this form annually to provide updated information about their
                  workforce, including number of employees, wages, working hours, and other employment data.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge>Required</Badge>
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Mar 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Submission Deadline:</p>
                  <p>Must be submitted by March 31st each year for the previous calendar year.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Workplace Accident Report Form
                </CardTitle>
                <CardDescription>Form for reporting workplace accidents and injuries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Employers must use this form to report any workplace accident resulting in injury, fatality, or
                  significant property damage to the Labour Department.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge>Required</Badge>
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Feb 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Submission Timeline:</p>
                  <p>
                    Must be submitted within 24 hours of a serious accident or fatality, and within 7 days for other
                    reportable incidents.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Labour Compliance Certificate Application
                </CardTitle>
                <CardDescription>Form to apply for a Labour Compliance Certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Employers can apply for a Labour Compliance Certificate to demonstrate their compliance with Ghana's
                  labour laws and regulations.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="secondary">Optional</Badge>
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Apr 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Required Documents:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Proof of SSNIT Contributions</li>
                    <li>Health and Safety Policy</li>
                    <li>Employee Contracts (samples)</li>
                    <li>Proof of Workmen's Compensation Insurance</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employee">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Labour Complaint Form
                </CardTitle>
                <CardDescription>Form for filing complaints about labour violations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Employees can use this form to file complaints regarding labour law violations, including unpaid
                  wages, unfair dismissal, discrimination, or unsafe working conditions.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: May 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Supporting Documents:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Employment Contract (if available)</li>
                    <li>Pay Slips (if relevant to complaint)</li>
                    <li>Termination Letter (for unfair dismissal claims)</li>
                    <li>Any evidence supporting the complaint</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Employment Verification Request
                </CardTitle>
                <CardDescription>Form to request verification of employment terms</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Employees can use this form to request the Labour Department to verify their employment terms and
                  conditions comply with labour laws.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Feb 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Required Documents:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Employment Contract</li>
                    <li>Recent Pay Slips (at least 3 months)</li>
                    <li>Job Description</li>
                    <li>National ID or Passport</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Mediation Request Form
                </CardTitle>
                <CardDescription>Form to request mediation for workplace disputes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  This form can be used by employees or employers to request mediation services from the Labour
                  Department to resolve workplace disputes.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Mar 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Process:</p>
                  <p>
                    After submission, both parties will be contacted to schedule a mediation session with a trained
                    mediator from the Labour Department.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Unfair Dismissal Claim Form
                </CardTitle>
                <CardDescription>Form for filing unfair dismissal claims</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Employees who believe they have been unfairly dismissed can use this form to file a formal claim with
                  the Labour Department.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Apr 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Time Limit:</p>
                  <p>Claims must be filed within 3 months of the date of dismissal.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inspection">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Workplace Inspection Request
                </CardTitle>
                <CardDescription>Form to request a workplace inspection</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Employers can use this form to request a voluntary inspection of their workplace to ensure compliance
                  with labour laws and safety regulations.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="secondary">Optional</Badge>
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Feb 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Process:</p>
                  <p>
                    After submission, an inspector will contact you to schedule the inspection. A report will be
                    provided after the inspection with recommendations for improvement if needed.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Safety Hazard Report Form
                </CardTitle>
                <CardDescription>Form for reporting workplace safety hazards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  This form can be used by employees or the public to report safety hazards or unsafe working conditions
                  to the Labour Department.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Mar 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Confidentiality:</p>
                  <p>
                    Reports can be submitted anonymously if desired. The identity of the reporter will be kept
                    confidential if requested.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Inspection Follow-up Report
                </CardTitle>
                <CardDescription>Form for reporting compliance with inspection findings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Employers must use this form to report on actions taken to address issues identified during a Labour
                  Department inspection.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge>Required</Badge>
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Jan 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Submission Timeline:</p>
                  <p>
                    Must be submitted by the deadline specified in the inspection report, typically 30-90 days after the
                    inspection.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Child Labour Complaint Form
                </CardTitle>
                <CardDescription>Form for reporting suspected child labour violations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  This form can be used by anyone to report suspected child labour violations to the Labour Department
                  for investigation.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: May 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Confidentiality:</p>
                  <p>
                    Reports can be submitted anonymously. All reports are treated with strict confidentiality to protect
                    both the reporter and the children involved.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compensation">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Workmen's Compensation Claim Form
                </CardTitle>
                <CardDescription>Form for filing workmen's compensation claims</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Employees who have suffered work-related injuries or illnesses can use this form to file a claim for
                  compensation under the Workmen's Compensation Law.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Mar 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Required Documents:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Medical Reports</li>
                    <li>Accident Report (if applicable)</li>
                    <li>Employment Contract</li>
                    <li>Recent Pay Slips</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Employer's Accident Report
                </CardTitle>
                <CardDescription>Form for employers to report workplace accidents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Employers must use this form to report workplace accidents that may lead to workmen's compensation
                  claims.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge>Required</Badge>
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Feb 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Submission Timeline:</p>
                  <p>Must be submitted within 7 days of the accident.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Medical Assessment Form
                </CardTitle>
                <CardDescription>Form for medical assessment of work-related injuries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  This form must be completed by a medical practitioner to assess the nature and extent of work-related
                  injuries for compensation purposes.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge>Required</Badge>
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Apr 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Note:</p>
                  <p>
                    Must be completed by a registered medical practitioner. The form includes sections for diagnosis,
                    treatment, prognosis, and assessment of disability.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Compensation Appeal Form
                </CardTitle>
                <CardDescription>Form for appealing workmen's compensation decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  This form can be used by employees or employers to appeal decisions made regarding workmen's
                  compensation claims.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline">PDF Format</Badge>
                  <Badge variant="outline">Last Updated: Jan 2023</Badge>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Time Limit:</p>
                  <p>Appeals must be filed within 30 days of receiving the decision.</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  View Instructions
                </Button>
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" /> Download Form
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Need Assistance?</h2>
        <p className="mb-6">
          If you need help completing any forms or have questions about the application process, please contact our
          Forms Assistance Unit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button>Contact Forms Assistance</Button>
          <Button variant="outline">View Form Submission Guidelines</Button>
        </div>
      </div>
    </div>
  )
}
