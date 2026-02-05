"use client";

import React, { useState, useRef, useEffect, useActionState, use } from "react";
import Image from "next/image";
import {
    MapPin,
    Ruler,
    Square,
    Key,
    DollarSign,
    Bed,
    Bath,
    ChevronLeft,
    ChevronRight,
    CircleCheckBig,
} from "lucide-react";
import type { Property, ImageInterface } from "@/actions";
import { FormState, getPropertyBySlug, submitContactForm } from "@/actions";
import RelatedProperties from "../elements/relatedProperties";
import Link from "next/link";
import LinkUnderline from "../elements/linkUnderline";


type Props = {
    propertySlugProp: string;
};

const currency = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
});


function PropertyDetail({ propertySlugProp }: Props) {

    //Necesario para enviar correos
    const [currentState, formAction, isPending] = useActionState<FormState, FormData>(submitContactForm, {})

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
    const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    //Gaurda la información de la propiedad
    const [propertyData, setPropertyData] = useState<Property | null>(null);

    //Estado por si no se encuentra la propiedad
    const [notFound, setNotFound] = useState(false);

    //Guarda el estado cuando el id de la propiedad está listo
    const [propertyIdReady, setPropertyIdReady] = useState(false);

    // Estado para los valores del formulario
    const [formValues, setFormValues] = useState({
        Nombre: '',
        Telefono: '',
        Email: '',
        Mensaje: ''
    });

    //Guarda la información de las imágenes
    const [imagesData, setImagesData] = useState<ImageInterface[]>([]);

    //Estado de carga
    const [isLoading, setIsLoading] = useState(true);

    const isRent = propertyData?.Tipo?.toLowerCase() === "renta";

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % imagesData.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + imagesData.length) % imagesData.length);
    };


    // Scroll automático de las miniaturas cuando cambia la imagen
    useEffect(() => {
        if (thumbnailRefs.current[currentImageIndex] && thumbnailsContainerRef.current) {
            const thumbnail = thumbnailRefs.current[currentImageIndex];
            if (thumbnail) {
                thumbnail.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }
        }
    }, [currentImageIndex]);

    const loadPropertyData = async () => {
        try {
            setIsLoading(true);
            const data = await getPropertyBySlug(propertySlugProp);
            if (data[0]) {
                setPropertyData(data[0]);
                setImagesData(data[0].Imagenes && data[0].Imagenes.length > 0 ? data[0].Imagenes : []);
            } else {
                setNotFound(true);
            }
        } catch (error) {
            console.error("Error loading property data:", error);
            // Redirigir a una página de error o mostrar un mensaje
            setNotFound(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (currentState.success) {
            setFormValues({
                Nombre: '',
                Telefono: '',
                Email: '',
                Mensaje: ''
            });
            formRef.current?.reset();
        }
    }, [currentState.success]);

    //Elimina los mensajes de error de cada input al cambiar su valor
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        if (currentState.errors && currentState.errors[name as keyof typeof formValues]) {
            delete currentState.errors[name as keyof typeof formValues];
            // Force re-render to update the errors
            setFormValues((prevValues) => ({ ...prevValues }));
        }
    };
    

    //Carga la información incial de la propiedad
    useEffect(() => {
        loadPropertyData();
    }, [propertySlugProp]);

    useEffect(() => {
        if (propertyData && propertyData.id) {
            setPropertyIdReady(true);
        }
    }, [propertyData]);

    return (
        <div className="min-h-screen bg-stone">
            {isLoading ? (
                // Skeleton Loader
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Skeleton imagen principal */}
                            <div className="md:col-span-3 relative aspect-[16/9] rounded-xl bg-gray-300 animate-pulse" />
                            {/* Skeleton miniaturas */}
                            <div className="hidden md:flex flex-col gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="aspect-video rounded-xl bg-gray-300 animate-pulse" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Skeleton título */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="h-10 bg-gray-300 rounded animate-pulse mb-4 w-3/4" />
                                <div className="h-5 bg-gray-300 rounded animate-pulse w-1/2" />

                                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            </div>

                            {/* Skeleton descripción */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="h-7 bg-gray-300 rounded animate-pulse mb-4 w-1/3" />
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                                </div>
                            </div>

                            {/* Skeleton características */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="h-7 bg-gray-300 rounded animate-pulse mb-4 w-1/4" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="h-6 bg-gray-200 rounded animate-pulse" />
                                    ))}
                                </div>
                            </div>

                            {/* Skeleton mapa */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="h-7 bg-gray-300 rounded animate-pulse mb-4 w-1/4" />
                                <div className="aspect-[16/9] rounded-xl bg-gray-300 animate-pulse" />
                            </div>
                        </div>

                        {/* Skeleton formulario */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="h-6 bg-gray-300 rounded animate-pulse mb-4 w-2/3" />
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i}>
                                            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/3" />
                                            <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
                                        </div>
                                    ))}
                                    <div className="h-12 bg-gray-300 rounded-lg animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : notFound ? (
                <div className="flex flex-col items-center justify-center h-screen text-center">
                    <h1 className="text-5xl font-bold mb-4">Propiedadad no encontrada</h1>
                    <p className="text-lg mb-6">Lo sentimos, la propiedad que buscas no está disponible.</p>
                    <Link
                        href="/inmobiliaria"
                        className="px-4 py-2 bg-navy text-white rounded-md hover:bg-navy-hover transition-colors"
                    >
                        Volver al catálogo de propiedades
                    </Link>
                </div>
            ) : (
                (propertyIdReady && propertyData) && (
                    <div>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                            {/* Galería de imágenes */}
                            <div className="mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {/* Imagen principal */}
                                    <div
                                        className="md:col-span-3 relative aspect-[16/9] rounded-xl overflow-hidden cursor-pointer group"
                                        onClick={() => setShowLightbox(true)}
                                    >
                                        <Image
                                            src={imagesData[currentImageIndex].src}
                                            alt={imagesData[currentImageIndex].alt}
                                            fill
                                            className="object-cover transition-transform duration-300"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                                        {/* Badge tipo de propiedad */}
                                        <div
                                            className={`absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg ${isRent
                                                ? "bg-amber-500 text-white"
                                                : "bg-emerald-600 text-white"
                                                }`}
                                        >
                                            {isRent ? <Key size={16} /> : <DollarSign size={16} />}
                                            {isRent ? "En renta" : "En venta"}
                                        </div>

                                        {/* Controles de navegación */}
                                        {imagesData.length > 1 && (
                                            <>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        prevImage();
                                                    }}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white hover:cursor-pointer p-2 rounded-full shadow-lg transition-all"
                                                >
                                                    <ChevronLeft size={24} className="text-gray-900" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        nextImage();
                                                    }}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 hover:cursor-pointer rounded-full shadow-lg transition-all"
                                                >
                                                    <ChevronRight size={24} className="text-gray-900" />
                                                </button>

                                                {/* Indicador de imágenes */}
                                                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                                    {currentImageIndex + 1} / {imagesData.length}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Miniaturas con scroll */}
                                    <div className="hidden md:block relative h-full col-span-1">
                                        <div
                                            ref={thumbnailsContainerRef}
                                            className="absolute inset-0 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                                            style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}
                                        >
                                            {imagesData.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    ref={(el) => { thumbnailRefs.current[idx] = el }}
                                                    className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all shrink-0 ${currentImageIndex === idx
                                                        ? "border-navy ring-navy/20 shadow-md"
                                                        : "border-transparent hover:border-gray-300"
                                                        }`}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                >
                                                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                                                    {currentImageIndex !== idx && (
                                                        <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contenido principal */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Columna principal - Información */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Título y precio */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div>
                                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                                    {propertyData?.NombrePropiedad}
                                                </h1>
                                                {propertyData?.Direccion && (
                                                    <div className="mt-2 flex items-center gap-2 text-gray-600">
                                                        <MapPin size={18} className="text-navy" />
                                                        <LinkUnderline blank={true} href={propertyData.LinkGoogleMaps} personalized={true} color='gray-600' className='break-after-all'>{propertyData.Direccion}</LinkUnderline>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="shrink-0">
                                                <div className="text-3xl md:text-4xl font-bold text-navy">
                                                    {currency.format(propertyData?.Precio ? propertyData.Precio : 0)} <span className={isRent ? "inline text-lg text-gray-500" : "hidden"}>/ mes</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Características principales */}
                                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                <Ruler size={24} className="text-navy" />
                                                <div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {propertyData?.AreaTerreno || 0} m²
                                                    </div>
                                                    <div className="text-xs text-gray-500">Área de Terreno</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                <Square size={24} className="text-navy" />
                                                <div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {propertyData?.AreaConstruccion || 0} m²
                                                    </div>
                                                    <div className="text-xs text-gray-500">Área de Construcción</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                <Bed size={24} className="text-navy" />
                                                <div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {propertyData?.Recamaras || 0}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{propertyData?.Recamaras ? propertyData.Recamaras > 1 ? "Recámaras" : "Recámara" : "Recámara"}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                <Bath size={24} className="text-navy" />
                                                <div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {propertyData?.Bathrooms || 0}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{propertyData?.Bathrooms ? propertyData.Bathrooms > 1 ? "Baños" : "Baño" : "Baño"}</div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    {/* Descripción */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                            Descripción
                                        </h2>
                                        <div className="prose prose-gray max-w-none">
                                            {propertyData?.Descripcion?.split("\n").map((paragraph, idx) => (
                                                <p key={idx} className="text-gray-600 leading-relaxed mb-3">
                                                    {paragraph.trim()}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Características */}
                                    {propertyData?.Caracteristicas && propertyData.Caracteristicas.length > 0 && (
                                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                            Características
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {propertyData?.Caracteristicas?.map((caracteristica) => (
                                                <div
                                                    key={caracteristica.id}
                                                    className="flex items-center gap-2 text-gray-700"
                                                >
                                                    <div className="w-2 h-2 bg-navy rounded-full" />
                                                    <span>{caracteristica.Descripcion}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    )}

                                    {/* Mapa */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                            Ubicación
                                        </h2>
                                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
                                            {/* Placeholder para Google Maps */}
                                            <iframe
                                                src={propertyData?.LinkMapaGoogleMaps}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="absolute inset-0"
                                                title={propertyData?.NombrePropiedad || "Ubicación de la propiedad"}
                                            />
                                        </div>
                                        <div className="mt-4 flex items-start gap-2 text-gray-600">
                                            <MapPin size={18} className="text-navy shrink-0 mt-0.5" />
                                            <LinkUnderline blank={true} href={propertyData.LinkGoogleMaps} personalized={true} color='gray-600' className='break-after-all'>{propertyData.Direccion}</LinkUnderline>
                                        </div>
                                    </div>
                                </div>

                                {/* Columna lateral - Contacto */}
                                <div className="lg:col-span-1">
                                    <div className="sticky top-24 space-y-6">
                                        {/* Formulario de contacto */}
                                        <div className="bg-white rounded-2xl p-6 shadow-sm">

                                            {currentState?.success !== true ? (

                                                <form ref={formRef} action={formAction} className="space-y-4">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                                        ¿Te interesa esta propiedad?
                                                    </h3>
                                                    <input
                                                        type="hidden"
                                                        name="PropertySlug"
                                                        value={propertyData?.slug || ''}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="PropertyName"
                                                        value={propertyData?.NombrePropiedad || ''}
                                                    />
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Nombre
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="Nombre"
                                                            defaultValue={formValues.Nombre}
                                                            onChange={handleInputChange}
                                                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent outline-none transition-all ${currentState.errors?.Nombre ? "border-red-500 focus:ring-red-500" : ""}`}
                                                            placeholder="Tu nombre"
                                                            disabled={isPending}
                                                        />
                                                        {currentState.errors?.Nombre && (
                                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                                <span>⚠</span>
                                                                <span>{currentState.errors?.Nombre?.[0]}</span>
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Teléfono
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            name="Telefono"
                                                            placeholder="4451234567"
                                                            defaultValue={formValues.Telefono}
                                                            onChange={handleInputChange}
                                                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent outline-none transition-all ${currentState.errors?.Telefono ? "border-red-500 focus:ring-red-500" : ""}`}
                                                            disabled={isPending}
                                                        />
                                                        {currentState.errors?.Telefono && (
                                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                                <span>⚠</span>
                                                                <span>{currentState.errors?.Telefono?.[0]}</span>
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Correo electrónico
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="Email"
                                                            defaultValue={formValues.Email}
                                                            onChange={handleInputChange}
                                                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent outline-none transition-all ${currentState.errors?.Email ? "border-red-500 focus:ring-red-500" : ""}`}
                                                            placeholder="tu@email.com"
                                                            disabled={isPending}
                                                        />
                                                        {currentState.errors?.Email && (
                                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                                <span>⚠</span>
                                                                <span>{currentState.errors?.Email?.[0]}</span>
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Mensaje
                                                        </label>
                                                        <textarea
                                                            rows={4}
                                                            name="Mensaje"
                                                            defaultValue={formValues.Mensaje}
                                                            onChange={handleInputChange}
                                                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent outline-none transition-all resize-none ${currentState.errors?.Mensaje ? "border-red-500 focus:ring-red-500" : ""}`}
                                                            placeholder="Me gustaría obtener más información sobre esta propiedad..."
                                                            disabled={isPending}
                                                        />
                                                        {currentState.errors?.Mensaje && (
                                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                                <span>⚠</span>
                                                                <span>{currentState.errors?.Mensaje?.[0]}</span>
                                                            </p>
                                                        )}
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="w-full hover:cursor-pointer bg-navy hover:bg-navy-hover text-white font-semibold py-3 rounded-lg transition-colors"
                                                    >
                                                        {isPending ? "Enviando..." : "Enviar mensaje"}
                                                    </button>
                                                </form>
                                            ) :
                                                (
                                                    <div className="text-center flex flex-col items-center justify-center">
                                                        <CircleCheckBig className="w-12 h-12 text-green-600 mb-4" />
                                                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                                            ¡Gracias por contactarnos!
                                                        </h4>
                                                        <p className="text-gray-600">
                                                            Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.
                                                        </p>
                                                    </div>
                                                )}
                                            <Link
                                                href="https://wa.me/4454503606"
                                                target="_blank"
                                                className="w-full mt-2 text-balance inline-flex gap-2 items-center justify-center text-center bg-[#25D366] hover:bg-[#1DA851] hover:cursor-pointer text-white font-semibold py-3 rounded-lg transition-colors"
                                            >
                                                <img src="/assets/socialMedia/WhatsApp.svg" alt="WhatsApp" width={24} />
                                                Contactar por WhatsApp

                                            </Link>

                                            {/* {currentState?.success === true && currentState.message && (
                                                    <p className="text-center text-green-600 text-sm mt-2">
                                                        {currentState.message}
                                                    </p>
                                                )} */}

                                            {/* {currentState.error && (
                                                    <p className="text-center text-red-600 text-sm mt-2">
                                                        {currentState.error}
                                                    </p>
                                                )} */}

                                            <div className="mt-6 pt-6 border-t border-gray-200">
                                                <p className="text-sm text-gray-600 mb-3">
                                                    O contáctanos directamente:
                                                </p>
                                                <div className="space-y-2 text-sm">
                                                    <a
                                                        href="tel:+4454503606"
                                                        className="flex items-center gap-2 text-gray-700 hover:text-navy transition-colors"
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                            />
                                                        </svg>
                                                        445 450 3606
                                                    </a>

                                                </div>
                                            </div>
                                        </div>

                                        {/* Información adicional */}
                                        <div className="bg-navy/5 rounded-2xl p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                                Información importante
                                            </h3>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-navy rounded-full mt-2" />
                                                    <span>Documentación en regla</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-navy rounded-full mt-2" />
                                                    <span>Disponible para visitas con cita previa</span>
                                                </li>
                                                {!isRent && (
                                                    <div>
                                                        <li className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-navy rounded-full mt-2" />
                                                            <span>Acepta créditos bancarios</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 bg-navy rounded-full mt-2" />
                                                            <span>Asesoría legal incluida</span>
                                                        </li>
                                                    </div>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Propiedades relacionadas */}
                            {propertyIdReady && propertyData?.id && (
                                <div className="mt-16">
                                    <RelatedProperties idProperty={propertyData.id} />
                                </div>
                            )}
                        </div>

                        <div className={`${showLightbox ? '' : 'hidden'}`}>
                            <div
                                role="dialog"
                                aria-modal="true"
                                className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
                                onClick={() => setShowLightbox(false)}
                            >
                                {/* Botón de cerrar */}
                                <button
                                    aria-label="Cerrar modal"
                                    onClick={(e) => { e.stopPropagation(); setShowLightbox(false); }}
                                    className='absolute top-6 right-6 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition focus:outline-none cursor-pointer z-10'
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Contenedor de imagen (click no cierra) */}
                                <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto p-4">
                                    <Image
                                        src={imagesData[currentImageIndex].src}
                                        alt={imagesData[currentImageIndex].alt}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                {/* Flecha Prev fija (fuera de la imagen) */}
                                <button
                                    aria-label="Imagen anterior"
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className='absolute left-6 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition focus:outline-none cursor-pointer'
                                >
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>

                                {/* Flecha Next fija (fuera de la imagen) */}
                                <button
                                    aria-label="Imagen siguiente"
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className='absolute right-6 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition focus:outline-none cursor-pointer'
                                >
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 6l6 6-6 6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default PropertyDetail;