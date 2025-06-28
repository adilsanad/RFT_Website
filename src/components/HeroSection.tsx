export default function HeroSection() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Lorem ipsum
            <br />
            dolor sit amet.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-md transition-colors">
            Send an inquiry
          </button>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Irrigation system in green landscape"
              className="w-full h-auto"
            />
          </div>

          {/* Info Card Overlay */}
          <div className="absolute top-4 right-4 bg-white rounded-lg p-4 shadow-lg max-w-xs">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 text-sm">i</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Lorem ipsum dolor sit amet.</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet.
                </p>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <span className="text-gray-600">←</span>
                  </button>
                  <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <span className="text-gray-600">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
