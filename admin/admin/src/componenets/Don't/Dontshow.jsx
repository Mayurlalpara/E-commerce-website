import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'

const Dontshow = ({children}) => {

  const location = useLocation();

  const [shownav, setShownav] = useState(false)

  useEffect(()=>{
    if(location.pathname === '/adminlogin' ){
        setShownav(false)
    }
    else{
        setShownav(true)
    }
  },[location])

  return (
    <div>{shownav && children}</div>
  )
}

export default Dontshow