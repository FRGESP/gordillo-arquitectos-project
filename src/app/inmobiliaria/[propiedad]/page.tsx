import PropertyDetail from "@/components/landing/propertyDetail";
import type { Property } from "@/actions";

interface PropertyPageProps {
  params: { propiedad: string };
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