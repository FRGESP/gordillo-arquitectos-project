import Image from "next/image";
import Link from "next/link"; // <-- 1. Importa Link
import { MapPin, Ruler, Square, Key, DollarSign, Bath, Bed } from "lucide-react";
import type { Property } from "@/actions";

type Props = {
  property: Property;
};

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

function PropertyCard({ property }: Props) {
  const img = property.Imagenes?.[0];
  const isRent = property.Tipo?.toLowerCase() === 'renta';

  console.log('Property in PropertyCard:', property);

  return (
    <Link 
      href={`/inmobiliaria/${property.slug}`} 
      className="group block overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md transition hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <div className={`absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${isRent ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'}`}>
          {isRent ? <Key size={14} /> : <DollarSign size={14} />}
          {isRent ? 'En renta' : 'En venta'}
        </div>
        {img ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={false}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {property.NombrePropiedad}
          </h3>
          <div className="shrink-0 font-bold text-navy-dark">
            {currency.format(property.Precio)}{property.Tipo == 'Renta' ? '/mes' : ''}
          </div>
        </div>

        {property.Direccion && (
          <div className="mt-1 flex items-center gap-1.5  text-gray-500">
            <MapPin size={16} className="text-navy"/>
            <span className="line-clamp-1">{property.Direccion}</span>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-gray-600">
          {property.AreaConstruccion ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 ring-1 ring-gray-200">
              <Ruler size={14} className="text-navy"/> {property.AreaConstruccion} m² construcción
            </span>
          ) : null}

          {property.AreaTerreno ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 ring-1 ring-gray-200">
              <Square size={14} className="text-navy"/> {property.AreaTerreno} m² terreno
            </span>
          ) : null}

          {property.Recamaras && property.Recamaras > 0 ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 ring-1 ring-gray-200">
              <Bed size={14} className="text-navy"/> {property.Recamaras} {property.Recamaras === 1 ? 'recámara' : 'recámaras'}
            </span>
          ) : null}

          {property.Bathrooms && property.Bathrooms > 0 ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 ring-1 ring-gray-200">
              <Bath size={14} className="text-navy"/> {property.Bathrooms} {property.Bathrooms === 1 ? 'baño' : 'baños'}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;