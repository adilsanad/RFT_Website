"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import Icon from "@/public/assets/vectors"
import Pools from "@/public/assets/images/rftpools.png"
import Irrigation from "@/public/assets/images/rftirrigation.png"
import Rwh from "@/public/assets/images/rftrwh.png"

export default function SolutionsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const solutions = [
    {
      title: "Irrigation Systems",
      description:
        "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      icon: <Icon name="rainwater" className="w-8 h-8" />,
      image: Irrigation,
      link: "/solutions/irrigation-systems",
    },
    {
      title: "Rainwater Harvesting",
      description:
        "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      icon: <Icon name="sprinkler" className="w-8 h-8" />,
      image: Rwh,
      link: "/solutions/rainwater-harvesting",
    },
    {
      title: "Pools & Water Features",
      description:
        "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      icon: <Icon name="pool" className="w-8 h-8" />,
      image: Pools,
      link: "/solutions/pools-water-features",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpandedIndex((prevIndex) => {
        if (prevIndex === null) return 0
        return prevIndex === solutions.length - 1 ? 0 : prevIndex + 1
      })
    }, 3500);

    return () => clearTimeout(timer)
  }, [expandedIndex, solutions.length])

  const handleCardClick = (index: number) => {
    const isOpen = expandedIndex === index
    setExpandedIndex(isOpen ? null : index)
  }

  const handleExploreClick = (e: React.MouseEvent, link: string) => {
    e.stopPropagation() // Prevent the card click event from firing
    window.location.href = link
  }

  const handleToggleClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation() // Prevent the card click event from firing
    const isOpen = expandedIndex === index
    setExpandedIndex(isOpen ? null : index)
  }

  return (
    <section className="col-span-full grid grid-cols-12 gap-16 py-16 mt-8 bg-primary-100" id="solutions">
      <div className="col-span-10 col-start-2">
        <h2>Solutions</h2>
      </div>

      <div className="col-span-full flex flex-col min-h-[740px] space-y-2 px-14"> {/* min-h is bc autoplay changes container height constantly*/}
        {solutions.map((solution, index) => {
          const isOpen = expandedIndex === index
          return (
            <div
              onClick={() => handleCardClick(index)}
              key={index}
              className={`relative flex gap-20 transition-all items-center justify-between duration-700 ease-out border-2 overflow-hidden  cursor-pointer 
                ${isOpen
                  ? "border-primary-900/40 bg-primary-200 rounded-[60px] pl-12"
                  : "border-primary-900/15 bg-white rounded-[30px] pl-10"
                }`}
            >
              <div className={`flex items-start gap-8 transition-all duration-700 ease-out ${isOpen ? "py-12 pt-16" : "p-0 py-8"}`}>
                <span className={`flex text-2xl transition-all duration-700 ease-out ${isOpen ? "text-primary-900" : "text-primary-900/60"}`}>
                  {solution.icon}
                </span>
                <div className={`flex flex-col transition-all duration-700 ease-out ${isOpen ? "gap-6" : "gap-0"}`}>
                  <h3 className={`font-neulisneue text-gray-900 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'text-4xl font-medium ' : 'text-3xl'}`}>
                    {solution.title}
                  </h3>
                  <div className={`flex flex-col gap-8 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0  overflow-hidden"}`}>
                    <p className="text-gray-600 font-manrope text-medium">{solution.description}</p>
                    <Button 
                      variant="light" 
                      className="w-fit z-30" 
                      onClick={(e) => handleExploreClick(e, solution.link)}
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
              <div className={`flex rounded-[15px] w-full h-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "opacity-100" : "opacity-0"}`}
                style={{
                  backgroundImage: `url(${solution.image.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}>
              </div>
              <div className={`absolute top-0 bottom-0 right-0 flex transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'p-12 ' : 'p-8'}`}>
                <button
                  onClick={(e) => handleToggleClick(e, index)}
                  className={`flex w-10 h-10 bg-primary-100 rounded-[10px] border-2 border-primary-800/60 items-center justify-center hover:bg-primary-100 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-20`}
                >
                  <ChevronUp className={`w-4 h-4 text-primary-900 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "rotate-180" : "rotate-0"}`} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}