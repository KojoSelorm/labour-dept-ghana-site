import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, Scale, AlertTriangle, Shield, Users } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  {
    title: "Job Portal",
    description: "Search and apply for jobs",
    icon: Briefcase,
    href: "https://glmis.gov.gh",
    color: "text-[#dd2a1b]",
    external: true,
  },
  {
    title: "Complaint Submission",
    description: "Report labour issues",
    icon: FileText,
    href: "/complaints",
    color: "text-[#2b3990]",
    external: false,
  },
  {
    title: "Labour Laws",
    description: "Access legal resources",
    icon: Scale,
    href: "/laws",
    color: "text-[#dd2a1b]",
    external: false,
  },
  {
    title: "Labour Inspection",
    description: "Request workplace inspection",
    icon: AlertTriangle,
    href: "/inspection",
    color: "text-[#2b3990]",
    external: false,
  },
  {
    title: "Verify License",
    description: "Check business licenses",
    icon: Shield,
    href: "/verify",
    color: "text-[#dd2a1b]",
    external: false,
  },
  {
    title: "Training Programs",
    description: "Skills development",
    icon: Users,
    href: "/training",
    color: "text-[#2b3990]",
    external: false,
  },
]

export function QuickLinks() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-8 text-[#231f20]">Quick Access</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickLinks.map((link, index) => (
          <Link key={index} href={link.href} {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-2">
                <link.icon
                  className={`h-8 w-8 mx-auto mb-2 ${link.color} group-hover:scale-110 transition-transform`}
                />
                <CardTitle className="text-sm">{link.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-600 text-center">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
