'use client';
import { InstagramLogo, FacebookLogo, WhatsappLogo } from 'phosphor-react';
import { MapPin, Phone, Mail } from 'lucide-react';
import LinkUnderline from '../elements/linkUnderline';

function Footer() {

    const socialLinks = [
        { name: "Facebook", href: "https://www.facebook.com/share/1GUooxGK6o/", img: <FacebookLogo size={32} className={`transition-transform hover:scale-110 text-black hover:text-[#1877f2] duration-300`} /> },
        { name: "Instagram", href: "https://www.instagram.com/gordilloarquitectos", img: <InstagramLogo size={32} className={`transition-transform hover:scale-110 text-black hover:text-[#D43089] duration-300`} /> },
        { name: "WhatsApp", href: "https://wa.me/4454503606", img: <WhatsappLogo size={32} className={`transition-transform hover:scale-110 text-black hover:text-[#25D366] duration-300`} /> },
    ];

    const services = [
        ["Proyectos", "/proyectos"],
        ["Construcción", "/construccion"],
        ["Urbanización", "/urbanizacion"],
        ["Muebles a medida", "/muebles-a-medida"],
        ["Bienes Raíces", "/inmobiliaria"],
        ["Mantenimiento", "/mantenimiento"]
    ]

    const contactInfo = [
        { icon: MapPin, text: 'Pípila 706, Moroleón Gto.', href: 'https://maps.app.goo.gl/gGrwqi2FtsUs3kzr6', title: "Dirección" },
        { icon: Phone, text: '4454503606', href: 'tel:4454503606', title: "Teléfono" },
        { icon: Mail, text: 'fernandogordilloortega@gmail.com', href: 'mailto:fernandogordilloortega@gmail.com', title: "Correo" },
    ]

    return (
        <footer className=" px-4 sm:px-6 lg:px-8 py-10">
            <div className="container mx-auto">
                <div className="grid gap-12 md:grid-cols-3">

                    {/* Logo + Descripción */}
                    <div>
                        <div className="flex justify-center md:justify-start items-center mb-4">
                            <img
                                src="/assets/images/blackLogo.webp"
                                alt="Gordillo Arquitectos"
                                width={25}
                                height={25}
                                loading="lazy"
                            />
                            <p className="ml-2 text-2xl font-semibold">
                                Gordillo <span className="font-normal">Arquitectos</span>
                            </p>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6 text-center md:text-left">
                            Proyectos arquitectónicos, construcción, urbanización e interiores con
                            calidad y funcionalidad en Moroleón y alrededores.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target='_blank'
                                    className="text-gray-500 hover:text-gray-800 transition-colors"
                                >
                                    {link.img}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Servicios */}
                    <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
                        <h4 className="font-bold text-2xl mb-6 tracking-wide text-gray-800">
                            Servicios
                        </h4>
                        <ul className="grid grid-cols-2 gap-y-3">
                            {services.map((service) => (
                                <li key={service[0]} className="text-gray-600 hover:text-gray-900 transition-colors">
                                    <LinkUnderline href={service[1]} personalized={true} color='gray-600'>{service[0]}</LinkUnderline>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
                        <h4 className="font-bold text-2xl mb-6 tracking-wide text-gray-800">
                            Contacto
                        </h4>
                        <ul className="space-y-4 text-gray-600">
                            {contactInfo.map((info) => (
                                <li key={info.text} className="flex items-center">
                                    {/* <span className="text-gray-500">{info.icon}</span> */}
                                    {/* <p className="ml-3 break-all">{info.text}</p> */}
                                    <info.icon size={22} className="text-navy" />
                                    <LinkUnderline blank={true} href={info.href} personalized={true} color='gray-600' className='ml-3 break-after-all'>{info.text}</LinkUnderline>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Línea inferior */}
                <div className="border-t border-gray-200 pt-6 mt-10">
                    <div className='flex justify-center flex-col md:flex-row md:space-x-2 text-gray-500  text-center'>
                        <p>© 2025 Gordillo Arquitectos.</p>
                        <p className=''>Desarrollado por <a href="https://blackwaves.tech" target="_blank" rel="noopener noreferrer" className='text-navy hover:underline'>Blackwaves</a>.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer