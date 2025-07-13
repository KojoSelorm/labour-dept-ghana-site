"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, FileText, Scale, Briefcase } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  excerpt: string
  type: "blog" | "law" | "service"
  url: string
}

// Static search results for demo
const staticSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "Labour Act, 2003 (Act 651)",
    excerpt: "The principal legislation governing employment relations in Ghana",
    type: "law",
    url: "/laws",
  },
  {
    id: "2",
    title: "Workplace Safety Standards",
    excerpt: "Essential safety protocols and regulations every workplace must implement",
    type: "blog",
    url: "/blog/2",
  },
  {
    id: "3",
    title: "Employer Services",
    excerpt: "Comprehensive services for businesses and employers",
    type: "service",
    url: "/services",
  },
  {
    id: "4",
    title: "Worker Rights Guide",
    excerpt: "Understanding your rights as a worker in Ghana",
    type: "blog",
    url: "/blog/5",
  },
  {
    id: "5",
    title: "Complaint Submission",
    excerpt: "Report labour issues and workplace violations",
    type: "service",
    url: "/complaints",
  },
]

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.length > 2) {
        performSearch()
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  const performSearch = async () => {
    setIsSearching(true)

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter static results based on query
    const filteredResults = staticSearchResults.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(query.toLowerCase()),
    )

    setResults(filteredResults)
    setShowResults(true)
    setIsSearching(false)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "blog":
        return <FileText className="h-4 w-4" />
      case "law":
        return <Scale className="h-4 w-4" />
      case "service":
        return <Briefcase className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search laws, services, news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4"
          onFocus={() => query.length > 2 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
      </div>

      {showResults && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {results.map((result) => (
                <Link key={result.id} href={result.url}>
                  <div className="p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="text-[#dd2a1b] mt-1">{getIcon(result.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{result.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{result.excerpt}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {showResults && results.length === 0 && query.length > 2 && !isSearching && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
          <CardContent className="p-4 text-center text-gray-500">No results found for "{query}"</CardContent>
        </Card>
      )}
    </div>
  )
}
