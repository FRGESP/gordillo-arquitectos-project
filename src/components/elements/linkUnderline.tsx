"use client"
import { ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface LinkUnderlineProps {
  href: string
  children: ReactNode
  className?: string
  scrolledProp?: boolean
  personalized?: boolean
  color?: string
  blank?: boolean
  navbarLink?: boolean
  mobileLink?: boolean
}


function LinkUnderline({
  href,
  children,
  className = "",
  scrolledProp = false,
  personalized = false,
  color = "black",
  blank = false,
  navbarLink = false,
  mobileLink = false,
}: LinkUnderlineProps) {
  const router = useRouter();
  const pathname = usePathname();

  const goTo = async (href: string) => {

    if (pathname !== '/') {
      await router.push('/');
    }
    setTimeout(() => {
      document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <div>
      {navbarLink ? (
        <button
          onClick={() => goTo(href)}
          className={`
        ${personalized ? `text-${color} after:bg-black` : scrolledProp ? 'text-black after:bg-black font-semibold' : 'text-white after:bg-white font-semibold'}
        relative inline-block cursor-pointer 
        after:content-[''] after:absolute after:bottom-0
        after:h-[2px] 
        after:transition-all after:duration-300
        after:left-0 after:w-0 hover:after:w-full
        ${mobileLink ? 'text-2xl' : ''}
        ${className}
      `}
        >
          {children}
        </button>
      ) : (
        <a
          href={href}
          target={blank ? "_blank" : "_self"}
          className={`
        ${personalized ? `text-${color} after:bg-black` : scrolledProp ? 'text-black after:bg-black font-semibold' : 'text-white after:bg-white font-semibold'}
        relative inline-block cursor-pointer 
        after:content-[''] after:absolute after:bottom-0
        after:h-[2px] 
        after:transition-all after:duration-300
        after:left-0 after:w-0 hover:after:w-full
        ${mobileLink ? 'text-2xl' : ''}
        ${className}
      `}
        >
          {children}
        </a>
      )}
    </div>
  )
}

export default LinkUnderline

// components/LinkUnderline.tsx




