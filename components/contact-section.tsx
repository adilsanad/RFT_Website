'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProjectInquiryModal from './ProjectInquiryModal'

export default function ContactSection({bgColor = "bg-primary-100"}: {bgColor?: string}) {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
  return (
    <section className={`relative col-span-full grid grid-cols-4 md:grid-cols-12 w-full py-20 ${bgColor} bg-[url('../public/assets/images/contactbg.png')] bg-cover bg-top md:bg-center`} id="contact">
      <div className="col-span-full flex flex-col gap-8 md:gap-6 md:col-span-10 md:col-start-2 px-8 md:px-0 ">
        <h2 className="">Work with a team that knows water.</h2>
        <p className="relative body-text mb-2 ">
          From automated irrigation to rainwater harvesting to swimming pools, we work with architects, builders, and property owners to deliver tailored, practical & reliable solutions.
        </p>
        <Button 
          className="w-fit"
          onClick={() => setIsInquiryModalOpen(true)}
        >
          Send an inquiry
        </Button>
      </div>
      
      <ProjectInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        title="Start your next project with Rainfield Technologies"
      />
    </section>
  )
}
