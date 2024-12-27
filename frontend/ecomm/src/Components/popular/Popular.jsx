import React, { useEffect, useState } from "react";
import './Popular.css'
//import data_products from '../Assets/data.js'
import Items from "../items/items";
function Popular(){

    const [popularProducts,setPopularProducts] = useState([]);

    useEffect(()=>{
      fetch('http://localhost:4000/popularinwomen')
      .then((response)=>response.json())
      .then((data)=>setPopularProducts(data));
    },[])

    //creating endpoint for adding data
    

    return(
        <div className="Popular">
          <h1>POPULAR IN WOMEN</h1>
          <hr/>
          <div className="popularitem">
            {popularProducts.map((item,i)=>
            {
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}  old_price={item.old_price}/>
            })}
          </div>
        </div>
    )
}
export default Popular