"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function SolutionsSection() {
  const [expandedSolution, setExpandedSolution] = useState<number | null>(0)

  const solutions = [
    {
      title: "Rainwater Harvesting",
      description:
        "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      icon: "💧",
    },
    {
      title: "Irrigation Systems",
      description:
        "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      icon: "🌱",
    },
    {
      title: "Pools & Water Features",
      description:
        "Turpis erat nulla pharetra rutrum commodo purus quis. Tristique neque cras aliquet cursus lacus. Tincidunt nunc venenatis quam viverra adipiscing at in non.",
      icon: "🏊",
    },
  ]

  return (
    <section className="w-full py-16 bg-gray-50" id="solutions">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Solutions</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                expandedSolution === index ? "bg-green-100" : "bg-white"
              }`}
            >
              <button
                onClick={() => setExpandedSolution(expandedSolution === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{solution.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{solution.title}</h3>
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
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <p className="text-gray-600 mb-6">{solution.description}</p>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors">
                        Learn more
                      </button>
                    </div>
                    <div className="bg-green-200 rounded-xl h-48 flex items-center justify-center">
                      <span className="text-green-600 text-4xl">{solution.icon}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
