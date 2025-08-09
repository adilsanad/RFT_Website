import { Button } from "@/components/ui/button"

export default function ContactSection({bgColor = "bg-primary-100"}: {bgColor?: string}) {
  return (
    <section className={`relative col-span-full grid grid-cols-4 md:grid-cols-12 w-full py-20 ${bgColor} bg-[url('../public/assets/images/contactbg.png')] bg-cover bg-top md:bg-center`} id="contact">
      <div className="col-span-full flex flex-col md:col-span-10 md:col-start-2 px-8 md:px-0 ">
        <h2 className="mb-4">Work with a team that knows water.</h2>
        <p className="relative text-xl text-black/70 font-manrope mb-8 ">
          From automated irrigation to rainwater harvesting to swimming pools, we work with architects, builders, and property owners to deliver tailored, practical & reliable solutions.
        </p>
        <Button className="w-fit ">Send an inquiry</Button>
      </div>
    </section>
  )
}
