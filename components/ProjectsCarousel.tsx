"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

interface Project {
  id: string
  image: string
  location: string
  title: string
  service: string
  organization: string
}

interface ProjectsCarouselProps {
  projects: Project[]
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const maxIndex = Math.max(0, projects.length - 1)

  const goToNext = () => {
    if (isTransitioning || currentIndex >= maxIndex) return
    setIsTransitioning(true)
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const goToPrev = () => {
    if (isTransitioning || currentIndex <= 0) return
    setIsTransitioning(true)
    setCurrentIndex(prev => Math.max(prev - 1, 0))
    setTimeout(() => setIsTransitioning(false), 300)
  }


  const translateX = -(currentIndex * 33.333) // Move by one card width (100% / 3 cards)

  return (
    <section className="col-span-full grid grid-cols-12 pl-24 gap-8 py-16">
      <div className="col-span-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 >
              Our Projects
            </h2>
          </div>
          
          {/* Navigation Controls - Only show on mobile */}
          <div className="flex gap-2 pr-24">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0 || isTransitioning}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary-600 hover:bg-primary-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex >= maxIndex || isTransitioning}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary-600 hover:bg-primary-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Mobile Carousel */}
          <div 
            ref={carouselRef}
            className="flex transition-transform duration-300 ease-in-out md:hidden"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-full px-3"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Location Strip */}
                  <div className="bg-primary-200 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-700 flex-shrink-0" />
                      <span className="text-sm font-medium text-primary-800 truncate">
                        {project.location}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-neulisneue font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-600 font-medium">Service Rendered</span>
                        <span className="text-base text-gray-900">{project.service}</span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-600 font-medium">Organization</span>
                        <span className="text-base text-primary-700 font-semibold">{project.organization}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Carousel */}
          <div 
            className="hidden md:flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 320}px)` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-96 px-3"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Location Strip */}
                  <div className="bg-primary-200 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-700 flex-shrink-0" />
                      <span className="text-sm font-medium text-primary-800 truncate">
                        {project.location}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-neulisneue font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-600 font-medium">Service Rendered</span>
                        <span className="text-base text-gray-900">{project.service}</span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-600 font-medium">Organization</span>
                        <span className="text-base text-primary-700 font-semibold">{project.organization}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicators - Only show on mobile */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => !isTransitioning && setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-primary-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

