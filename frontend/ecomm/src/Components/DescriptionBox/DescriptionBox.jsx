import React from "react";
import './DescriptionBox.css'
import { useState } from "react";
function DescriptionBox(){

    const [foDa,setFoDa] = useState({
        femail:'',
        feedback:'',
      })
    
      const handlechange = (e) =>{
        setFoDa({...foDa, [e.target.name]:e.target.value})
      }
    
      const feedback = async ()=>{
        try {
           let response = await fetch('http://localhost:4000/feedback',{
               method:'POST',
               headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
               },
               body:JSON.stringify({...foDa})
           });
    
           const dat = await response.json();
           let errorMessage = dat.message; 
          if(response.ok){
            alert('Thank You for your feedback');
            setFoDa({ femail: '', feedback: '' });

          }
          else{
            console.log('Server Response:', dat);
            alert(`Error; ${errorMessage}`);
          }
        } 
        catch (error) {
          console.error('Error:',error);
            alert('an error occurred while processing feedback')
         }
        }
    return(
      <div>
        <div className="Descriptionbox">
           <div className="Descriptionbox-navigator">
            <div className="decscriptionbox-nav-box">
                Description
            </div>
            
           </div>
           <div className="descriptionbox-description">
            <p>At Urbansole, we believe that footwear is more than just a necessity; it’s an expression of style, comfort, and confidence. Our mission is to provide you with high-quality shoes,heels or that not only look great but also feel amazing with every step you take.
            </p>
            <p>
            Whether you're searching for trendy sneakers or shoes, elegant heels, or durable boots, our wide collection is designed to meet every occasion and lifestyle. Each pair is crafted with precision and care, ensuring you never have to compromise on comfort or durability.
                
            </p>
           </div>
           </div>
           <div className='feedback'>
          <h2>FEEDBACK</h2>
          <h3>Please, give your feedback on our products and website..</h3>
          <input type="text" name="femail" placeholder='Email' onChange={handlechange} value={foDa.femail}></input><br></br>
          <input type="text" name="feedback" placeholder='Feedback' onChange={handlechange} value={foDa.feedback}></input><br></br>
          <button onClick={feedback}>SUBMIT</button>
        </div>
       
        </div>
    )
}
export default DescriptionBox