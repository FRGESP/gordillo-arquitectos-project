"use server";
import axios from "axios";
import { API_URL, STRAPI_URL } from "./config";

export interface ImageInterface {
    src: string;
    alt: string;
    index: number;
}

interface Caracteristicas{
    id: number;
    Descripcion: string;
}

export interface Property {
    id: number;
    NombrePropiedad: string;
    Tipo: string;
    Precio: number;
    Direccion: string;
    Descripcion?: string;
    AreaTerreno?: number;
    AreaConstruccion: number;
    Bathrooms?: number;
    Recamaras?: number;
    Caracteristicas?: Caracteristicas[];
    slug: string;
    Imagenes?: ImageInterface[];
    LinkGoogleMaps?: string;
    LinkMapaGoogleMaps?: string;
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

const GetPropertiesImage = (images: ImageProjectInterface[]) => {
    // return images.map(image => ({
    //     src: `${STRAPI_URL}${image.url}`,
    //     alt: `Propiedad Imagen ${image.id}`,
    //     index: image.id
    // }));

    const firstImage = images[0];
    const result = [{
        src: `${STRAPI_URL}${firstImage.url}`,
        alt: `Propiedad Imagen ${firstImage.id}`,
        index: firstImage.id
    }];

    return result;
}

const GetPropertiesImages = (images: ImageProjectInterface[]) => {

    const result = images.map(image => ({
        src: `${STRAPI_URL}${image.url}`,
        alt: `Propiedad Imagen ${image.id}`,
        index: image.id
    }));

    return result;
}

//Inmobiliaria API fetch
export const getProperties = async () => {
    const response = await axios.get(`${API_URL}/propiedades?fields=updatedAt,id,NombrePropiedad,Precio,Recamaras,Bathrooms,Direccion,AreaTerreno,AreaConstruccion,slug,Tipo&populate[Imagenes][fields][0]=url&sort=updatedAt:desc`);
    const { data } = response.data;

    const properties: Property[] = data.map((property: any) => {
        const processedImages = property.Imagenes
            ? GetPropertiesImage(property.Imagenes)
            : [];

        return {
            id: property.id,
            NombrePropiedad: property.NombrePropiedad,
            Tipo: property.Tipo,
            Precio: property.Precio,
            Direccion: property.Direccion,
            AreaTerreno: property.AreaTerreno,
            AreaConstruccion: property.AreaConstruccion,
            Bathrooms: property.Bathrooms,
            Recamaras: property.Recamaras,
            slug: property.slug,
            Imagenes: processedImages
        };
    });

    return properties;
}

//Projects API fetch
export const getProjects = async () => {
    const response = await axios.get(`${API_URL}/proyectos?populate[Imagen][fields][0]=url&[fields][0]=Nombre`);
    const { data } = response.data;

    const projects: ProjectsInterface[] = data;

    const allImages = projects.flatMap(project => (
        project.Imagen
    ));

    // Mapear a formato esperado por MasonryGrid
    const projectImages = allImages.map((image, index) => ({
        src: `${STRAPI_URL}${image.url}`,
        alt: `Proyecto Imagen ${image.id}`,
        index: index
    }));
    console.log('Formatted images:', projectImages);
    return projectImages;
}

// Get property Details by slug
export const getPropertyBySlug = async (slug: string) => {
    const response = await axios.get(`${API_URL}/propiedades?fields=updatedAt,id,NombrePropiedad,Descripcion,Precio,Direccion,AreaTerreno,AreaConstruccion,Bathrooms,Recamaras,slug,Tipo,LinkGoogleMaps,LinkMapaGoogleMaps&populate[Imagenes][fields][0]=url&sort=updatedAt:desc&populate=Caracteristicas&filters[slug][$eq]=${slug}`);
    const { data } = response.data;

    const properties: Property[] = data.map( (property: any) => {
        const processedImages = property.Imagenes
            ? GetPropertiesImages(property.Imagenes)
            : [];

        const start = property.LinkMapaGoogleMaps.indexOf('"') + 1;
        const end = property.LinkMapaGoogleMaps.indexOf('"', start);
        const googleMapsLink = property.LinkMapaGoogleMaps ? property.LinkMapaGoogleMaps.slice(start, end) : "";

        return {
            id: property.id,
            NombrePropiedad: property.NombrePropiedad,
            Tipo: property.Tipo,
            Precio: property.Precio,
            Direccion: property.Direccion,
            Descripcion: property.Descripcion,
            AreaTerreno: property.AreaTerreno,
            AreaConstruccion: property.AreaConstruccion,
            Bathrooms: property.Bathrooms,
            Recamaras: property.Recamaras,
            Caracteristicas: property.Caracteristicas,
            slug: property.slug,
            Imagenes: processedImages,
            LinkGoogleMaps: property.LinkGoogleMaps,
            LinkMapaGoogleMaps: googleMapsLink,
        };
    });

    return properties;
}

export async function getRelatedProperties(
  propertyId: number,
  limit: number = 3
): Promise<Property[]> {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/propiedades`, {
      params: {
        'filters[id][$ne]': propertyId, // Excluir la propiedad actual
        'pagination[limit]': limit,
        'sort[0]': 'createdAt:desc',
        'populate': '*'
      }
    });

    return response.data.data.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      NombrePropiedad: item.NombrePropiedad,
      Descripcion: item.Descripcion,
      Precio: item.Precio,
      Tipo: item.Tipo,
      Direccion: item.Direccion,
      Recamaras: item.Recamaras,
      Bathrooms: item.Bathrooms,
      AreaTerreno: item.AreaTerreno,
      AreaConstruccion: item.AreaConstruccion,
      Slug: item.Slug,
      LinkMapaGoogleMaps: item.LinkMapaGoogleMaps,
      LinkGoogleMaps: item.LinkGoogleMaps,
      Imagenes: GetPropertiesImage(item.Imagenes || []),
      Caracteristicas: item.Caracteristicas || []
    }));
  } catch (error) {
    console.error('Error fetching related properties:', error);
    return [];
  }
}