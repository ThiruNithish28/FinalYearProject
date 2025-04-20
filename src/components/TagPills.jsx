import React from 'react'

const TagPills = ({text,onClick}) => {
  return (
    <span className=" p-2 rounded-full bg-gray-border" onClick={onClick}>
        {"# " + text}
    </span>
  )
}

export default TagPills