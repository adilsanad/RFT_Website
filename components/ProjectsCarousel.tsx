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
    image: '/images/assets/projectimages/boeing.png',
    location: 'Hitech Defence and Aerospace Park, Devanahalli, Bengaluru, Karnataka',
    title: 'Boeing India Engg. & Research Centre',
    service: 'Automated Irrigation Systems',
    organization: 'Boeing India'
  },
  {
    id: '2',
    image: '/images/assets/projectimages/bial.png',
    location: 'Kempegowda International Airport, Bengaluru',
    title: 'Bengaluru Airport Forest Belt (T2)',
    service: 'Automated Irrigation Systems',
    organization: 'BIAL ltd.'
  },
  {
    id: '3',
    image: '/images/assets/projectimages/reliancejamnagar.png',
    location: 'Reliance Jamnagar Refinery, Motikhavdi, Jamnagar, Gujarat',
    title: 'Jamnagar Refinery',
    service: 'Automated Irrigation Systems',
    organization: 'Reliance Industries Ltd.'
  },
  {
    id: '4',
    image: '/images/assets/projectimages/intellion.png',
    location: 'Sector 72, Gurugram, Haryana',
    title: 'Intellion Park',
    service: 'Rainwater Harvesting & Treatment',
    organization: 'Tata Realty'
  },
  {
    id: '5',
    image: '/images/assets/projectimages/lucknowairport.png',
    location: 'Chaudhary Charan Singh International Airport, Lucknow, Uttar Pradesh',
    title: 'Lucknow Airport Terminal 3',
    service: 'Automated Irrigation Systems',
    organization: 'Adani Airports'
  },
  {
    id: '6',
    image: '/images/assets/projectimages/dsu.png',
    location: 'Dayananda Sagar University, Harohalli, Bengaluru, Karnataka',
    title: 'Dayananda Sagar University',
    service: 'Automated Irrigation Systems',
    organization: 'DSU'
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
    <section className="col-span-full grid grid-cols-12 pl-4 md:pl-24 gap-8 py-16 ">
      <div className="col-span-full flex flex-col gap-4 md:gap-12">
        <div className="flex items-center justify-between">
          <h2 className='pl-4'>
            Our Projects
          </h2>

          {/* Navigation Controls*/}
          <div className='flex flex-col gap-2'>

            <div className="flex gap-1 md:gap-2 pr-6 md:pr-24">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0 || isTransitioning}
                className="p-[14px] px-[18px] max-md:mb-4 md:p-[0.9rem] w-fit bg-primary-300 rounded-[45px_15px_15px_45px] flex items-center justify-center border-2 border-primary-900/30 hover:border-primary-900/50 md:hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:translate-y-0"
              >
                <Icon name="roundedArrow" className="fill-primary-900 rotate-180 w-[18px] md:w-5" />
              </button>
              <button
                onClick={goToNext}
                disabled={currentIndex >= maxIndex || isTransitioning}
                className="p-[14px] px-[18px] max-md:mb-4 md:p-[0.9rem] w-fit bg-primary-300 rounded-[15px_45px_45px_15px] flex items-center justify-center border-2 border-primary-900/30 hover:border-primary-900/50 md:hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:translate-y-0"
              >
                <Icon name="roundedArrow" className="fill-primary-900 w-[18px] md:w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="flex relative overflow-x-auto snap-x snap-start scrollbar-hide">
          <div
            className="flex transition-transform duration-300 ease-in-out  "
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="w-[260px] md:w-[480px] px-2 py-5 "
              >
                <div className="bg-primary-100 border-[3px] border-primary-900/15 hover:border-primary-900/50 rounded-[15px] md:rounded-[20px] overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
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
                  <div className="flex flex-col gap-3 bg-primary-300 px-3 md:px-8 py-5 md:py-6">
                    <Icon className="w-4 h-4 stroke-primary-700 fill-transparent " name='location' />
                    <span className="text-md md:text-lg font-medium text-primary-900/70 md:leading-6">
                      {project.location}
                    </span>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col gap-2 p-6 md:p-8 px-3">
                      <h5 className="font-semibold text-lg inline-block leading-tight text-primary-900/50">{project.organization}</h5>
                      <h3 className="">
                        {project.title}
                      </h3>
                    <span className="text-base md:text-lg tracking-tight font-medium text-black/60 leading-tight">{project.service}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

