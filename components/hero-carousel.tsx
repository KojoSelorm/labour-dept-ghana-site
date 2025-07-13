"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const announcements = [
  {
    id: 1,
    title: "New Labour Law Amendments 2024",
    description: "Important updates to the Labour Act affecting all employers and workers",
    type: "Law Update",
    date: "Dec 15, 2024",
  },
  {
    id: 2,
    title: "Youth Skills Training Program Launch",
    description: "Registration now open for comprehensive skills development initiative",
    type: "Training",
    date: "Dec 10, 2024",
  },
  {
    id: 3,
    title: "Public Employment Campaign 2024",
    description: "Connecting job seekers with opportunities across Ghana",
    type: "Employment",
    date: "Dec 5, 2024",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length)
  }

  return (
    <div className="relative">
      <Card className="bg-white/10 border-white/20 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Badge className="bg-white/20 text-white border-white/30">{announcements[currentSlide].type}</Badge>
            <span className="text-sm opacity-75">{announcements[currentSlide].date}</span>
          </div>
          <h3 className="text-xl font-bold mb-3">{announcements[currentSlide].title}</h3>
          <p className="opacity-90">{announcements[currentSlide].description}</p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-4">
        <Button variant="ghost" size="sm" onClick={prevSlide} className="text-white hover:bg-white/20">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex space-x-2">
          {announcements.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <Button variant="ghost" size="sm" onClick={nextSlide} className="text-white hover:bg-white/20">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
