export default function Brands() {
  const brands = [
    { name: "Fitvalf", description: "Premium irrigation components", logo: "F" },
    { name: "FinOlex", description: "Advanced piping solutions", logo: "FO" },
    { name: "EcoRain", description: "Sustainable water systems", logo: "ER" },
    { name: "Aqua", description: "Smart water management", logo: "A" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">Our Partner Brands</h1>
            <p className="text-xl text-gray-600 mb-12">
              We work with industry-leading brands to deliver the best solutions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{brand.logo}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{brand.name}</h3>
                <p className="text-gray-600">{brand.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why We Choose Quality Partners</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Reliability</h3>
                <p className="text-gray-600">
                  All our partner brands have demonstrated consistent quality and performance.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🔧</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Excellence</h3>
                <p className="text-gray-600">
                  Each brand brings cutting-edge technology and innovation to our solutions.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🌍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainability Focus</h3>
                <p className="text-gray-600">Our partners share our commitment to environmental responsibility.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
