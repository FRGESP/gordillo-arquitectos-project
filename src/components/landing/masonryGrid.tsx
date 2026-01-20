'use client'
import React, { useEffect, useState } from 'react'
import { getProjects } from '@/actions';
import Image from 'next/image';

// 1. Actualizamos la interfaz para incluir Título y Categoría (necesarios para el diseño)
interface ImageInterface {
    src: string;
    alt: string;
    title?: string; // Nuevo: Nombre del proyecto
    category?: string; // Nuevo: Tipo de proyecto (ej. "Residencial")
    index: number;
}

function MasonryGrid() {
    const [images, setImages] = useState<ImageInterface[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getProjectsData = async () => {
        setIsLoading(true);
        const projectsImages = await getProjects();
        // Asegúrate de que tu función getProjects devuelva 'title' y 'category'
        // si no, puedes mapearlo aquí provisionalmente.
        setImages(projectsImages);
        setIsLoading(false);
    }

    useEffect(() => {
        getProjectsData();
    }, [])

    // Skeleton actualizado para ser CUADRADO como el nuevo diseño
    const SkeletonCard = () => (
        <div className='relative aspect-square w-full'>
            <div className='absolute inset-0 rounded-lg bg-gray-200 animate-pulse'></div>
        </div>
    )

    // ... (Lógica del modal se mantiene igual: openAt, close, showNext, showPrev) ...
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

    // ... (UseEffects de scroll y teclado se mantienen igual) ...
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

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

    // SlideImage se mantiene igual...
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
                    className={['object-contain rounded-md', 'transition-all duration-300 ease-out', entered ? 'opacity-100 translate-x-0' : direction === 1 ? 'opacity-0 translate-x-10' : 'opacity-0 -translate-x-10'].join(' ')}
                    draggable={false}
                />
            </div>
        );
    };

    return (
        <section className=''>
            {/* <div className={`md:p-3 relative container mx-auto ${!isExpanded ? ' overflow-y-hidden md:max-h-none' : 'max-h-none'}`}> */}
            <div className={` relative container mx-auto`}>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                    {isLoading ? (
                        Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        images.map((image) => (
                            <div
                                key={image.index}
                                className='group relative aspect-square w-full overflow-hidden cursor-pointer rounded-lg'
                                onClick={() => openAt(image.index)}
                            >
                                {/* Imagen de fondo */}
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill // Ocupa todo el contenedor padre
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                    className='object-cover transition-transform duration-700 ease-in-out group-hover:scale-110'
                                />

                                {/* Capa Oscura + Texto (Overlay) */}
                                {/* <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <h3 className='text-xl font-bold text-white tracking-widest uppercase text-center px-4'>
                                        {image.title || "Nombre del Proyecto"}
                                    </h3>
                                    <p className='mt-2 text-sm text-gray-300 uppercase tracking-wider'>
                                        {image.category || "Categoría"}
                                    </p>
                                </div> */}
                            </div>
                        ))
                    )}
                </div>
                {/* ------------------------------------- */}

                {/* {!isLoading && !isExpanded && images.length > 7 ? (
                    <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/80 to-transparent pt-20 pb-4 text-center z-10 md:hidden'>
                        <button className='inline-flex items-center gap-2 text-white font-semibold px-6 py-3 bg-black rounded-full cursor-pointer transition hover:bg-gray-800' onClick={() => setIsExpanded(true)}>
                            <span>Ver todos los proyectos</span>
                        </button>
                    </div>
                ) : !isLoading && isExpanded ? (
                    <div className='w-full text-center p-8'>
                        <button className='inline-flex items-center gap-2 text-gray-600 font-semibold hover:text-black' onClick={() => setIsExpanded(false)}>
                            <span>Ver menos</span>
                        </button>
                    </div>
                ) : null} */}
            </div>

            {/* Modal (Sin cambios mayores, solo asegurando que funcione) */}
            <div className={`${isOpen ? '' : 'hidden'}`}>
                {currentIndex !== null && (
                    <div className='fixed inset-0 bg-black/90 flex items-center justify-center z-50' onClick={close}>
                        <button onClick={(e) => { e.stopPropagation(); close(); }} className='absolute top-6 right-6 p-2 text-white hover:text-gray-300 z-50 hover:cursor-pointer'>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>

                        <div className='w-full h-full flex items-center justify-center' onClick={(e) => e.stopPropagation()}>
                            <SlideImage src={images[currentIndex].src} alt={images[currentIndex].alt} direction={direction} />
                        </div>

                        <button onClick={(e) => { e.stopPropagation(); showPrev(); }} className='absolute left-4 p-4 text-white hover:bg-white/10 rounded-full transition hover:cursor-pointer'>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); showNext(); }} className='absolute right-4 p-4 text-white hover:bg-white/10 rounded-full transition hover:cursor-pointer'>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 6l6 6-6 6" /></svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default MasonryGrid