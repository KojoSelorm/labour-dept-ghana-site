import type { Metadata } from "next"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Labour Department of Ghana",
  description:
    "Find answers to common questions about labour laws, employment regulations, and services offered by the Labour Department of Ghana.",
}

export default function FAQPage() {
  return (
    <div className="container py-12 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about labour laws, employment regulations, and services offered by the Labour
          Department.
        </p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Employment Rights & Regulations</CardTitle>
            <CardDescription>Common questions about employment laws and worker rights in Ghana</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are the minimum wage requirements in Ghana?</AccordionTrigger>
                <AccordionContent>
                  The National Daily Minimum Wage (NDMW) is reviewed annually by the National Tripartite Committee. As
                  of 2023, the minimum wage in Ghana is GH₵ 14.88 per day. Employers are legally required to pay at
                  least this amount to all workers. For the most current minimum wage information, please visit our{" "}
                  <Link href="/laws" className="text-primary underline">
                    Labour Laws
                  </Link>{" "}
                  page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What are the standard working hours in Ghana?</AccordionTrigger>
                <AccordionContent>
                  According to Ghana's Labour Act, 2003 (Act 651), the standard working hours are 8 hours per day and 40
                  hours per week. Any work beyond these hours is considered overtime and should be compensated at a rate
                  of at least 1.5 times the normal hourly rate. Workers are also entitled to at least 48 consecutive
                  hours of rest every 7 days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What leave entitlements do workers have?</AccordionTrigger>
                <AccordionContent>
                  Under Ghana's Labour Act, workers are entitled to:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Annual leave: At least 15 working days with full pay in a calendar year</li>
                    <li>Sick leave: At least 12 working days with full pay in a calendar year</li>
                    <li>Maternity leave: At least 12 weeks with full pay</li>
                    <li>Paternity leave: Varies by employer (not mandated by law)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complaints & Dispute Resolution</CardTitle>
            <CardDescription>How to file complaints and resolve workplace disputes</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I file a complaint against my employer?</AccordionTrigger>
                <AccordionContent>
                  To file a complaint against your employer, you can:
                  <ol className="list-decimal pl-6 mt-2 space-y-1">
                    <li>
                      Visit our{" "}
                      <Link href="/complaints" className="text-primary underline">
                        online complaints portal
                      </Link>
                    </li>
                    <li>Visit the nearest Labour Department office in person</li>
                    <li>
                      Download and complete the complaint form from our website and submit it via email or in person
                    </li>
                  </ol>
                  Your complaint will be assigned to a labour officer who will investigate and facilitate resolution.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What types of workplace disputes can the Labour Department help resolve?
                </AccordionTrigger>
                <AccordionContent>
                  The Labour Department can help resolve various workplace disputes including:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Unpaid wages or benefits</li>
                    <li>Unfair dismissal</li>
                    <li>Working conditions and safety concerns</li>
                    <li>Discrimination and harassment</li>
                    <li>Leave entitlements</li>
                    <li>Contract disputes</li>
                    <li>Collective bargaining issues</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How long does the complaint resolution process take?</AccordionTrigger>
                <AccordionContent>
                  The time to resolve a complaint varies depending on the complexity of the case, the cooperation of
                  parties involved, and current caseload. Simple cases may be resolved within 2-4 weeks, while more
                  complex disputes may take 2-3 months. The Labour Department strives to resolve all complaints
                  efficiently and fairly. You can check the status of your complaint through our online portal using
                  your case reference number.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services & Registration</CardTitle>
            <CardDescription>Information about services offered by the Labour Department</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I register my business with the Labour Department?</AccordionTrigger>
                <AccordionContent>
                  All employers are required to register with the Labour Department. To register:
                  <ol className="list-decimal pl-6 mt-2 space-y-1">
                    <li>Visit the nearest Labour Department office</li>
                    <li>Complete the Employer Registration Form</li>
                    <li>Submit the form along with your business registration documents</li>
                    <li>Pay the registration fee</li>
                  </ol>
                  Once registered, you will receive an Employer Registration Certificate which should be displayed at
                  your business premises. You can also start the registration process online through our
                  <Link href="/services" className="text-primary underline ml-1">
                    Services
                  </Link>{" "}
                  page.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What services does the Labour Department offer to job seekers?</AccordionTrigger>
                <AccordionContent>
                  The Labour Department offers several services to job seekers including:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Job matching and placement services</li>
                    <li>Career counseling and guidance</li>
                    <li>Skills assessment and development recommendations</li>
                    <li>Information on training opportunities</li>
                    <li>Access to job fairs and recruitment events</li>
                    <li>Assistance with resume preparation and interview skills</li>
                  </ul>
                  Visit our{" "}
                  <Link href="/resources" className="text-primary underline">
                    Resources
                  </Link>{" "}
                  page for more information.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How can I verify if a recruitment agency is licensed?</AccordionTrigger>
                <AccordionContent>
                  To verify if a recruitment agency is licensed by the Labour Department:
                  <ol className="list-decimal pl-6 mt-2 space-y-1">
                    <li>
                      Visit our{" "}
                      <Link href="/verify" className="text-primary underline">
                        Verification Portal
                      </Link>
                    </li>
                    <li>Enter the name or license number of the recruitment agency</li>
                    <li>Check the status and validity of their license</li>
                  </ol>
                  All legitimate recruitment agencies in Ghana must be licensed by the Labour Department. Working with
                  unlicensed agencies may expose you to fraud and exploitation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
        <p className="mb-6">If you couldn't find the answer to your question, please contact us directly.</p>
        <div className="flex justify-center gap-4">
          <Link href="/contact" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
            Contact Us
          </Link>
          <Link
            href="/resources"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md"
          >
            View Resources
          </Link>
        </div>
      </div>
    </div>
  )
}
