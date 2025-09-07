// components/LinkUnderline.tsx
import React, { ReactNode } from "react"

interface LinkUnderlineProps {
  href: string
  children: ReactNode
  className?: string
  scrolledProp?: boolean
  personalized?: boolean
  color?: string
  blank?: boolean
}

const LinkUnderline: React.FC<LinkUnderlineProps> = ({
  href,
  children,
  className = "",
  scrolledProp = false,
  personalized = false,
  color = "black",
  blank = false
}) => {
  return (
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
        ${className}
      `}
    >
      {children}
    </a>
  )
}

export default LinkUnderline