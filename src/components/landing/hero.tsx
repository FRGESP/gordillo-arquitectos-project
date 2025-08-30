"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

function Hero() {
    return (
        <section className="relative min-h-screen flex items-center">
            {/* Background image */}
            <Image
                src="/assets/images/pipila.webp"
                alt="Vista arquitectónica destacada en Guanajuato"
                fill
                priority
                className="object-cover md:object-top"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/65 " />

            {/* Content */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-center text-white">
                    {/* <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-shadow-lg/20">
                        Diseñamos y construimos espacios que inspiran
                    </h1>
                    <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                        Proyectos arquitectónicos, construcción, urbanización e interiores con calidad y
                        funcionalidad, en Guanajuato y alrededores.
                    </p> */}

                    <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight drop-shadow-lg">
                        Diseñamos y construimos espacios que inspiran
                    </h1>
                    <p className="mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-inter">
                        Arquitectura, urbanización, interiores y gestión de propiedades con calidad y visión integral.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
                        <Link
                            href="#projects"
                            className="inline-flex text-xl items-center justify-center rounded-xl bg-navy px-5 py-3 text-white font-bold shadow-lg shadow-blue-900/20 hover:bg-navy-hover hover:text-white transition-colors"
                        >
                            Contáctanos
                            <ArrowRight className="ml-2 h-6 w-6" />
                        </Link>
                        {/* <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold bg-secondary text-white ring-1 ring-white/30 hover:bg-secondary-hover transition-colors"
                        >
                            Solicita una cotización
                        </a> */}
                    </div>

                    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-xl text-white mx-auto text-center">
                        <div>
                            <p className="text-2xl md:text-3xl font-bold">+30</p>
                            <p className="text-sm">Años de experiencia</p>
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl font-bold">+100</p>
                            <p className="text-sm">Proyectos realizados</p>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-2xl md:text-3xl font-bold">360°</p>
                            <p className="text-sm">Servicios integrales</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="hidden pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm md:flex items-center gap-3">
                <span className="hidden sm:inline">Desplaza para ver más</span>
                <div className="h-7 w-4 rounded-full border border-white/50 relative">
                    <span className="absolute left-1/2 -translate-x-1/2 top-1 h-2 w-1 rounded-full bg-white/90 animate-bounce" />
                </div>
            </div>
        </section>
    )
}

export default Hero