"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Static testimonials data as fallback
const staticTestimonials = [
  {
    id: 1,
    name: "Kwame Asante",
    position: "Factory Worker",
    company: "Tema Industrial Area",
    content:
      "The Labour Department helped resolve my workplace dispute quickly and fairly. Their mediation services saved my job and improved working conditions for all employees.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: 2,
    name: "Akosua Mensah",
    position: "HR Manager",
    company: "Accra Manufacturing Ltd",
    content:
      "Their workplace inspection services helped us improve our safety standards significantly. The team was professional and provided clear guidance on compliance requirements.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: 3,
    name: "Ibrahim Yakubu",
    position: "Small Business Owner",
    company: "Northern Region",
    content:
      "The training programs provided by the Labour Department equipped my employees with valuable skills. Our productivity has increased by 40% since the training.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: 4,
    name: "Grace Osei",
    position: "Union Representative",
    company: "Ghana Trades Union Congress",
    content:
      "The Labour Department's support in union formation and worker rights education has been invaluable. They truly understand the needs of Ghanaian workers.",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState(staticTestimonials)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#231f20]">What People Say About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from workers, employers, and organizations who have benefited from our services
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center pb-4">
              <Quote className="h-12 w-12 text-[#dd2a1b] mx-auto mb-4" />
            </CardHeader>
            <CardContent className="text-center px-8 pb-8">
              <p className="text-lg text-gray-700 mb-6 italic">"{testimonials[currentIndex].content}"</p>

              <div className="flex items-center justify-center mb-4">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                  />
                  <AvatarFallback className="bg-[#2b3990] text-white">
                    {testimonials[currentIndex].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h4 className="font-semibold text-[#231f20]">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-gray-600">{testimonials[currentIndex].position}</p>
                  <p className="text-sm text-[#2b3990]">{testimonials[currentIndex].company}</p>
                </div>
              </div>

              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-[#dd2a1b]" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
