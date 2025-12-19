"use server";
import axios from "axios";
import { API_URL, STRAPI_URL } from "./config";
import * as z from "zod";
import { Resend } from "resend";
import ContactThankYouEmail from "@/components/elements/contactEmailTempleate";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ImageInterface {
    src: string;
    alt: string;
    index: number;
    id?: string;
    url?: string;
}

interface Caracteristicas {
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
    LinkGoogleMaps: string;
    LinkMapaGoogleMaps: string;
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

export type FormState = {
    success?: boolean;
    error?: string;
    message?: string;
    errors?: {
        Nombre?: string[];
        Email?: string[];
        Telefono?: string[];
        Mensaje?: string[];
    };
}

export async function submitContactForm(
    _prevState: FormState,
    formData: FormData): Promise<FormState> {
    try {
        const formSchema = z.object({
            Nombre: z.string().min(1, "El nombre es obligatorio"),
            Email: z.string().email("Email inválido"),
            Telefono: z.string().min(10, "Teléfono inválido"),
            Mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
            PropertyName: z.string().optional(),
            PropertySlug: z.string().optional(),
        })

        const validatedFields = formSchema.safeParse(
            Object.fromEntries(formData.entries())
        );

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.flatten().fieldErrors,
                error: "Por favor intente de nuevo con los datos correctos.",
            };
        }


        const { error: ownerError } = await resend.emails.send({
            from: "Gordillo Arquitectos <info@contacto.gordilloarquitectos.mx>",
            to: ["fernandogordilloortega@gmail.com"],
            subject: `Interés en propiedad Página Web: ${validatedFields.data.PropertyName}`,
            html: `<h2>Nuevo mensaje de contacto para propiedad: ${validatedFields.data.PropertyName}</h2>
                    <p><strong>Propiedad de interés:</strong> ${validatedFields.data.PropertyName}</p>
                    <p><strong>Slug de la Propiedad:</strong> ${validatedFields.data.PropertySlug}</p>
                   <p><strong>Nombre del contacto:</strong> ${validatedFields.data.Nombre}</p>
                   <p><strong>Email:</strong> ${validatedFields.data.Email}</p>
                   <p><strong>Teléfono:</strong> ${validatedFields.data.Telefono}</p>
                   <p><strong>Mensaje:</strong></p>
                   <p>${validatedFields.data.Mensaje}</p>`,
        });

        if (ownerError) {
            console.error("Error al enviar correo al propietario:", ownerError);
            return {
                success: false,
                error: "Error al procesar el mensaje. Por favor intente nuevamente.",
            };
        }

        // 2. Enviar correo de confirmación al usuario
        const { error: clientError } = await resend.emails.send({
            from: "Gordillo Arquitectos <info@contacto.gordilloarquitectos.mx>",
            to: [validatedFields.data.Email],
            subject: "Gracias por contactarnos - Gordillo Arquitectos",
            // html: `<p>Hola ${validatedFields.data.Nombre},</p>
            //        <p>Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
            //        <p>Saludos,<br/>Gordillo Arquitectos</p>`,
            react: ContactThankYouEmail()

        });

        if (clientError) {
            console.error("Error al enviar confirmación al cliente:", clientError);
        }

        return {
            success: true,
            message: '¡Formulario enviado con éxito! Nos pondremos en contacto pronto.',
        }
    } catch (error) {
        console.error("Error al enviar el formulario de contacto:", error);
        return {
            success: false,
            error: 'Ocurrió un error al procesar el formulario.',
        };
    }
}

function getImageUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${process.env.STRAPI_URL}${url}`;
}

const GetPropertiesImage = (images: ImageInterface[]) => {

    const firstImage = images[0];
    const result = [{
        src: getImageUrl(firstImage.url),
        alt: `Propiedad Imagen ${firstImage.id}`,
        index: firstImage.id
    }];

    return result;
}

const GetPropertiesImages = (images: ImageInterface[]) => {

    const result = images.map(image => ({
        src: getImageUrl(image.url),
        alt: `Propiedad Imagen ${image.id}`,
        index: image.id
    }));

    return result;
}

//Inmobiliaria API fetch
export const getProperties = async () => {
    const response = await axios.get(`${API_URL}/propiedades?fields=updatedAt,id,NombrePropiedad,Precio,Recamaras,Bathrooms,Direccion,AreaTerreno,AreaConstruccion,slug,Tipo&populate[Imagenes][fields][0]=url&sort=updatedAt:desc`);
    const { data } = response.data;

    const properties: Property[] = data.map((property: Property) => {
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
        src: getImageUrl(image.url),
        alt: `Proyecto Imagen ${image.id}`,
        index: index
    }));
    return projectImages;
}

// Get property Details by slug
export const getPropertyBySlug = async (slug: string) => {
    const response = await axios.get(`${API_URL}/propiedades?fields=updatedAt,id,NombrePropiedad,Descripcion,Precio,Direccion,AreaTerreno,AreaConstruccion,Bathrooms,Recamaras,slug,Tipo,LinkGoogleMaps,LinkMapaGoogleMaps&populate[Imagenes][fields][0]=url&sort=updatedAt:desc&populate=Caracteristicas&filters[slug][$eq]=${slug}`);
    const { data } = response.data;

    const properties: Property[] = data.map((property: Property) => {
        const processedImages = property.Imagenes
            ? GetPropertiesImages(property.Imagenes)
            : [];

        const start = property.LinkMapaGoogleMaps.indexOf('"') + 1;
        const end = property.LinkMapaGoogleMaps.indexOf('"', start);
        const googleMapsLink = property.LinkMapaGoogleMaps.slice(start, end);

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

        return response.data.data.map((item: Property) => ({
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
            Slug: item.slug,
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