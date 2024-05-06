import React from 'react'
import { Link } from 'react-router-dom'
type NavButtonProps = {
   label: string,
   href: string
}
export const NavButton = ({label, href}: NavButtonProps) => {
  return (
  //   <><button className="nav-button">
  //   <Link to={href}>{label}</Link>
  // </button>
  // </>
    
    <a href={href} className='nav-button'>{label}</a>
  )
}
