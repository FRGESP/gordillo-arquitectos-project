// 'use client'
import React from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
// import LinkUnderline from '@/components/elements/linkUnderline'

function Contact() {

    const contactItems = [
        { icon: MapPin, text: 'Pípila 706, Moroleón Gto.', href: 'https://maps.app.goo.gl/gGrwqi2FtsUs3kzr6', title: "Dirección" },
        { icon: Phone, text: '4454503606', href: 'tel:4454503606', title: "Teléfono" },
        { icon: Mail, text: 'fernandogordilloortega@gmail.com', href: 'mailto:fernandogordilloortega@gmail.com', title: "Correo" },
    ]

    return (
        <section className='bg-gray-50 py-24'>
            <div className="px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className='container mx-auto'>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                            Contacto
                        </h2>
                        <p className="text-lg md:text-2xl text-black mx-auto ">
                            Estamos listos para hacer realidad su proyecto arquitectónico. Contáctanos para una consulta inicial sin compromiso.
                        </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch'>
                        {/* Left Content */}
                        <div className='text-left h-full'>
                            <p className='text-2xl font-bold text-black text-center md:text-left mb-2'>
                                Información de Contacto
                            </p>

                            <div className='space-y-6 mt-8'>
                                {contactItems.slice(0, 3).map((item, index) => (
                                    <div className='flex items-center space-x-4' key={index}>
                                        <div className='w-12 h-12 rounded-lg bg-navy flex items-center justify-center text'>
                                            <item.icon className='w-6 h-6 text-white' />
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-semibold text-black'>{item.title}</h3>
                                            {/* <LinkUnderline blank={true} href={item.href} personalized={true} color='gray-600'>{item.text}</LinkUnderline> */}
                                            {/* <a href={item.href} className='text-base text-gray-600 hover:text-gray-800 transition-colors'>{item.text}</a> */}
                                            <a
                                                href={item.href}
                                                target={'_blank'}
                                                rel="noopener noreferrer"
                                                className={`
                                                text-gray-600 after:bg-black
                                                relative inline-block cursor-pointer 
                                                after:content-[''] after:absolute after:bottom-0
                                                after:h-[2px] 
                                                after:transition-all after:duration-300
                                                after:left-0 after:w-0 hover:after:w-full
                                            `}
                                            >
                                                {item.text}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                                <div className='flex items-center space-x-4'>
                                    <div className='w-12 h-12 rounded-lg bg-navy flex items-center justify-center text'>
                                        <Clock className='w-6 h-6 text-white' />
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-black'>Horario</h3>
                                        <p className='text-base text-gray-600'>Lunes a Domingo 8am - 10pm</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* Right Content */}
                        <div className='flex flex-col h-full'>
                            <p className='text-2xl font-bold text-black mb-2 text-center md:text-left'>
                                Ubicación
                            </p>
                            <div className=' w-full h-[30vh] md:h-full mt-6'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.981664992285!2d-101.19520062406086!3d20.13481251788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842cfba76d092c4d%3A0xb75d683f3393d568!2sGORDILLO%20ARQUITECTOS!5e0!3m2!1ses-419!2smx!4v1756599682660!5m2!1ses-419!2smx" className='w-full h-full rounded-lg' allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact