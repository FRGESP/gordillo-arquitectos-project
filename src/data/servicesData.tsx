export type DetailService = {
    title: string;
    description: string;
    imageUrl?: string;
}

export type CTAService = {
    principalCTA: string;
    complement: string;
    buttonText: string;
    url: string;
}

export type Service = {
    id: number;
    slug: string;
    title: string;
    description: string;
    details: DetailService[];
    imageUrl: string;
    cta: CTAService;
    otherServices?: string[];
}

export const servicesData: Service[] = [
    {
        id: 1,
        slug:'proyectos',
        title: 'Proyectos',
        description:
        "Planificamos y desarrollamos proyectos arquitectónicos adaptados a tus necesidades, garantizando diseño, funcionalidad y estética en cada etapa.",
        details: [
            {
                title: 'Diseño arquitectónico integral',
                description: 'Abordamos cada proyecto desde una perspectiva global y multidisciplinaria. El Diseño Arquitectónico Integral significa que consideramos cada variable: el análisis del sitio, la normativa vigente, la optimización de recursos, la sostenibilidad y, por supuesto, la estética. Nuestro equipo trabaja en conjunto para desarrollar una solución completa que armoniza forma, función y viabilidad, garantizando un resultado coherente y de la más alta calidad.',
                imageUrl: '/assets/images/services/Proyectos-Diseño.webp',
            },
            {
                title: 'Planos y renders profesionales',
                description: 'Para que puedas conocer y enamorarte de tu proyecto antes de colocar el primer ladrillo, creamos renders fotorrealistas de alta calidad y planos técnicos detallados. Estas herramientas son esenciales para que explores cada espacio, material y acabado con total claridad. Con nuestras visualizaciones, tu futura obra cobra vida, facilitando la toma de decisiones y asegurando que el resultado final sea exactamente como lo imaginaste.',
                imageUrl: '/assets/images/services/Proyectos-Renders.webp',
            },
            {
                title: 'Asesoría técnica durante todo el proceso',
                description: 'Sabemos que el proceso de construcción puede ser complejo, por eso te acompañamos en cada paso. Nuestra asesoría técnica significa que tienes a un experto de tu lado desde el diseño hasta la entrega de llaves. Supervisamos la obra, resolvemos dudas, gestionamos a los contratistas y velamos por tus intereses, garantizándote la tranquilidad de que tu proyecto se ejecuta con la máxima calidad y sin sorpresas.',
                imageUrl: '/assets/images/services/Proyectos-Asesoria.webp',
            }
        ],
        imageUrl: '/assets/images/proyectos.jpg',
        cta: {
            principalCTA: '¿Tienes una idea en mente?',
            complement: 'Permítenos transformarla en un diseño arquitectónico que refleje tu visión y supere tus expectativas.',
            buttonText: 'Agendar una Asesoría',
            url: 'https://wa.me/524454503606?text=%C2%A1Hola!%20Me%20interesa%20el%20servicio%20de%20Proyectos.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.'
        },
        otherServices: ['construccion','muebles-a-medida','urbanizacion'],
    }, {
        id: 2,
        slug:'construccion',
        title: 'Construcción',
        description:
        "Ejecutamos obras con los más altos estándares, cuidando cada detalle desde la cimentación hasta la entrega final.",
        details: [
            {
                title: 'Construcción en general',
                description: 'Con una sólida trayectoria en el sector, ofrecemos un servicio integral de construcción que abarca proyectos de diversa escala y complejidad. Nuestro equipo de profesionales y nuestra red de proveedores de confianza nos permiten gestionar y ejecutar cada obra con la máxima eficiencia y calidad. Desde la cimentación hasta los acabados finales, nos hacemos cargo de todo el proceso para que tu visión se construya sobre bases firmes y duraderas.',
                imageUrl: '/assets/images/services/Construccion-construccion.webp',
            },
            {
                title: 'Nueva construcción',
                description: 'Una nueva construcción es una de las inversiones más importantes de tu vida. Por eso, nuestro enfoque se centra en maximizar el valor de tu patrimonio. Nos aseguramos de que cada decisión, desde el diseño estructural hasta la elección de acabados, contribuya a crear una propiedad de alta calidad, funcional y con un gran potencial de revalorización en el mercado.',
                imageUrl: '/assets/images/services/Construccion-Nueva.webp',
            },
            {
                title: 'Remodelaciones',
                description: 'Creemos en el poder de la transformación. Nuestro servicio de remodelación está diseñado para revitalizar y adaptar tus espacios existentes a tus nuevas necesidades y gustos. Ya sea una actualización estética o una reconfiguración funcional completa, le damos una nueva vida a tu hogar u oficina, mejorando su confort, su belleza y su valor.',
                imageUrl: '/assets/images/services/Construccion-Remodelacion.webp',
            },
            {
                title: 'Talleres de vidrio, aluminio, herrería',
                description: 'Al contar con talleres propios, ofrecemos una solución integral que agiliza los tiempos y asegura la coherencia en el diseño. La fabricación de elementos de vidrio, aluminio y herrería se coordina directamente con el equipo de construcción, evitando intermediarios y garantizando que cada pieza se ajuste a la perfección en la obra. Es nuestra forma de asegurar un resultado final armonioso y sin contratiempos.',
                imageUrl: '/assets/images/services/Construccion-Talleres.webp',
            },
            {
                title: 'Construcción residencial',
                description: 'Cada familia es única, y su hogar también debería serlo. Nuestro servicio de construcción residencial se basa en una profunda comprensión de tu estilo de vida y tus necesidades. Trabajamos de la mano contigo para crear una casa que no solo sea funcional, sino que también refleje tu personalidad y se adapte perfectamente a tus rutinas y aspiraciones.',
                imageUrl: '/assets/images/services/Construccion-Residencial.webp',
            }

        ],
        imageUrl: '/assets/images/Construccion.jpg',
        cta: {
            principalCTA: 'Construyamos algo que perdure.',
            complement: 'Llevamos tu proyecto del papel a la realidad con un servicio de construcción profesional y comprometido.',
            buttonText: 'Cotizar mi Obra',
            url: 'https://wa.me/5214454503606?text=%C2%A1Hola!%20Me%20interesa%20el%20servicio%20de%20Construcci%C3%B3n.%20Me%20gustar%C3%ADa%20un%20presupuesto.'
        },
        otherServices: ['muebles-a-medida','mantenimiento','proyectos'],
    }, {
        id: 3,
        slug:'urbanizacion',
        title: 'Urbanización',
        description:
        "Diseñamos y ejecutamos obras de urbanización que mejoran la conectividad y calidad de vida en cada comunidad.",
        details: [
            {
                title: 'Diseño y construcción de fraccionamientos',
                description: 'Un fraccionamiento exitoso es una inversión inteligente que crece con el tiempo. Abordamos cada proyecto con una visión a largo plazo, planificando un desarrollo ordenado y sostenible que garantiza una alta calidad de vida y aumenta la plusvalía de las propiedades. Desde el plan maestro hasta la última calle pavimentada, creamos valor duradero para residentes e inversionistas.',
                imageUrl: '/assets/images/services/Urbanizacion-Diseño.webp',
            },
            {
                title: 'Planificación urbana',
                description: 'Creemos en el poder de la planificación para crear ciudades más humanas, eficientes y sostenibles. Nuestro servicio de planificación urbana se dedica a analizar, diseñar y proponer soluciones estratégicas para el crecimiento y la organización de los espacios urbanos. Trabajamos con una visión de futuro para mejorar la calidad de vida, optimizar la movilidad y promover un desarrollo equitativo.',
                imageUrl: '/assets/images/services/Urbanizacion-Planificacion.webp',
            },
            {
                title: 'Infraestructura',
                description: 'La infraestructura es el sistema circulatorio que da vida a cualquier desarrollo. Nos especializamos en el diseño y construcción de la infraestructura esencial que garantiza la funcionalidad y conexión de fraccionamientos y zonas urbanas. Desde redes de agua potable y drenaje hasta vialidades, alumbrado público y canalizaciones eléctricas, sentamos las bases para un funcionamiento óptimo y seguro.',
                imageUrl: '/assets/images/services/Urbanizacion-Infraestructura.webp',
            }
        ],
        imageUrl: '/assets/images/urbanizacion.webp',
        cta: {
            principalCTA: 'Piensa en grande. Construye a gran escala.',
            complement: 'Nuestros proyectos de urbanización están diseñados para generar plusvalía y un crecimiento sostenible.',
            buttonText: 'Contactar a un Especialista',
            url: 'https://wa.me/5214454503606?text=%C2%A1Hola!%20Quisiera%20informaci%C3%B3n%20sobre%20su%20servicio%20de%20dise%C3%B1o%20de%20fraccionamientos.'
        },
        otherServices: ['inmobiliaria','construccion','proyectos'],
    }, {
        id: 4,
        slug:'muebles-a-medida',
        title: 'Muebles a Medida',
        description:
        "Creamos muebles personalizados que combinan estética, funcionalidad y durabilidad, adaptados a tu estilo de vida.",
        details: [
            {
                title: 'Muebles personalizados para hogar y oficina',
                description: 'El mobiliario es una pieza clave de la arquitectura interior. Nuestro servicio de muebles a medida asegura que cada elemento esté en perfecta armonía con el diseño general de tu proyecto. Coordinamos materiales, acabados y proporciones para crear una atmósfera cohesiva y fluida, donde la arquitectura y el mobiliario dialogan para formar un todo unificado y estético.',
                imageUrl: '/assets/images/services/Muebles-Muebles.webp',
            },
            {
                title: 'Diseño personalizado',
                description: 'Te damos el poder de elegir cada detalle. Con nuestro servicio de diseño personalizado, tienes control total sobre las dimensiones, formas, materiales y acabados de tus muebles. Te asesoramos en la selección de las mejores maderas, metales, tapicerías y herrajes para garantizar no solo una apariencia impecable, sino también una calidad y durabilidad que resistan el paso del tiempo.',
                imageUrl: '/assets/images/services/Muebles-Diseño.webp',
            },
            {
                title: 'Instalación especializada',
                description: 'Un mueble excepcional merece una instalación impecable. Nuestro equipo de instaladores especializados se encarga de que cada pieza sea ensamblada y colocada con la máxima precisión y cuidado. Tratamos tu espacio como si fuera nuestro, garantizando un ajuste perfecto, una funcionalidad óptima y una limpieza total al finalizar el trabajo, para que tú solo te preocupes por disfrutar de tu nuevo mobiliario.',
                imageUrl: '/assets/images/services/Muebles-Instalacion.webp',
            }
        ],
        imageUrl: '/assets/images/muebles.jpg',
        cta: {
            principalCTA: 'El ajuste perfecto para tus espacios.',
            complement: 'Aporta carácter y funcionalidad con muebles personalizados, creados con maestría y materiales de primera.',
            buttonText: 'Pedir una Cotización',
            url: 'https://wa.me/5214454503606?text=%C2%A1Hola!%20Me%20interesa%20su%20servicio%20de%20Muebles%20a%20Medida.%20Quisiera%20una%20cotizaci%C3%B3n.'
        },
        otherServices: ['proyectos','construccion','mantenimiento'],
    }, {
        id: 5,
        slug:'inmobiliaria',
        title: 'Inmobiliaria',
        description:
        "Compra, venta y renta de propiedades. Te ayudamos a vender tu inmueble con promoción efectiva y asesoría personalizada.",
        details: [
            {
                title: 'Compra, venta y renta de propiedades',
                description: 'El mercado inmobiliario puede ser complejo, pero con nuestra asesoría experta, navegarlo se vuelve sencillo y seguro. Te acompañamos en cada paso del proceso de compra, venta o renta de propiedades, brindándote información precisa, análisis de mercado y estrategias personalizadas para maximizar tus beneficios y minimizar riesgos. Nuestro objetivo es que cada transacción sea una experiencia positiva y exitosa.',
                imageUrl: '/assets/images/services/Inmobiliaria-Compra.webp',
            },
            {
                title: 'Gestión y administración de inmuebles',
                description: 'Tu propiedad es un activo valioso; déjalo en manos de expertos que saben cómo cuidarlo. Nuestro servicio de administración de inmuebles te libera de las preocupaciones del día a día, gestionando la relación con inquilinos, el cobro de rentas y el mantenimiento preventivo y correctivo. Con nuestra supervisión técnica, tu inversión no solo está protegida, sino que mantiene y aumenta su valor con el tiempo.',
                imageUrl: '/assets/images/services/Inmobiliaria-Gestion.webp',
            },
            {
                title: 'Promoción y valuación profesional',
                description: 'El éxito de una operación inmobiliaria depende de una estrategia bien definida. Combinamos una valuación precisa con una promoción efectiva para posicionar tu propiedad de forma competitiva en el mercado. Establecemos un precio justo y atractivo, y lo comunicamos a la audiencia correcta a través de los canales adecuados, asegurando un proceso de venta o renta más rápido y en las mejores condiciones posibles.',
                imageUrl: '/assets/images/services/Inmobiliaria-Promocion.webp',
            }
        ],
        imageUrl: '/assets/images/Inmobiliaria.webp',
        cta: {
            principalCTA: 'Tu patrimonio, en manos expertas.',
            complement: 'Gestionamos y maximizamos el valor de tus propiedades para que obtengas el mayor rendimiento.',
            buttonText: 'Solicitar una Valuación',
            url: 'https://wa.me/5214454503606?text=%C2%A1Hola!%20Me%20interesa%20su%20servicio%20de%20Inmobiliaria.'
        },
        otherServices: ['construccion','mantenimiento','proyectos'],
    },
    {
        id: 6,
        slug:'mantenimiento',
        title: 'Mantenimiento',
        description:
        "Servicios de mantenimiento preventivo y correctivo para prolongar la vida útil de tus construcciones.",
        details: [
            {
                title: 'Reparaciones generales',
                description: 'Ofrecemos una solución integral para cualquier necesidad de reparación en tu hogar u oficina. Coordinamos a profesionales de distintas especialidades —plomería, electricidad, albañilería, etc.— para brindarte una respuesta completa y centralizada. Olvídate de buscar y gestionar a múltiples proveedores; nosotros nos encargamos de todo para restaurar la funcionalidad y seguridad de tus espacios.',
                imageUrl: '/assets/images/services/Mantenimiento-Reparaciones.webp',
            },
            {
                title: 'Pintura e impermeabilización',
                description: 'Protege tu inversión de los elementos. Nuestro servicio de impermeabilización y pintura utiliza productos de la más alta calidad y técnicas de aplicación profesional para crear una barrera protectora duradera contra la humedad, el sol y el desgaste. Cuidamos la salud de tu edificio desde el exterior, previniendo filtraciones y daños estructurales a largo plazo.',
                imageUrl: '/assets/images/services/Mantenimiento-Pintura.webp',
            },
            {
                title: 'Herrería y vidrio',
                description: 'El mantenimiento de elementos como la herrería y el vidrio requiere de manos expertas. Nos especializamos en la reparación y el mantenimiento de portones, ventanas, barandales y canceles. Aseguramos su correcto funcionamiento, ajustando mecanismos, reemplazando piezas desgastadas y garantizando la seguridad y la integridad estructural de cada componente.',
                imageUrl: '/assets/images/services/Mantenimiento-Herreria.webp',
            },
            {
                title: 'Servicios de mantenimiento programados',
                description: 'La mejor reparación es la que no se necesita. Con nuestros planes de mantenimiento programado, te ofrecemos la tranquilidad de saber que tu propiedad está en constante supervisión. Realizamos inspecciones periódicas y tareas preventivas para detectar y solucionar problemas potenciales antes de que se conviertan en reparaciones costosas, asegurando el buen estado de tu inmueble todo el año.',
                imageUrl: '/assets/images/services/Mantenimiento-Programado.webp',
            }
        ],
        imageUrl: '/assets/images/Mantenimiento.webp',
        cta: {
            principalCTA: '¿Necesitas una reparación?',
            complement: 'Nuestro equipo técnico está listo para solucionar cualquier imprevisto de forma rápida y profesional.',
            buttonText: 'Solicitar un Servicio',
            url: 'https://wa.me/5214454503606?text=%C2%A1Hola!%20Me%20interesa%20su%20servicio%20de%20Mantenimiento.'
        },
        otherServices: ['construccion','inmobiliaria','muebles-a-medida'],
    },
]