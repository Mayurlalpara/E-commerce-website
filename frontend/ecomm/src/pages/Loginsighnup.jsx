import React, { useState } from "react";
import './loginsin.css'
function Loginsighnup(){

    const [state,setState] = useState("Login");
    const [formData,setFormData] = useState({
        username:"",
        password:"",
        email:"",
    })

    const chnghandler =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    

    const login = async()=>{
         console.log("Login Function Executed",formData);
         let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData), 
        }).then((response)=>response.json()).then((data)=>responseData=data)
    

    if(responseData.success){//localStorage is a web storage API provided by browsers that allows you to store key-value pairs in a web browser with no expiration time. The stored data will persist even after the browser is closed and reopened.
        localStorage.setItem('auth-token',responseData.token);//
        window.location.replace("/");                             // setItem is a method of localStorage used to store a key-value pair.
                                               //'auth-token' is the key under which the value will be stored. In this case, it is an authentication token.
                                               //responseData.token is the value being stored. It is assumed to be a token received from the server, typically used for authenticating subsequent requests.
    }
    else{
        alert(responseData.errors)
    }
    }

    const signup = async()=>{
        console.log("Signup Function Executed",formData)
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData), 
        }).then((response)=>response.json()).then((data)=>responseData=data)
    

    if(responseData.success){//localStorage is a web storage API provided by browsers that allows you to store key-value pairs in a web browser with no expiration time. The stored data will persist even after the browser is closed and reopened.
        localStorage.setItem('auth-token',responseData.token);//
        window.location.replace("/");                             // setItem is a method of localStorage used to store a key-value pair.
                                               //'auth-token' is the key under which the value will be stored. In this case, it is an authentication token.
                                               //responseData.token is the value being stored. It is assumed to be a token received from the server, typically used for authenticating subsequent requests.
    }
    else{
        alert(responseData.errors)
    }
    }
    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="fields">
                    {state === "Sign Up"?<input name='username' value={formData.username} onChange={chnghandler} type="text" placeholder="your name" />:<></>}
                    <input name='email' value={formData.email} onChange={chnghandler} type="email" placeholder="email address" />
                    <input name='password' value={formData.password} onChange={chnghandler} type="password" placeholder="password"/>
                    </div>
                    <button onClick={()=>{state === "Login"?login():signup()}}>Continue</button>
                    {state === "Sign Up" 
                      ?<p className="loginsignuup-login">Already have an acocount?<span onClick={()=>{setState("Login")}}>Login here</span></p>
                      :<p className="loginsignuup-login">Create an account?<span onClick={()=>{setState("Sign Up")}}>Click here</span></p>} 
                    
            </div>
        </div>
    )
}
export default Loginsighnup