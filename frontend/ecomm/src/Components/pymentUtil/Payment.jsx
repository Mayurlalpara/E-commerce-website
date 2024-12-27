import React,{useContext, useState} from 'react'
import { Shopcontext } from "../../context/Shopcontext";
import './Payment.css'

const Payment = (props) => {
  const{getTotalcartAmount} = useContext(Shopcontext);

  const [formData,setFormData] = useState({
    pname:'',
    paymentemail:localStorage.getItem('email') ,
    phoneNumber:'',
    address:''
  });


  const handlechnge = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const order = async () =>{
     //alert('your order is confirmed')
     try{
      const amount = getTotalcartAmount();

      const response = await fetch('http://localhost:4000/payment',{
        method: 'POST',
        headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({...formData,amount}),
      });
      
      const data = await response.json();
      let errorMessage = data.message; 
      if(response.ok){
        alert('your order is confirmed');
        window.location.replace("/");   
      }
      else{
        console.log('Server Response:', data);
        alert(`Error; ${errorMessage}`);
      }

     }
     catch(error){
        console.error('Error:',error);
        alert('an error occurred while processing your payment')
     }
  }



   
  return (
    <div>
        <div className='paycon'>
             <div className='inp'>
             <h2>Payment</h2>
             <div className='field'>
               <input name="pname" placeholder ="name" onChange={handlechnge} value={formData.pname}></input><br/>
               <input name="paymentemail" placeholder ="Email" onChange={handlechnge} value={formData.paymentemail}></input><br/>
               <input name="phoneNumber" placeholder ="Phone no" onChange={handlechnge} value={formData.phoneNumber}></input><br/>
               <input name="address" placeholder ="Address" onChange={handlechnge} value={formData.address}></input><br/>
               </div>
               <div className='totalpay'>
                <p>Payment</p>
                <p >₹{getTotalcartAmount()}</p>
               </div>
               <button onClick={order} >Proceed To Pay</button>
             </div>               
 
        </div>

    </div>
  )
}

export default Payment