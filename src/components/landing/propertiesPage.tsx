"use client";
import { getProperties } from '@/actions';
import PropertyCard from '@/components/landing/propertyCard';
import { useEffect, useMemo, useState } from 'react';
import type { Property } from '@/actions';

function PropertiesPage() {
  // Estado para las propiedades
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Guarda la información de los filtros seleccionados
  const [search, setSearch] = useState<string>('');
  const [tipoFilter, setTipoFilter] = useState<string>('');
  const [ordenFilter, setOrdenFilter] = useState<string>('');

  // Cargar propiedades al montar el componente
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);
  

  const filtered = useMemo(() => {
    const bySearch = (p: Property) => 
      p.NombrePropiedad.toLowerCase().includes(search.toLowerCase());
    const byTipo = (p: Property) => 
      tipoFilter === '' || p.Tipo?.toLowerCase() === tipoFilter.toLowerCase();
    const sortBy = (a: Property, b: Property) => {
      if (ordenFilter === 'precio') return (a.Precio || 0) - (b.Precio || 0);
      if (ordenFilter === 'precio-desc') return (b.Precio || 0) - (a.Precio || 0);
      if (ordenFilter === 'terreno') return (a.AreaTerreno || 0) - (b.AreaTerreno || 0);
      if (ordenFilter === 'terreno-desc') return (b.AreaTerreno || 0) - (a.AreaTerreno || 0);
      if (ordenFilter === 'construccion') return (a.AreaConstruccion || 0) - (b.AreaConstruccion || 0);
      if (ordenFilter === 'construccion-desc') return (b.AreaConstruccion || 0) - (a.AreaConstruccion || 0);
      return 0;
    };
    
    return properties
      .filter(p => bySearch(p) && byTipo(p))
      .sort(sortBy);
  }, [properties, search, tipoFilter, ordenFilter])
  
  // const useFilters = () => {
  //   const tipoValue = (document.getElementById('tipoSelect') as HTMLSelectElement).value;
  //   const ordenValue = (document.getElementById('ordenSelect') as HTMLSelectElement).value;
  //   console.log('Tipo seleccionado:', tipoValue);
  //   console.log('Orden seleccionado:', ordenValue);
  // }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-stone">
      <div className="container mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Catálogo de Propiedades
          </h1>
          <p className="text-lg md:text-xl text-stone-dark max-w-2xl mx-auto">
            Explora nuestro inventario de propiedades disponibles para venta y renta.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <label htmlFor="searchInput" className="block text-sm font-medium text-stone-dark mb-2">
                Buscar propiedad
              </label>
              <input
                id="searchInput"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent transition-all outline-none"
                placeholder="Busca por nombre de propiedad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Tipo de operación */}
            <div className="w-full lg:w-48">
              <label htmlFor="tipoSelect" className="block text-sm font-medium text-stone-dark mb-2">
                Tipo de operación
              </label>
              <select 
                id='tipoSelect' 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent transition-all outline-none bg-white cursor-pointer"
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="venta">Venta</option>
                <option value="renta">Renta</option>
              </select>
            </div>

            {/* Ordenar */}
            <div className="w-full lg:w-56">
              <label htmlFor="ordenSelect" className="block text-sm font-medium text-stone-dark mb-2">
                Ordenar por
              </label>
              <select 
                id='ordenSelect'
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent transition-all outline-none bg-white cursor-pointer"
                value={ordenFilter}
                onChange={(e) => setOrdenFilter(e.target.value)}
              >
                <option value="">Más recientes</option>
                <option value="precio">Precio: Menor a mayor</option>
                <option value="precio-desc">Precio: Mayor a menor</option>
                <option value="terreno">Terreno: Menor a mayor</option>
                <option value="terreno-desc">Terreno: Mayor a menor</option>
                <option value="construccion">Construcción: Menor a mayor</option>
                <option value="construccion-desc">Construcción: Mayor a menor</option>
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          {!isLoading && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-stone-dark">
                {filtered.length === 0 ? (
                  'No se encontraron propiedades'
                ) : (
                  <>
                    Mostrando <span className="font-semibold text-navy">{filtered.length}</span> 
                    {filtered.length === 1 ? ' propiedad' : ' propiedades'}
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="aspect-[4/3] bg-gray-300 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;