'use client'
import React from 'react'
import Lottie from 'lottie-react'

// Importa aquí tu JSON. Asegúrate de que la ruta sea correcta.
import animationData from '@/assets/cityloader.json' 
// O si está en la misma carpeta: import animationData from './loader-architecture.json'

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      {/* El contenedor controla el tamaño máximo */}
      <div className="w-64 h-64 md:w-96 md:h-96"> 
        <Lottie 
          animationData={animationData} 
          loop={true} 
          autoplay={true}
        />
      </div>
      {/* <p className="text-gray-500 text-xl tracking-widest uppercase animate-pulse ">
        Cargando...
      </p> */}
    </div>
  )
}

export default LoadingAnimation