import { Button } from "@/components/ui/button"

export default function ContactSection() {
  return (
    <section className="relative col-span-full grid grid-cols-12 w-full py-20 pb-32 bg-primary-100 bg-[url('../public/assets/images/contactbg.png')] bg-cover bg-center" id="contact">
      <div className="col-span-10 col-start-2 px-4 ">
        <h2 className="font-neulisneue text-7xl font-medium tracking-tight text-gray-900 mb-4">Get in touch.</h2>
        <p className="relative text-xl font-manrope mb-8 ">
          Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt
          nunc venenatis quam viverra adipiscing at in non.
        </p>
        <Button className="">Send an inquiry</Button>
      </div>
    </section>
  )
}
