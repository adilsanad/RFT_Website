"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import Icon from '@/public/assets/vectors'

interface Project {
  id: string
  image: string
  location: string
  title: string
  service: string
  organization: string
}

interface ProjectsCarouselProps {
  projects?: Project[];
}

const sampleProjects: Project[] = [
    {
        id: '1',
        image: '/images/projects/dsu-campus.jpg',
        location: 'Dayananda Sagar University, Harohalli, Bengaluru',
        title: 'Dayananda Sagar University',
        service: 'Automated Irrigation Systems',
        organization: 'DSU'
    },
    {
        id: '2',
        image: '/images/projects/tech-park.jpg',
        location: 'Electronic City, Bengaluru',
        title: 'Tech Park Water Management',
        service: 'Rainwater Harvesting & Treatment',
        organization: 'Infosys Limited'
    },
    {
        id: '3',
        image: '/images/projects/residential.jpg',
        location: 'Whitefield, Bengaluru',
        title: 'Luxury Residential Complex',
        service: 'Complete Water Management Solution',
        organization: 'Prestige Group'
    },
    {
        id: '4',
        image: '/images/projects/hospital.jpg',
        location: 'Koramangala, Bengaluru',
        title: 'Multi-Specialty Hospital',
        service: 'Water Purification & Storage',
        organization: 'Manipal Hospitals'
    },
    {
        id: '5',
        image: '/images/projects/factory.jpg',
        location: 'Tumkur Industrial Area',
        title: 'Manufacturing Plant',
        service: 'Industrial Water Treatment',
        organization: 'Toyota Kirloskar'
    }
]

export default function ProjectsCarousel({ projects = sampleProjects }: ProjectsCarouselProps) {
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


  const translateX = -(currentIndex * 480) // Move by one card width (100% / 3 cards)

  return (
    <section className="col-span-full grid grid-cols-12 pl-24 gap-8 py-16">
      <div className="col-span-full flex flex-col gap-12">
        <div className="flex items-center justify-between">
            <h2 >
              Our Projects
            </h2>
          
          {/* Navigation Controls*/}
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
        <div className="flex relative overflow-x-auto snap-x snap-start no-scrollbar">

          {/* Desktop Carousel */}
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="w-[480px] px-3 py-5"
              >
                <div className="bg-white border-2 border-primary-900/40 hover:border-primary-900 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
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
                  <div className="bg-primary-300 px-8 py-6">
                    <div className="flex flex-col gap-2">
                      <Icon className="w-4 h-4 stroke-primary-700 fill-transparent " name='location'/>
                      <span className="text-xl font-medium text-primary-900">
                        {project.location}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col gap-3 p-10 px-8">
                    <h3 className="">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 gap-y-0 items-center">
                        <span className="text-base text-gray-900">{project.service}</span>
                        <div className='flex w-1 h-1 rounded-full bg-black'/>
                        <h5 className="font-bold">{project.organization}</h5>
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

