import MasonryGrid from "./masonryGrid"

function Projects() {
    return (
    <section id="proyectos" className='py-24 px-4 sm:px-6 lg:px-8 bg-gray-50'>
            <div className='container mx-auto'>
                {/* Section Header */}
                <div className='text-center mb-16'>
                    <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
                        Nuestros Proyectos
                    </h2>
                    <p className="text-lg md:text-xl text-black max-w-2xl mx-auto">
                        Explora nuestros proyectos más recientes y descubre cómo transformamos espacios.
                    </p>
                </div>

                {/* Services Grid */}
                <MasonryGrid />

            </div>
        </section>
    )
}

export default Projects