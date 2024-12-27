import React, { children, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Dontshow = ({children}) => {

    const location = useLocation();

    const [show,setShow] = useState(false)
    
    useEffect(()=>{
        if(location.pathname === '/payment'){
            setShow(false)
        }
        else
        {
            setShow(true)
        }
    },[location])

  return (
    <div>{show && children}</div>
  )
}

export default Dontshow