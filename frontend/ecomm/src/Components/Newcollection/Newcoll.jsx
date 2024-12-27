import React, { useEffect, useState } from "react";
import './Newcoll.css'
//import new_collection from '../Assets/new_collections';
import Items from "../items/items";

function Newcoll(){

    const[new_collection,setNew_collection]= useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/newcollection')
        .then((response)=>response.json())
        .then((data)=>setNew_collection(data));
    },[])

    return(
        <div className="newcoll">
         <h1>NEW COLLECTION</h1>
         <hr/>
         <div className="collections">
            {new_collection.map((item,i)=>{
                 return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}  old_price={item.old_price}/>
            })}
         </div>
        </div>
    )
}
export default Newcoll