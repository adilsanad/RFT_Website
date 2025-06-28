"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function Solutions() {
  const [expandedSolution, setExpandedSolution] = useState<number | null>(0)

  const solutions = [
    {
      title: "Rainwater Harvesting",
      description:
        "Comprehensive rainwater collection and storage systems that help reduce water bills and environmental impact.",
      features: ["Roof catchment systems", "Storage tank solutions", "Filtration systems", "Smart monitoring"],
      icon: "💧",
    },
    {
      title: "Irrigation Systems",
      description: "Efficient irrigation solutions for residential, commercial, and agricultural applications.",
      features: ["Drip irrigation", "Sprinkler systems", "Smart controllers", "Water-efficient designs"],
      icon: "🌱",
    },
    {
      title: "Pools & Water Features",
      description: "Beautiful and sustainable water features that enhance your property while conserving water.",
      features: ["Pool automation", "Water recycling", "Energy-efficient pumps", "Smart chemical management"],
      icon: "🏊",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">Our Solutions</h1>
            <p className="text-xl text-gray-600 mb-12">
              Comprehensive water management solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  expandedSolution === index ? "bg-green-100" : "bg-white border border-gray-200"
                }`}
              >
                <button
                  onClick={() => setExpandedSolution(expandedSolution === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{solution.icon}</span>
                    <h3 className="text-2xl font-semibold text-gray-900">{solution.title}</h3>
                  </div>
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    {expandedSolution === index ? (
                      <ChevronUp className="w-4 h-4 text-white" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>

                {expandedSolution === index && (
                  <div className="px-6 pb-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-gray-600 mb-6">{solution.description}</p>
                        <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                        <ul className="space-y-2">
                          {solution.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors">
                          Learn More
                        </button>
                      </div>
                      <div className="bg-green-200 rounded-xl h-64 flex items-center justify-center">
                        <span className="text-green-600 text-6xl">{solution.icon}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
