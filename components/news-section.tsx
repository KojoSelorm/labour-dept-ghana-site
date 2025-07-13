import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

const newsItems = [
  {
    id: 1,
    title: "Labour Department Launches Digital Transformation Initiative",
    excerpt: "New online services to streamline labour administration and improve service delivery across Ghana.",
    category: "Technology",
    date: "December 15, 2024",
    readTime: "3 min read",
  },
  {
    id: 2,
    title: "Child Labour Monitoring Program Shows Significant Progress",
    excerpt: "Latest statistics reveal a 25% reduction in child labour cases following intensive monitoring efforts.",
    category: "Child Labour",
    date: "December 12, 2024",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "New Workplace Safety Regulations Take Effect",
    excerpt: "Enhanced safety standards now mandatory for all registered workplaces to protect worker welfare.",
    category: "Safety",
    date: "December 10, 2024",
    readTime: "4 min read",
  },
]

export function NewsSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {newsItems.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge variant="secondary" className="text-xs">
                {item.category}
              </Badge>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {item.date}
              </div>
            </div>
            <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
            <CardDescription>{item.excerpt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{item.readTime}</span>
              <Link
                href={`/news/${item.id}`}
                className="text-[#dd2a1b] hover:text-[#c02419] flex items-center text-sm font-medium"
              >
                Read More <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
