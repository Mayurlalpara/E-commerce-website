import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'

const Login = () => {

  const [formData,setFormData] = useState({
    username:"",
    password:""
  }) 

  const changehandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value}) 
  }

  const adminlogin = async()=>{
    console.log("done",formData)
    let responseData;
    await fetch('http://localhost:4000/adminlogin',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/userlist");

    }
    else{
      alert(responseData.errors);
      
    }
  }

  return (
    <div className="loginmain">
  <div className='login'>
    <h1>Admin Login</h1>
    <input name="username" value={formData.username} onChange={changehandler}  placeholder=' username'></input><br/><br/>
    <input type="password" name="password" value={formData.password} onChange={changehandler}  placeholder=' password'></input><br/><br></br>
    <button onClick={adminlogin}>Submit</button>
   </div>
   </div>
  )
}

export default Login