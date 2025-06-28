import { Link } from "react-router-dom"

export default function ContactSection() {
  return (
    <section className="w-full py-20 bg-green-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in touch.</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt
          nunc venenatis quam viverra adipiscing at in non.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-md transition-colors"
        >
          Send an inquiry
        </Link>
      </div>
    </section>
  )
}
