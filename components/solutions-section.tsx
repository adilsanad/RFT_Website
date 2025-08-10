"use client"

import { useEffect, useState } from "react"
import Icon from "@/public/assets/vectors"
import Pools from "@/public/assets/images/rftpools.png"
import Irrigation from "@/public/assets/images/rftirrigation.png"
import Rwh from "@/public/images/component/rwhimg1.png"

export default function SolutionsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const solutions = [
    {
      title: "Irrigation Systems",
      description:
        "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      icon: <Icon width={24} height={24} name="sprinkler" className="fill-primary-500" />,
      image: Irrigation,
      link: "/solutions/irrigation-systems",
    },
    {
      title: "Rainwater Harvesting",
      description:
        "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      icon: <Icon width={24} height={24} name="rainwater" className="fill-primary-500" />,
      image: Rwh,
      link: "/solutions/rainwater-management",
    },
    {
      title: "Pools & Water Features",
      description:
        "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      icon: <Icon width={24} height={24} name="pool" className="fill-primary-500" />,
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
      <section className="col-span-full flex max-md:flex-col gap-5 px-4 md:px-14"> {/* min-h is bc autoplay changes container height constantly*/}
        {solutions.map((solution, index) => {
          const isOpen = expandedIndex === index
          return (
            <a href={solution.link} key={index} className="group relative flex-1 flex flex-col  gap-6 bg-black hover:rounded-[60px] rounded-[30px] min-h-[360px] md:min-h-[500px] overflow-hidden transition-all duration-300 border-2 border-white/40">
              {/* Base image */}
              <img className="absolute w-full h-full inset-0 object-cover object-bottom z-0 group-hover:scale-[1.05] transition-all duration-700" src={solution.image.src} />
              {/* Dark gradient overlay - flipped */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-black/1 via-50% to-transparent z-8" />
              <div className="flex flex-col gap-6 p-6 md:p-8 group-hover:md:p-8 group-hover:p-10 pb-6 group-hover:pb-8 transition-all bg-primary-100/10 backdrop-blur-sm border border-white/15 rounded-[15px] group-hover:rounded-[30px]">
                <div className="z-10 p-2 flex w-fit rounded-full border-2 border-primary-500 bg-primary-900/15">{solution.icon}</div>
                <div className="z-10 flex md:flex-col gap-4">
                  <h4 className="font-medium font-neulisneue text-white">{solution.title}</h4>
                
                </div>
              </div>
            </a>
          )
        })}
      </section>
  )
}