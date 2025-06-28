export default function PartnersSection() {
  const partners = [
    { name: "Fitvalf", logo: "F" },
    { name: "FinOlex", logo: "FO" },
    { name: "EcoRain", logo: "ER" },
    { name: "Aqua", logo: "A" },
  ]

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm uppercase tracking-wide">Our partners</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-400">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-semibold">{partner.logo}</span>
              </div>
              <span className="text-lg font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
