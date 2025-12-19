"use client"

import { useState } from "react"
import Image from "next/image"
import {
    Building,
    Construction,
    Sofa,
    Key,
    Settings,
    Users,

} from "lucide-react"
import Link from "next/link"

function ServicesGrid() {

    const [active, setActive] = useState(0)
    const whatsappBase = "https://wa.me/4454503606"

    const services = [
        {
            category: "Proyectos",
            icon: Building,
            services: [
                "Diseño arquitectónico integral",
                "Planos y renders profesionales",
                "Asesoría técnica durante todo el proceso"
            ],
            description: "Planificamos y desarrollamos proyectos arquitectónicos adaptados a tus necesidades, garantizando diseño, funcionalidad y estética en cada detalle.",
            CTA: "Cotizar tu proyecto",
            gradient: "from-blue-600 to-blue-800",
            bg: "/assets/images/proyectos.jpg",
            url: 'servicios/proyectos',
            CTAURL: "https://wa.me/524454503606?text=%C2%A1Hola!%20Me%20interesa%20el%20servicio%20de%20Proyectos.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n."
        },
        {
            category: "Construcción",
            icon: Construction,
            services: [
                "Construcción en general",
                "Nueva construcción",
                "Remodelaciones",
                "Talleres de vidrio, aluminio, herrería",
                "Construcción residencial"
            ],
            description: "Ejecutamos obras con los más altos estándares, cuidando cada detalle desde la cimentación hasta la entrega final.",
            CTA: "Solicitar cotización",
            gradient: "from-blue-600 to-blue-800",
            bg: "/assets/images/Construccion.jpg",
            url: 'servicios/construccion',
            CTAURL: "https://wa.me/5214454503606?text=%C2%A1Hola!%20Me%20interesa%20el%20servicio%20de%20Construcci%C3%B3n.%20Me%20gustar%C3%ADa%20un%20presupuesto."
        },
        {
            category: "Urbanización",
            icon: Users,
            services: [
                "Diseño y construcción de fraccionamientos",
                "Planificación urbana",
                "Infraestructura"
            ],
            description: "Diseñamos y ejecutamos obras de urbanización que mejoran la conectividad y calidad de vida en cada comunidad.",
            CTA: "Cotizar Desarrollo",
            gradient: "from-blue-600 to-blue-800",
            bg: "/assets/images/urbanizacionPrev.webp",
            url: 'servicios/urbanizacion',
            CTAURL: "https://wa.me/5214454503606?text=%C2%A1Hola!%20Quisiera%20informaci%C3%B3n%20sobre%20su%20servicio%20de%20dise%C3%B1o%20de%20fraccionamientos."
        },
        {
            category: "Muebles a Medida",
            icon: Sofa,
            services: [
                "Muebles personalizados para hogar y oficina",
                "Diseño personalizado",
                "Instalación especializada"
            ],
            description: "Creamos muebles personalizados que combinan estética, funcionalidad y durabilidad, adaptados a tu estilo de vida.",
            CTA: "Solicitar cotización",
            gradient: "from-blue-600 to-blue-800",
            bg: "/assets/images/muebles.jpg",
            url: 'servicios/muebles-a-medida',
            CTAURL: "https://wa.me/5214454503606?text=%C2%A1Hola!%20Me%20interesa%20su%20servicio%20de%20Muebles%20a%20Medida.%20Quisiera%20una%20cotizaci%C3%B3n."
        },
        {
            category: "Inmobiliaria",
            icon: Key,
            services: [
                "Compra, venta y renta de propiedades",
                "Gestión y administración de inmuebles",
                "Promoción y valuación profesional"
            ],
            description: "Compra, venta y renta de propiedades. Te ayudamos a vender tu inmueble con promoción efectiva y asesoría personalizada.",
            CTA: "Ver propiedades",
            gradient: "from-blue-600 to-blue-800",
            bg: "/assets/images/Inmobiliaria.webp",
            url: 'servicios/inmobiliaria',
            // CTAURL: "https://wa.me/5214454503606?text=%C2%A1Hola!%20Me%20interesa%20su%20servicio%20de%20Inmobiliaria."
            CTAURL: "/inmobiliaria"
        },
        {
            category: "Mantenimiento",
            icon: Settings,
            services: [
                "Reparaciones generales",
                "Pintura e impermeabilización",
                "Herrería y vidrio",
                "Servicios de mantenimiento programados"
            ],
            description: "Servicios de mantenimiento preventivo y correctivo para prolongar la vida útil de tus construcciones.",
            CTA: "Solicitar servicio",
            gradient: "from-blue-600 to-blue-800",
            bg: "/assets/images/Mantenimiento.webp",
            url: 'servicios/mantenimiento',
            CTAURL: "https://wa.me/5214454503606?text=%C2%A1Hola!%20Me%20interesa%20su%20servicio%20de%20Mantenimiento."
        }
    ];

    return (
        <section id="servicios" className='scroll-mt-20 bg-gray-50'>
            {/* Header */}
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-6 text-center'>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-navy">Servicios que impulsan tus proyectos</h2>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className='container mx-auto'>
                    {/* Section Header */}
                    <div className='text-center mb-16'>
                        <p className="text-lg md:text-xl text-black max-w-2xl mx-auto">
                            Descubre nuestra amplia gama de servicios profesionales diseñados para cubrir
                            todas sus necesidades de construcción y diseño.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full'
                            >
                                {/* Card Header: use responsive aspect-ratio instead of fixed heights for better responsiveness */}
                                <div className="relative aspect-video md:aspect-[16/8]">
                                    <Image
                                        src={service.bg}
                                        alt={service.category}
                                        fill
                                        className="object-cover"
                                    />

                                </div>

                                {/* Card Body */}
                                <div className='p-6 flex flex-col justify-between flex-1'>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <service.icon className={`w-8 h-8 text-navy`} />
                                            <h3 className="text-2xl font-bold text-navy tracking-wide">
                                                {service.category}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                            {service.description}
                                        </p>
                                        <ul className='space-y-3'>
                                            {service.services.map((item, itemIndex) => (
                                                <li key={itemIndex} className='flex items-start space-x-3'>
                                                    <div className={`w-2 h-2 rounded-full bg-navy mt-2 flex-shrink-0`}></div>
                                                    <span className='text-gray-700 font-medium'>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Call to Action */}
                                    <div className='mt-2 pt-6 border-t border-gray-100 space-y-2'>
                                        <Link href={service.CTAURL} target={service.category != "Inmobiliaria" ? "_blank" : ""} className={`w-full bg-navy text-white font-semibold py-3 px-6 rounded-xl tracking-wide transition duration-200 ease-in-out hover:scale-102 hover:bg-navy-hover cursor-pointer flex justify-center items-center`}>
                                            {service.CTA}
                                                </Link>
                                        <Link href={service.url} className={`w-full bg-[#e0e0e0] text-black font-semibold py-3 px-6 rounded-xl tracking-wide transition duration-200 ease-in-out hover:scale-102 hover:bg-secondary-hover cursor-pointer flex justify-center items-center`}>
                                            Más información
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>


                </div>
            </div>

        </section>
    )
}

export default ServicesGrid