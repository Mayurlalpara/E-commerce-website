import React, { useContext } from "react";
import './CSS/shopcat.css'
import { Shopcontext } from "../context/Shopcontext";
import Items from '../Components/items/items.jsx'
import banner1 from '../Components/Assets/banner1.png'


function Shopcategory(props){

    const {all_product} = useContext(Shopcontext);
    return(
        <div className="shopcat">
            <img className="shopcat_banner" src={banner1} alt="" />
            
            <div className="shopcatprod">
                {all_product.map((item,i)=>{
                    if(props.category === item.category){
                        return<Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}  old_price={item.old_price}/>
                    }
                    else{
                        return null;
                    }
                })}
            </div>
              
        </div>
    )
}
export default Shopcategory