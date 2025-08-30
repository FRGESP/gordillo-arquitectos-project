import { Search, PenTool, Hammer, CheckCircle } from "lucide-react";

import React from 'react'

function Process() {
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-navy" />,
      title: "Análisis y Consulta",
      description: "Estudiamos tus necesidades, el terreno y las normativas para crear una propuesta personalizada."
    },
    {
      icon: <PenTool className="w-12 h-12 text-navy" />,
      title: "Diseño y Desarrollo",
      description: "Creamos los planos arquitectónicos, renders 3D y toda la documentación técnica necesaria."
    },
    {
      icon: <Hammer className="w-12 h-12 text-navy" />,
      title: "Construcción",
      description: "Supervisamos la obra para garantizar que se ejecute según los planos y estándares de calidad."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-navy" />,
      title: "Entrega",
      description: "Realizamos la entrega final con todos los acabados y documentación de garantías."
    }
  ]
  return (
    <div className="bg-gray-50">
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-6'>
        <div className='text-center mb-16'>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy text-center mb-6">Nuestro Proceso</h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Un enfoque metodológico que garantiza resultados excepcionales en cada etapa del proyecto
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div className="relative group bg-white text-center rounded-xl shadow-lg" key={index}>
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-9 h-9 bg-navy text-white rounded-full flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>

              <div className="p-8 pt-12">
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">
                  {step.title}
                </h3>
                <p className="text-stone-dark mb-4 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          )
          )}
        </div>
      </div>
    </div>
  )
}

export default Process