import React from 'react'

function Logo({width = "100px", className = ""}) {
  return (
    <div className={`${width} gluten-font ${className}`}>.Blog</div>
  )
}

export default Logo