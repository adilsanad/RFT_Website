"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/public/assets/vectors"
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
export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000) // 4 seconds interval

    return () => clearInterval(interval)
  }, [isPaused, testimonials.length])

  // Pause autoplay on user interaction
  const handleUserInteraction = (index: number) => {
    setIsPaused(true)
    setCurrentTestimonial(index)

    // Resume autoplay after 8 seconds of no interaction
    setTimeout(() => {
      setIsPaused(false)
    }, 8000)
  }


  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Create extended array for continuous scrolling effect
  const extendedTestimonials = [...testimonials.slice(-2), ...testimonials, ...testimonials.slice(0, 2)]

  return (
    <section className="col-span-full grid grid-cols-4 md:grid-cols-12 gap-8 md:gap-14 py-16 bg-primary-100 text-primary-900">
      <div className="col-span-full grid grid-cols-4 md:grid-cols-12 gap-16 md:gap-24">
        <div className="col-span-full md:col-span-10 md:col-start-2 flex flex-col gap-3 items-center">
          <h3 className="text-2xl tracking-tighter font-medium text-primary-600">Testimonials</h3>
          <h2 className="text-center">What our clients say</h2>
        </div>
        <div className="col-span-full md:col-span-8 md:col-start-3 min-h-[360px] md:min-h-[] flex flex-col gap-16 items-center justify-between mb-8">
          <div className="max-md:-space-y-8 -space-y-12 relative">
            <div className="max-md:px-8 h-[80px] md:h-[90px] flex -gap-2 -z-10">
              <svg viewBox="0 0 49 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5532 3.78733C21.1096 1.56149 23.1095 0 25.4039 0H44C46.7614 0 49 2.23858 49 5V43.5932C49 44.5132 48.7462 45.4154 48.2664 46.2004L22.9622 87.6072C22.054 89.0935 20.4377 90 18.6958 90H5.40388C2.15103 90 -0.235764 86.9431 0.553169 83.7873L20.5532 3.78733Z" fill="#BEFAD0" />
              </svg>
              <svg viewBox="0 0 49 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5532 3.78733C21.1096 1.56149 23.1095 0 25.4039 0H44C46.7614 0 49 2.23858 49 5V43.5932C49 44.5132 48.7462 45.4154 48.2664 46.2004L22.9622 87.6072C22.054 89.0935 20.4377 90 18.6958 90H5.40388C2.15103 90 -0.235764 86.9431 0.553169 83.7873L20.5532 3.78733Z" fill="#BEFAD0" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-x-2 font-manrope tracking-tight leading-snug text-[1.4rem] md:text-[2.2rem] text-center max-md:px-10"
              >
                {testimonials[currentTestimonial].text}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`author-${currentTestimonial}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: 0.1
              }}
              className="flex flex-col items-center"
            >
              <div className="font-medium text-[1.5rem] md:text-[2rem] text-primary-900/80">{testimonials[currentTestimonial].author}</div>
              <div className="text-xl md:text-2xl text-primary-900/60">{testimonials[currentTestimonial].company}</div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <div className="col-span-full md:col-span-8 md:col-start-3 flex items-center justify-center gap-12">

        {/* Author Images Carousel */}
        <div className="relative h-20 md:h-[100px] w-[28rem] overflow-x-clip flex justify-center items-center">
          {extendedTestimonials.map((testimonial, index) => {
            // Calculate original index in the testimonials array
            const originalIndex = index < 2
              ? testimonials.length - 2 + index
              : index >= testimonials.length + 2
                ? index - testimonials.length - 2
                : index - 2

            // Calculate position relative to current testimonial
            const relativePosition = index - (currentTestimonial + 2)
            const isCenter = relativePosition === 0
            const distance = Math.abs(relativePosition)
            const isVisible = distance <= 2

            // Opacity based on distance from center
            const opacity = isVisible ? (isCenter ? 1 : distance === 1 ? 0.7 : 0.4) : 0

            // Position offset with spacing
            const mobileSpacing = 72  // Spacing between images on mobile
            const desktopSpacing = 88 // Spacing between images on desktop
            const spacing = isMobile ? mobileSpacing : desktopSpacing
            const translateX = relativePosition * spacing

            // Vertical offset for center image
            const translateY = isCenter ? -24 : 0

            return (
              <motion.button
                key={index}
                onClick={() => handleUserInteraction(originalIndex)}
                className={`rounded-[10px] overflow-x-hidden absolute ${isCenter
                  ? 'w-16 h-16 md:w-[80px] md:h-[80px]'
                  : 'w-14 h-14 md:w-[64px] md:h-[64px]'
                  }`}
                animate={{
                  opacity,
                  x: translateX,
                  y: translateY,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                aria-label={`View testimonial from ${testimonial.author}`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover bg-gray-400"
                />
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}