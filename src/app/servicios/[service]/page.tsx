import ServiceContent from "@/components/landing/serviceContent"
interface ServicePageProps {
    params: Promise<{ service: string }>;
}

async function ServicePage({ params }: ServicePageProps) {
    const {service} = await params;
  return (
    <ServiceContent serviceName={service} />
  )
}

export default ServicePage