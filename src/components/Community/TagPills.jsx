import React from 'react'

const TagPills = ({text,onClick}) => {
  return (
    <span className=" p-2 rounded-full hover:cursor-pointer bg-gray-border" onClick={()=>onClick(text)}>
        {"# " + text +" "} 
        &#10005; 
    </span>
  )
}
// &#10005; -> for X symbol
export default TagPills