import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
	Tailwind,
	Img,
} from "@react-email/components";

const ContactThankYouEmail = () => {
	return (
		<Html lang="en" dir="ltr">
			<Head />
			<Preview>
				¡Gracias por contactarnos! Pronto nos pondremos en contacto.
			</Preview>
			<Tailwind>
				<Body className="bg-black font-sans py-[40px]">
					<Container className="bg-white rounded-[8px] max-w-[600px] mx-auto p-[40px]">
						{/* Header */}
						{/* <Section className="text-center mb-[40px]">
							<Img
								src={`${process.env.NEXT_PUBLIC_URL}/assets/images/logo.png`}
								alt="Gordillo Arquitectos"
								width="180"
								height="auto"
								className="mx-auto"
							/>
						</Section> */}
						<Section className="text-center mb-[32px]">
							<Heading className="text-[32px] font-bold text-black m-0 mb-[16px]">
								¡Gracias por Contactarnos!
							</Heading>
						</Section>

						{/* Main Content */}
						<Section className="mb-[32px]">
							<Text className="text-[16px] text-gray-800 mb-[16px] leading-[24px]">
								Hemos recibido tu mensaje y queremos agradecerte por tomarte el 
								tiempo de contactar con Gordillo Arquitectos.
							</Text>

							<Text className="text-[16px] text-gray-800 mb-[24px] leading-[24px]">
								Tu consulta es muy importante para nosotros. Nuestro equipo 
								revisará tu solicitud y nos pondremos en contacto contigo 
								a la brevedad posible.
							</Text>

							<Text className="text-[16px] text-gray-800 leading-[24px]">
								Atentamente,
								<br />
								<span className="font-semibold">Gordillo Arquitectos</span>
							</Text>
						</Section>

						{/* Footer */}
						<Section className="border-t border-solid border-gray-200 pt-[24px] mt-[40px]">
							<Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
								© 2025 Gordillo Arquitectos. Todos los derechos reservados.
							</Text>
							
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default ContactThankYouEmail;