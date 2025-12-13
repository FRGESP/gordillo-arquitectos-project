import React from 'react';
import { getProperties } from '@/actions';
import PropertyCard from '@/components/landing/propertyCard';

async function PropertiesPage() {
  const properties = await getProperties();
  
  // const useFilters = () => {
  //   const tipoValue = (document.getElementById('tipoSelect') as HTMLSelectElement).value;
  //   const ordenValue = (document.getElementById('ordenSelect') as HTMLSelectElement).value;
  //   console.log('Tipo seleccionado:', tipoValue);
  //   console.log('Orden seleccionado:', ordenValue);
  // }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">

        <h1 className="text-2xl font-semibold tracking-tight">Propiedades</h1>
        <p className="mt-1 text-lg text-gray-600">Explora nuestro inventario de propiedades disponibles.</p>
        {/* <div className="py-4">
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded-lg p-2">
              <option value="">Operación</option>
              <option value="venta">Venta</option>
              <option value="renta">Renta</option>
            </select>

            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 flex-grow"
              placeholder="Buscar propiedades..."
            />
          </div>
        </div> */}

        <div className="flex flex-col sm:flex-row-reverse items-stretch gap-2 py-4">

          <select id='ordenSelect'className="border border-gray-300 rounded-lg p-2 sm:w-[150px]">
            <option value="">Ordenar por...</option>
            <option value="precio">Precio Ascendente</option>
            <option value="precio-desc">Precio Descendente</option>
            <option value="terreno">Terreno Ascendente</option>
            <option value="terreno-desc">Terreno Descendente</option>
            <option value="construccion">Construcción Ascendente</option>
            <option value="construccion-desc">Construcción Descendente</option>
          </select>

          <select id='tipoSelect' className="border border-gray-300 rounded-lg p-2 sm:w-[150px]">
            <option value="">Tipo</option>
            <option value="venta">Venta</option>
            <option value="renta">Renta</option>
          </select>

          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 flex-grow"
            placeholder="Buscar propiedades..."
          />
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertiesPage;