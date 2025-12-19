import { MetadataRoute } from 'next'
import { servicesData } from '@/data/servicesData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gordilloarquitectos.mx'
  
  // Rutas estáticas principales
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/inmobiliaria`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ]

  // Rutas dinámicas de servicios
  const serviciosUrls = servicesData.map(servicio => ({
    url: `${baseUrl}/servicios/${servicio.slug}`,
    lastModified: new Date('2025-12-12'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...serviciosUrls]
}