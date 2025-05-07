import React from 'react'

const NavLinks = ({links, hasIcon}) => {
  return (
    <ul className='flex flex-col gap-2'>    
        {links.map((link, index) => (
            <li key={index} onClick={link.action} className="flex items-center gap-2 hover:cursor-pointer text-gray-text-70 hover:text-white hover:font-semibold p-1">
            {hasIcon && link.icon && <span className="icon">{link.icon}</span>}
            <h2>{link.name}</h2>
            </li>
        ))}
    </ul>
  )
}

export default NavLinks