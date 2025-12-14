import PropertyDetail from "@/components/landing/propertyDetail";

interface PropertyPageProps {
  params: Promise<{ propiedad: string }>;
}

async function PropertyPage({ params }: PropertyPageProps) {
  const { propiedad } = await params;

  return (
    <div className="pt-16">
      <PropertyDetail
        propertySlugProp={propiedad}
      />
    </div>
  );
}

export default PropertyPage;