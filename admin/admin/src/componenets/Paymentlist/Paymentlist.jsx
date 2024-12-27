import React,{useState} from 'react'
import { useEffect } from 'react';
import './Paymentlist.css'

const Paymentlist = () => {

    const [pay, setPay] = useState([]);
    const [error,setError] = useState(false);

    useEffect(()=>{
        fetchpay();
    },[]);

    const fetchpay = async () =>{
        try{
          const response = await fetch('http://localhost:4000/paymentlist',{
            headers:{
                Accept: 'application/json',
                'Content-type':'application/json',
            }
          })

           if(response.ok){
             const data = await response.json();
             setPay(data.pay);
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
    <div className='payli'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h1>Payment List</h1>
        <table className="ptb" border="1">
            <thead className='pth'>
                <tr className='ptr'>
                    <th  >Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Address</th>
                    <th>Amount</th>
                </tr>
            </thead >
            <tbody>
                    {pay.length > 0 ? (
                        pay.map((pay) => (
                            <tr key={pay.paymentemail}>
                                <td className='ptd'>{pay.pname}</td>
                                <td className='ptd'>{pay.paymentemail}</td>
                                <td className='ptd'>{pay.phoneNumber}</td>
                                <td className='ptd'>{pay.address}</td>
                                <td className='ptd'>{pay.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users found</td>
                        </tr>
                    )}
                </tbody>
        </table>
    </div>
  )
}

export default Paymentlist