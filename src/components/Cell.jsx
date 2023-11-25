import React from 'react'
import {useState} from 'react'

export default function Cell({ ...props}) {
  const [visibility,setVisibility]= useState(false)
  return (
    <div {...props}
    onMouseOver={setVisibility(true)}
    onMouseDown={setVisibility(false)}
    >
        {visibility && <div> 
          
          </div>}
    </div>
  )
}
