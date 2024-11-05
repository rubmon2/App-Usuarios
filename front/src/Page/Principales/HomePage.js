import React from 'react'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
    const goTo=useNavigate()
  return (
<div>
<div>HomePage</div>


<button onClick={()=>goTo("/login")}>Login</button>
</div>  )
}
