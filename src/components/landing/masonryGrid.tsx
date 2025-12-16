'use client'
import React, { use, useEffect, useState } from 'react'
import { getProjects } from '@/actions';
import Image from 'next/image';


interface ImageInterface {
    src: string;
    alt: string;
    index: number;
}

interface ImageProjectInterface {
    id: string;
    url: string;
}

interface ProjectsInterface {
    id: number;
    Nombre: string;
    Imagen: ImageProjectInterface[];
}

// const images: ImageInterface[] = [
//     { src: "/assets/images/Casa.jpg", alt: "Casa", index: 0 },
//     { src: "/assets/images/pipila.webp", alt: "Pipila", index: 1 },
//     { src: "/assets/images/interiorPipila.jpg", alt: "Interior Pipila", index: 2 },
//     { src: "/assets/images/Casa.jpg", alt: "Casa", index: 3 },
//     { src: "/assets/images/pipila.webp", alt: "Pipila", index: 4 },
//     { src: "/assets/images/pipila.webp", alt: "Pipila", index: 5 },
//     { src: "/assets/images/pipila.webp", alt: "Pipila", index: 6 },
//     { src: "/assets/images/interiorPipila.jpg", alt: "Interior Pipila", index: 7 },
//     { src: "/assets/images/Casa.jpg", alt: "Casa", index: 8 },
//     { src: "/assets/images/Casa.jpg", alt: "Casa", index: 9 },
//     { src: "/assets/images/Casa.jpg", alt: "Casa", index: 10 },
//     { src: "/assets/images/Casa.jpg", alt: "Casa", index: 11 },
//     { src: "/assets/images/Casa.jpg", alt: "Casa", index: 12 },
// ]

function MasonryGrid() {
    const [images, setImages] = useState<ImageInterface[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<1 | -1>(1); // 1: next, -1: prev
    const [isExpanded, setIsExpanded] = useState(false);

    const getProjectsData = async () => {
        const projectsImages = await getProjects();

        console.log('Projects fetched:', projectsImages);

        setImages(projectsImages);

    }


    useEffect(() => {
        getProjectsData();
},[])

    const openAt = (index: number) => {
        setCurrentIndex(index);
        setDirection(1);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setCurrentIndex(null);
    };

    const showNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => {
            if (prev === null) return 0;
            return (prev + 1) % images.length;
        });
    };

    const showPrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => {
            if (prev === null) return 0;
            return (prev - 1 + images.length) % images.length;
        });
    };

    // Bloquear scroll cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup al desmontar el componente
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Navegación por teclado
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    // Componente para aplicar deslizado suave al cambiar de imagen
    const SlideImage: React.FC<{ src: string; alt: string; direction: 1 | -1 }> = ({ src, alt, direction }) => {
        const [entered, setEntered] = useState(false);
        useEffect(() => {
            setEntered(false);
            const r = requestAnimationFrame(() => setEntered(true));
            return () => cancelAnimationFrame(r);
        }, [src, direction]);

        return (
            <div className="relative w-[90vw] h-[80vh]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className={[
                        'object-contain rounded-md',
                        'transition-all duration-300 ease-out',
                        entered ? 'opacity-100 translate-x-0' : direction === 1 ? 'opacity-0 translate-x-10' : 'opacity-0 -translate-x-10'
                    ].join(' ')}
                    draggable={false}
                />
            </div>
        );
    };

    return (
        <section className=''>
            <div className={`p-3 relative container mx-auto ${!isExpanded ? 'max-h-[250vh] md:max-h-[80vh] overflow-y-hidden' : 'max-h-none'}`}>
                <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'>
                    {images.map((image) => (
                        <div key={image.index} className='mb-4 break-inside-avoid-column'>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={800}
                                height={600}
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className='w-full h-auto object-cover rounded-lg transition duration-200 hover:scale-105 cursor-pointer'
                                onClick={() => openAt(image.index)}
                            />
                        </div>
                    ))}
                </div>
                {!isExpanded ? (
                    <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-50 to-transparent text-center p-4'>
                        <button className='inline-flex items-center gap-2 text-black font-semibold px-3 py-2 bg-secondary rounded-xl cursor-pointer transition duration-200 ease-in-out hover:bg-blue-800 hover:text-white hover:scale-105' onClick={() => setIsExpanded(true)}>
                            <span>Ver más</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className='w-full text-center p-4'>
                        <button className='inline-flex items-center gap-2 text-black font-semibold px-3 py-2 bg-gray-300 rounded-xl cursor-pointer transition duration-200 ease-in-out hover:bg-gray-400 hover:scale-105' onClick={() => setIsExpanded(false)}>
                            <span>Ver menos</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='rotate-180'>
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <div className={`${isOpen ? '' : 'hidden'}`}>
                {currentIndex !== null && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
                        onClick={close}
                    >
                        {/* Botón de cerrar */}
                        <button
                            aria-label="Cerrar modal"
                            onClick={(e) => { e.stopPropagation(); close(); }}
                            className='absolute top-6 right-6 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition focus:outline-none cursor-pointer z-10'
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Contenedor de imagen (click no cierra) */}
                        <div
                            className='relative cursor-default'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <SlideImage
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                direction={direction}
                            />
                        </div>

                        {/* Flecha Prev fija (fuera de la imagen) */}
                        <button
                            aria-label="Imagen anterior"
                            onClick={(e) => { e.stopPropagation(); showPrev(); }}
                            className='absolute left-6 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition focus:outline-none cursor-pointer'
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        {/* Flecha Next fija (fuera de la imagen) */}
                        <button
                            aria-label="Imagen siguiente"
                            onClick={(e) => { e.stopPropagation(); showNext(); }}
                            className='absolute right-6 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition focus:outline-none cursor-pointer'
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 6l6 6-6 6" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default MasonryGrid