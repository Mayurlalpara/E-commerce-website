import { useEffect, useState } from 'react';
import './Listproduct.css';
import cross_icon from '../../assets/cross_icon.png';

function Listproduct(){

    const [allproducts,setAllProducts] = useState([])

    const fetchInfo = async()=>{
      await fetch('http://localhost:4000/allproducts')//getting the response
      .then((res)=>res.json())//converted it using json
      .then((data)=>{setAllProducts(data)});//save the data in set variable
    }

    //we have run this fetchinfo func whnever this component(allprod) mounted
    useEffect(()=>{
      fetchInfo();
    },[])//execute only once

    const remove_product = async(id)=>{
       await fetch('http://localhost:4000/removeproduct',{
          method:'POST',
          headers:{
             Accept:'application/json',
             'Content-Type':'application/json',
          },
          body:JSON.stringify({id:id})
       })
       await fetchInfo();
    }

    return(<>
            <div className="listproduct">
                 <h1>All Product's List</h1>
                 <div className="listproduct-format-main">
                  <p className='lip'>Product</p>
                  <p className='lip'>Title</p>
                  <p className='lip'>Old Price</p>
                  <p className='lip'>New Price</p>
                  <p className='lip'>Category</p>
                  <p className='lip'>Remove</p>
                 </div>
                 <div className="listproduct-allproduct">{/*map the product data that we will fetch using Api*/}
                    <hr />
                   {allproducts.map((product,index)=>{
                    return <><div key={index} className="listproduct-format-main listproduct-format">
                      <img src={product.image} alt="" className="listproduct-product-icon" />
                      <p>{product.name}</p>
                      <p className='pil'>₹{product.old_price}</p>
                      <p className='pil'>₹{product.new_price}</p>
                      <p className='pil'>{product.category}</p>
                      <img onClick={()=>{remove_product(product.id)}}src={cross_icon} alt="" className="listproduct-remove-icon" />
                    </div>
                    <hr></hr>
                    </>
                   })}
                 </div>
            </div>
          </>
    )
}

export default Listproduct