export default function StatsSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Lorem ipsum dolor sit amet</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Pharetra molestie bibendum mauris pellentesque sit. Ut mauris
              mauris bibendum mauris. Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet
              cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.
            </p>
            <p className="text-gray-600">
              Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt
              nunc venenatis quam viverra adipiscing at in non. Turpis erat nulla pharetra rutrum commodo purus quis.
              Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-green-50 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">99999+</div>
            <div className="text-gray-600">projects sold</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">1M+</div>
            <div className="text-gray-600">yearly recurring saved liters</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">999+</div>
            <div className="text-gray-600">liters running saved</div>
          </div>
        </div>
      </div>
    </section>
  )
}
