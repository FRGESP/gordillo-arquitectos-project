import { servicesData } from "@/data/servicesData"
import Image from "next/image";
import Link from "next/link";
import RelatedProperties from "../elements/relatedProperties";

interface ServiceContentProps {
    serviceName: string
}

function ServiceContent({ serviceName }: ServiceContentProps) {
    const serv = servicesData.find(service => service.slug === serviceName);
    const otherServ1 = serv?.otherServices ? servicesData.find(s => s.slug === serv.otherServices?.[0]) : null;
    const otherServ2 = serv?.otherServices ? servicesData.find(s => s.slug === serv.otherServices?.[1]) : null;
    const otherServ3 = serv?.otherServices ? servicesData.find(s => s.slug === serv.otherServices?.[2]) : null;

    return (
        <section className='bg-gray-50 py-24'>
            <div className="px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className='container mx-auto'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8 pb-6 text-center'>
                        <h2 className="mt-3 text-3xl md:text-5xl font-bold text-navy">{serv?.title}</h2>
                    </div>
                    <div className='text-center mb-16'>
                        <p className="text-lg md:text-2xl text-black  mx-auto">
                            {serv?.description}
                        </p>
                    </div>

                    {/* <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                        {serv && (
                            <Image
                                src={serv.imageUrl}
                                alt={serv.title}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div> */}

                    <div className="w-full flex justify-center">
                        <div className="relative w-full md:w-3/4 aspect-[4/3] md:aspect-[16/9] max-h-[55vh] rounded-lg overflow-hidden shadow-lg">
                            {serv && (
                                <Image
                                    src={serv.imageUrl}
                                    alt={serv.title}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                    </div>

                    {/* <div className='mt-12 text-gray-700 text-lg md:text-xl space-y-6'>
                        {serv?.details.map((detail, index) => (
                            <div key={index}>
                                <h3 className="text-2xl font-semibold text-black mb-4">{detail.title}</h3>
                                <p className="mb-4">{detail.description}</p>
                                
                            </div>
                        ))}
                    </div> */}

                    <div className='mt-20 text-gray-700 text-lg md:text-xl space-y-12'>
                        {serv?.details.map((detail, index) => (
                            <div key={index} className="grid md:grid-cols-2 gap-8">
                                <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                                    <div className="flex items-center justify-center md:justify-start space-x-3 mb-5 w-full">
                                        <div className="text-xl md:text-2xl font-bold bg-navy text-white rounded-full w-10 aspect-square flex items-center justify-center">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-bold text-black w-full flex md:max-w-3/4">
                                            {detail.title}
                                        </h3>
                                    </div>
                                    <p className="mb-4 md:text-justify">{detail.description}</p>
                                </div>
                                <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                                        {detail.imageUrl && (
                                            <Image
                                                src={detail.imageUrl}
                                                alt={detail.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <div className="bg-gradient-to-r from-navy to-blue-600 rounded-3xl p-12 text-white">
                            <h3 className="text-3xl font-bold mb-4">{serv?.cta.principalCTA}</h3>
                            <p className="text-xl mb-8 opacity-90">
                                {serv?.cta.complement}
                            </p>
                            <Link 
                                href={serv?.cta.url || '/contacto'} target="_blank"
                                className="inline-block bg-white text-navy px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                            >
                                {serv?.cta.buttonText}
                            </Link>
                        </div>
                    </div>

                    {serviceName === 'inmobiliaria' && (
                        <RelatedProperties />
                    )}

                    <div className="mt-25 border-t pt-12 border-gray-200">
                        <h3 className="text-3xl font-bold text-navy mb-12 text-center">Otros servicios que te pueden interesar</h3>
                        <div className='grid md:grid-cols-3 gap-8'>
                            {[otherServ1, otherServ2, otherServ3].map((otherServ, index) => (
                                otherServ ? (
                                    <div
                                        key={index}
                                        className='bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full'
                                    >
                                        {/* Card Header: use responsive aspect-ratio instead of fixed heights for better responsiveness */}
                                        <div className="relative aspect-video md:aspect-[16/8]">
                                            <Image
                                                src={otherServ.imageUrl}
                                                alt={otherServ.title}
                                                fill
                                                className="object-cover"
                                            />

                                        </div>

                                        {/* Card Body */}
                                        <div className='p-6 flex flex-col justify-between flex-1'>
                                            <div className="space-y-4">
                                                <h3 className="text-2xl font-bold text-navy tracking-wide">
                                                    {otherServ.title}
                                                </h3>
                                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                                    {otherServ.description}
                                                </p>
                                            </div>

                                            {/* Call to Action */}
                                            <div className='mt-2 pt-6 border-t border-gray-100 space-y-2'>
                                                <Link href={`/servicios/${otherServ.slug}`} className={`w-full bg-[#e0e0e0] text-black font-semibold py-3 px-6 rounded-xl tracking-wide transition duration-200 ease-in-out hover:scale-105 hover:bg-secondary-hover cursor-pointer flex justify-center items-center`}>
                                                    Más información
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default ServiceContent