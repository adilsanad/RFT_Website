"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Trigger animation when testimonial changes
  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [currentTestimonial])

  const testimonials = [
    {
      text: "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      author: "Client Name",
      company: "Company, designation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur. Pharetra molestie bibendum mauris pellentesque sit. Ut mauris mauris bibendum mauris.",
      author: "Another Client",
      company: "Another Company",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5cc?w=150&h=150&fit=crop&crop=face"
    },
    {
      text: "Exceptional service and outstanding results. The team exceeded our expectations in every way possible.",
      author: "Third Client",
      company: "Third Company",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      text: "Professional, reliable, and innovative. Working with this team has been a game-changer for our business.",
      author: "Fourth Client",
      company: "Fourth Company",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      text: "The quality of work and attention to detail is simply remarkable. Highly recommend their services.",
      author: "Fifth Client",
      company: "Fifth Company",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="col-span-full grid grid-cols-12 gap-24 py-16 bg-primary-100 text-primary-900">
      <div className="col-span-10 col-start-2 flex flex-col gap-3 items-center">
        <h3 className="text-2xl tracking-tighter font-medium text-primary-600">Testimonials</h3>
        <h2 className="text-6xl tracking-tighter font-medium text-black">What our clients say</h2>
      </div>
      <div className="col-span-8 col-start-3 flex flex-col gap-16 items-center justify-between mb-8">
        <div
          className={`relative flex space-x-2 tracking-normal leading-[2.8rem] text-[2.2rem] text-center transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
        >
          <div className=" absolute -left-8 -top-16 flex -gap-2 -z-10">
            <svg width="49" height="90" viewBox="0 0 49 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.5532 3.78733C21.1096 1.56149 23.1095 0 25.4039 0H44C46.7614 0 49 2.23858 49 5V43.5932C49 44.5132 48.7462 45.4154 48.2664 46.2004L22.9622 87.6072C22.054 89.0935 20.4377 90 18.6958 90H5.40388C2.15103 90 -0.235764 86.9431 0.553169 83.7873L20.5532 3.78733Z" fill="#BEFAD0" />
            </svg>
            <svg width="49" height="90" viewBox="0 0 49 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.5532 3.78733C21.1096 1.56149 23.1095 0 25.4039 0H44C46.7614 0 49 2.23858 49 5V43.5932C49 44.5132 48.7462 45.4154 48.2664 46.2004L22.9622 87.6072C22.054 89.0935 20.4377 90 18.6958 90H5.40388C2.15103 90 -0.235764 86.9431 0.553169 83.7873L20.5532 3.78733Z" fill="#BEFAD0" />
            </svg>
          </div>
          {testimonials[currentTestimonial].text}
        </div>
        <div
          className={`flex flex-col items-center transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          style={{ transitionDelay: '100ms' }}
        >
          <div className="font-medium text-[2rem] text-primary-900/80">{testimonials[currentTestimonial].author}</div>
          <div className="text-2xl text-primary-900/60">{testimonials[currentTestimonial].company}</div>
        </div>
      </div>

      <div className="col-span-8 col-start-3 flex items-center justify-center gap-4">
        {/* Previous Button */}
        <button
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-primary-700" />
        </button>

        {/* Author Images Carousel */}
        <div className="relative h-20 w-80 flex justify-center items-end">
          {/* Create extended array with duplicates for smooth infinite scrolling */}
          {[...testimonials.slice(-2), ...testimonials, ...testimonials.slice(0, 2)].map((testimonial, index) => {
            // Calculate which testimonial this represents in the original array
            let originalIndex;
            if (index < 2) {
              originalIndex = testimonials.length - 2 + index; // Last 2 items
            } else if (index >= testimonials.length + 2) {
              originalIndex = index - testimonials.length - 2; // First 2 items
            } else {
              originalIndex = index - 2; // Main items
            }

            // Calculate position relative to current testimonial
            const relativePosition = index - (currentTestimonial + 2);
            const isCenter = relativePosition === 0;
            const distanceFromCenter = Math.abs(relativePosition);
            const isVisible = distanceFromCenter <= 2;
            const opacity = isVisible ? (isCenter ? 1 : distanceFromCenter === 1 ? 0.7 : 0.4) : 0;
            const size = isCenter ? 'w-16 h-16' : 'w-12 h-12';
            const translateX = relativePosition * 70;

            return (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(originalIndex)}
                className={`${size} rounded-lg overflow-hidden hover:scale-105 absolute transition-all duration-500 ease-in-out bottom-0`}
                style={{
                  opacity,
                  transform: `translateX(${translateX}px)`,
                  left: '50%',
                  marginLeft: isCenter ? '-32px' : '-24px',
                  marginBottom: isCenter ? '12px' : '0px',
                }}
                aria-label={`View testimonial from ${testimonial.author}`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover bg-gray-400"
                />
              </button>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 z-20"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-primary-700" />
        </button>
      </div>
    </section>
  )
}