import React from 'react'

function ContactImage() {
    return (
        <div className="relative">
            <img 
                src="/assets/images/contactimage.webp" 
                alt="Imagen de contacto" 
                className="w-full md:h-auto md:max-h-[60vh] h-[40vh] object-cover object-right hidden md:block" 
                loading="lazy"
            />
            <img 
                src="/assets/images/contactimageMobile.webp" 
                alt="Imagen de contacto" 
                className="w-full h-auto object-cover object-right md:hidden" 
                loading="lazy"
            />
            <div className="absolute w-full top-0 left-0 z-10 h-full flex items-center bg-black/10 md:bg-transparent">
                <div className="container mx-auto w-full px-6 md:px-0">
                    <div className='h-full flex flex-col justify-center items-center md:items-start space-y-3 md:space-y-10 text-white  lg:max-w-1/2'>
                        <h2 className="md:text-6xl text-3xl font-bold text-center md:text-left">
                            ¿Listo para empezar tu proyecto?
                        </h2>
                        <a href='/contacto' className="inline-flex items-center gap-2 text-white font-semibold px-4 py-2 bg-navy rounded-xl cursor-pointer transition duration-200 ease-in-out hover:bg-navy-hover hover:scale-105">
                            <span className="md:text-2xl text-lg">Contáctanos</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactImage

