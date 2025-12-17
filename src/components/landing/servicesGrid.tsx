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
    Check,
    ArrowRight,
} from "lucide-react"

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
                "Asesoria técnica durante todo el proceso"
            ],
            description: "Planificamos y desarrollamos proyectos arquitectónicos adaptados a tus necesidades, garantizando diseño, funcionalidad y estética en cada detalle.",
            CTA: "Cotizar tu proyecto",
            gradient: "from-blue-600 to-blue-800",
            bg: "/assets/images/proyectos.jpg"
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
            bg: "/assets/images/Construccion.jpg"
        },
        {
            category: "Urbanizaciones",
            icon: Users,
            services: [
                "Diseño y construcción de fraccionamientos",
                "Planificación urbana",
                "Infraestructura"
            ],
            description: "Diseñamos y ejecutamos obras de urbanización que mejoran la conectividad y calidad de vida en cada comunidad.",
            CTA: "Cotizar Desarrollo",
            gradient: "from-blue-600 to-blue-800",
            bg: "/assets/images/urbanizacion.jpg"
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
            bg: "/assets/images/muebles.jpg"
        },
        {
            category: "Bienes Raíces",
            icon: Key,
            services: [
                "Compra venta",
                "Administración de propiedades",
                "Asesoría inmobiliaria"
            ],
            description: "Asesoría y acompañamiento para comprar, vender o rentar inmuebles con total seguridad y transparencia.",
            CTA: "Más información",
            gradient: "from-blue-600 to-blue-800",
            bg: "/assets/images/interiorPipila.jpg"
        },
        {
            category: "Mantenimiento",
            icon: Settings,
            services: [
                "Reparaciones generales",
                "Programas mensuales de mantenimiento",
                "Plomería especializada",
                "Pintura e impermeabilización",
                "Herrería y vidrio",
                "Servicios de mantenimiento programada"
            ],
            description: "Servicios de mantenimiento preventivo y correctivo para prolongar la vida útil de tus construcciones.",
            CTA: "Solicitar servicio",
            gradient: "from-blue-600 to-blue-800",
            bg: "/assets/images/image.png"
        }
    ];

    // Background placeholders per service
    const backgrounds = [
        "/assets/images/proyectos.jpg",
        "/assets/images/Construccion.jpg",
        "/assets/images/urbanizacion.jpg",
        "/assets/images/muebles.jpg",
        "/assets/images/interiorPipila.jpg",
        "/assets/images/image.png",
    ]

    return (
        <section id="services" className='scroll-mt-20 bg-gray-50'>
            {/* Header */}
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-6 text-center'>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Servicios que impulsan tus proyectos</h2>
                <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto hidden ">
                    Cambia entre categorías para ver una vista inmersiva de cada servicio.
                </p>
            </div>

            {/* Desktop version */}
            <div className="hidden ">
                {/* Tabs */}
                <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center'>
                    <div role="tablist" aria-label="Servicios" className='mb-6 md:mb-8 flex gap-2 overflow-x-auto no-scrollbar py-2 px-2'>
                        {services.map((s, i) => (
                            <button
                                key={s.category}
                                role="tab"
                                aria-selected={active === i}
                                aria-controls={`service-panel-${i}`}
                                className={[
                                    'rounded-full px-4 py-2 text-sm font-semibold transition-all border border-gray-200',
                                    active === i
                                        ? 'bg-blue-800 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 cursor-pointer'
                                ].join(' ')}
                                onClick={() => setActive(i)}
                            >
                                <span className='inline-flex items-center gap-2'>
                                    <span className='hidden sm:inline-block'>
                                        {/* icon already colored */}
                                        <s.icon className={`w-8 h-8 ${active === i ? 'text-white' : 'text-blue-800'}`} />
                                    </span>
                                    {s.category}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Stage */}
                <div className='container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24'>
                    <div className='relative h-[65vh] md:h-[60vh] rounded-2xl overflow-hidden ring-1 ring-gray-200 shadow-lg'>
                        {/* Backgrounds crossfade */}
                        {services.map((s, i) => (
                            <div
                                key={i}
                                aria-hidden={active !== i}
                                className={[
                                    'absolute inset-0 transition-opacity duration-700',
                                    active === i ? 'opacity-100 z-10' : 'opacity-0'
                                ].join(' ')}
                            >
                                <Image
                                    src={backgrounds[i % backgrounds.length]}
                                    alt={`${s.category} - Gordillo Arquitectos`}
                                    fill
                                    priority={i === 0}
                                    sizes='100vw'
                                    className='object-cover'
                                />
                                <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10' />
                            </div>
                        ))}
                        {/* Content panels */}
                        {services.map((s, i) => {
                            const encoded = encodeURIComponent(`Hola, me interesa el servicio de ${s.category}.`)
                            const whatsappHref = `${whatsappBase}?text=${encoded}`
                            return (
                                <div
                                    id={`service-panel-${i}`}
                                    key={`panel-${i}`}
                                    role="tabpanel"
                                    aria-labelledby={`service-tab-${i}`}
                                    className={[
                                        'absolute inset-0 transition-opacity duration-700',
                                        active === i ? 'opacity-100 z-20' : 'opacity-0'
                                    ].join(' ')}
                                >
                                    <div className='relative h-full w-full flex items-end md:items-center'>
                                        <div className='w-full md:w-[60%] lg:w-[50%] px-5 sm:px-8 md:px-12 lg:px-16 py-8 md:py-0'>
                                            <div className='flex items-center gap-3 mb-3'>
                                                <div className='h-10 w-10 rounded-lg bg-white/15 ring-1 ring-white/30 backdrop-blur flex items-center justify-center'>
                                                    <s.icon className={`w-8 h-8 text-white`} />
                                                </div>
                                                <h3 className='text-3xl md:text-4xl font-bold text-white'>{s.category}</h3>
                                            </div>
                                            <p className='text-white/90 text-lg md:text-xl'>
                                                {s.description}
                                            </p>
                                            <ul className='mt-5 space-y-3'>
                                                {s.services.slice(0, 3).map((item: string, idx: number) => (
                                                    <li key={idx} className='flex items-start gap-3 text-white'>
                                                        <span className='mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30'>
                                                            <Check className='h-4 w-4 text-white' />
                                                        </span>
                                                        <span className='font-medium'>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className='mt-7 flex flex-wrap gap-3'>
                                                <a
                                                    href={whatsappHref}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='inline-flex items-center justify-center rounded-lg bg-blue-800 px-5 py-3 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors'
                                                >
                                                    {s.CTA}
                                                    <ArrowRight className='ml-2 h-5 w-5' />
                                                </a>
                                                <a
                                                    href='#projects'
                                                    className='inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold bg-white/15 text-white ring-1 ring-white/30 hover:bg-white/25 transition-colors backdrop-blur'
                                                >
                                                    Ver proyectos
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile version */}
            <div className=" px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className='container mx-auto'>
                    {/* Section Header */}
                    <div className='text-center mb-16'>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Descubre nuestra amplia gama de servicios profesionales diseñados para cubrir
                            todas sus necesidades de construcción y diseño.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group flex flex-col h-full'
                            >
                                {/* Card Header */}
                                <div className="relative h-40 md:h-50 ">
                                    <Image
                                        src={service.bg}
                                        alt={service.category}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                                        <service.icon className={`w-8 h-8 text-white`}/>
                                        <h3 className="text-lg font-bold text-white">
                                            {service.category}
                                        </h3>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className='p-6 flex flex-col justify-between flex-1'>
                                    <div className="">
                                        <p className='text-black mb-4'>{service.description}</p>
                                        <ul className='space-y-3'>
                                            {service.services.map((item, itemIndex) => (
                                                <li key={itemIndex} className='flex items-start space-x-3'>
                                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mt-2 flex-shrink-0`}></div>
                                                    <span className='text-gray-700 font-medium'>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Call to Action */}
                                    <div className='mt-auto pt-6 border-t border-gray-100'>
                                        <button className={`w-full bg-gradient-to-r ${service.gradient} text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200 cursor-pointer`} onClick={() => { console.log(`Solicitar información para ${service.category}`) }}>
                                            {service.CTA}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}

                </div>
            </div>

        </section>
    )
}

export default ServicesGrid