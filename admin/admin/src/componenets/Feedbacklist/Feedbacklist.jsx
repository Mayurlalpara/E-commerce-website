import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './Feedback.css'

const Feedbacklist = () => {

    const [Feedback,setFeedback] = useState([]);
    const [error,setError] = useState(false);

    useEffect(()=>{
       fetchfeed();
    })

    const fetchfeed = async () =>{
        try{
            const response = await fetch('http://localhost:4000/feedbacklist',{
              headers:{
                  Accept: 'application/json',
                  'Content-type':'application/json',
              }
            })
  
             if(response.ok){
               const data = await response.json();
               setFeedback(data.feedback);
             }
             else{
              setError('unexpectend error')
             }
          }
          catch(error){
            console.log('error',error);
            setError('Error fetching user data: ' + error.message);
          }
    }

  return (
    
    <div className="feedback">
    <h1>Feedback List</h1>
    <div className="feedback-format-main">
     <p className='fp'>Email</p>
     <p className='fp'>Feedback</p>
     

    </div>
    <div className="listfeedback">{/*map the product data that we will fetch using Api*/}
       <hr />
      {Feedback.map((feedback)=>{
       return <><div className='feedback-format-main feedback-format'>
         <p>{feedback.femail}</p>
         <p>{feedback.feedback}</p>  
       </div>
       <hr></hr>
       </>
      })}
    </div>
    </div>
  )
}

export default Feedbacklist