import React from 'react'

type NavButtonProps = {
   label: string,
   href: string
}
export const NavButton = ({label, href}: NavButtonProps) => {
  return (
    <a href={href} className='nav-button'>{label}</a>
  )
}
