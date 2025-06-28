"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      text: "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      author: "Client Name",
      company: "Company designation",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur. Pharetra molestie bibendum mauris pellentesque sit. Ut mauris mauris bibendum mauris.",
      author: "Another Client",
      company: "Another Company",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Testimonials</h2>
          <div className="flex space-x-2">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-green-100 rounded-2xl p-8">
            <blockquote className="text-lg text-gray-800 mb-6">"{testimonials[currentTestimonial].text}"</blockquote>
            <div>
              <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].author}</div>
              <div className="text-gray-600">{testimonials[currentTestimonial].company}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
