export default function ClientsSection() {
  const clients = [
    { name: "SOBHA", logo: "S" },
    { name: "REALTY", logo: "R" },
    { name: "PRESTIGE", logo: "P" },
    { name: "BRIGADE", logo: "B" },
  ]

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm uppercase tracking-wide">Our clients</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {clients.map((client, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-400">
              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-sm font-bold">{client.logo}</span>
              </div>
              <span className="text-lg font-semibold">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
