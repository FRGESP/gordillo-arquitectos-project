"use client";

import { Property } from "@/actions";
import { use, useEffect, useState } from "react";
import { getRelatedProperties } from "@/actions";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import PropertyCard from "../landing/propertyCard";

interface RelatedPropertiesProps {
    idProperty?: number;
}

function RelatedProperties({ idProperty }: RelatedPropertiesProps) {
    // Guarda la información de las propiedades relacionadas
    const [relatedPropertiesData, setRelatedPropertiesData] = useState<Property[]>([]);

    const fetchRelatedProperties = async () => {
        console.log('Fetching related properties for ID:', idProperty);
        const properties = await getRelatedProperties(idProperty || 0, 3);
        setRelatedPropertiesData(properties);
    };

    useEffect(() => {
        fetchRelatedProperties();
    }, []);


    return (
        <div>
            {relatedPropertiesData.length > 0 && (
                <div className="mt-12 pt-12 border-t border-gray-200">
                    <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-3xl text-center font-bold text-gray-900">
                            {idProperty ? 'Propiedades relacionadas' : 'Nuestro catálogo de propiedades'}
                        </h2>

                        <div className="flex items-center justify-center">
                            <Link
                                href="/inmobiliaria"
                                className="text-navy hover:text-navy-hover font-semibold flex items-center gap-1 transition-colors"
                            >
                                Ver todas
                                <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedPropertiesData.slice(0, 3).map((prop) => (
                            <PropertyCard key={prop.id} property={prop} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default RelatedProperties