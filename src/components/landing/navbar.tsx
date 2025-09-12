'use client';
import { useEffect, useState } from 'react';
import { InstagramLogo, FacebookLogo, WhatsappLogo, List, X } from 'phosphor-react';
import LinkUnderline from '../elements/linkUnderline';
import { usePathname } from 'next/navigation';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
      if (pathname === '/') {
        const onScroll = () => setScrolled(window.scrollY > 10);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
      } else {
        setScrolled(true);
      }
    }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = original || '';
    return () => {
      document.body.style.overflow = original || '';
    };
  }, [menuOpen]);

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Proyectos', href: '/#proyectos' },
    { name: 'Inmobiliaria', href: '/#' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/gordilloarquitectos',
      img: (
        <FacebookLogo
          size={32}
          className={`transition-transform hover:scale-110 ${scrolled || menuOpen ? 'text-black' : 'text-white'} hover:text-[#1877f2] duration-300`}
        />
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/gordilloarquitectos',
      img: (
        <InstagramLogo
          size={32}
          className={`transition-transform hover:scale-110 ${scrolled || menuOpen ? 'text-black' : 'text-white'} hover:text-[#D43089] duration-300`}
        />
      ),
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/1234567890',
      img: (
        <WhatsappLogo
          size={32}
          className={`transition-transform hover:scale-110 ${scrolled || menuOpen ? 'text-black' : 'text-white'} hover:text-[#25D366] duration-300`}
        />
      ),
    },
  ];

  return (
    <>
      {/* Top navbar */}
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
          scrolled || menuOpen
            ? 'bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm'
            : 'bg-transparent border-transparent',
        ].join(' ')}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center ml-3 md:ml-0">
              <img src={`/assets/images/${scrolled ? 'blackLogo.webp' : 'whiteLogo.webp'}`} alt="Gordillo Arquitectos" width={25} />
              <h1 className={`ml-2 text-2xl tracking-tight ${scrolled ? 'text-black' : 'text-white'}`}>
                <span className="font-semibold">Gordillo</span> Arquitectos
              </h1>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item) => (
                  <LinkUnderline key={item.name} href={item.href} scrolledProp={scrolled || menuOpen}>
                    {item.name}
                  </LinkUnderline>
                ))}
                <span className={`${scrolled || menuOpen ? 'text-black' : 'text-white'} font-semibold`}>|</span>
                <div className="flex items-center space-x-4">
                  {socialLinks.map((link) => (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.img}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center">
              <button
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                className={`p-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${scrolled || menuOpen ? 'text-black focus:ring-black' : 'text-white focus:ring-white'}`}
              >
                {menuOpen ? <X size={32} weight="bold" /> : <List size={32} weight="bold" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen right-to-left drawer for mobile */}
      <div className={`md:hidden fixed inset-0 z-50 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Drawer */}
        <aside
          className={`absolute top-0 right-0 h-full w-full bg-white transform transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-1 h-16 border-b border-gray-200">
              <div className="flex items-center ml-3">
                <img src="/assets/images/blackLogo.webp" alt="Gordillo Arquitectos" width={25} height={25} />
                <p className='ml-2 text-2xl'><span className="font-semibold">Gordillo</span> Arquitectos</p>
              </div>
              <button
                aria-label="Cerrar menú"
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                <X size={28} weight="bold" />
              </button>
            </div>

            {/* Drawer content */}
            <div className="flex overflow-y-auto px-6 py-8">
              <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-semibold text-gray-800 hover:text-blue-800 transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Drawer footer */}
            <div className="px-6 py-4 border-t border-b border-gray-200">
              <div className="flex items-center justify-between">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform hover:-translate-y-0.5 transition-transform"
                  >
                    {link.img}
                  </a>
                ))}
              </div>
            </div>
            <div className='flex-1'
              onClick={() => setMenuOpen(false)}
            >
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Navbar;