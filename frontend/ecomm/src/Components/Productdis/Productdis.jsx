import React, { useContext, useEffect } from "react";
import './Productdis.css';
import star from "../Assets/star_icon.png";
import stardull from "../Assets/star_dull_icon.png";
import { Shopcontext } from "../../context/Shopcontext";
//import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import { useState } from "react";



function Productdis(props){
    const {product} = props;
    const {addToCart} = useContext(Shopcontext);

      const sizes = {
      men:['6','7','8','9','10'],
      women:['5','6','7','8','9'],
      kid:['1','2','3','4','5']
      };  

    const [selectedSize, setSelectedSize] = useState(null); // To store selected size

    const handleSizeClick = (size) => {
      setSelectedSize(size); // Set the clicked size as selected
      console.log("Selected size:", size);
    };

    return(
    
      <div className="productdis">

           <div className="productdis-left">
              <div className="productdis-img-list">
              </div>
              <div className="productdisplay-img">
              <img className="productdisplay-main-img" src={product.image} alt="" />
              </div>
           </div>
           <div className="productdis-right">
               <h1>{product.name}</h1>
               
               <div className="productdis-right-prices">
                  <div className="productdis-right-price-old">
                    ₹{product.old_price}
                  </div>
                  <div className="productdis-right-price-new">
                  ₹{product.new_price}
                  </div>
               </div>
               <div className="productdis-right-descr">
               Discover our curated collection of stylish and comfortable footwear designed for women, men, and kids. Whether you're looking for elegant heels, sturdy boots, or everyday shoes, we have the perfect pair to suit your needs and lifestyle. Made with high-quality materials, our footwear offers lasting durability, exceptional comfort, and timeless style.
               </div>
               <div classname="sizee">
                  <h2>SELECT SIZE</h2>
               </div>
               <div className="productdis-right-size">
               
                <div className="productdis-right-sizes">               

{sizes[product.category].map((size) => (
                            <button 
                                className="size" 
                                key={size} 
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </button>
                        ))}
                   
                  </div> 
               </div>
               {selectedSize && (
        <div>
          <p className="show">Selected Size: {selectedSize}</p>
        </div>
      )}
               <button onClick={()=>{
                if (selectedSize){
                  localStorage.setItem(`size_${product.id}`,selectedSize)
                  addToCart(product.id)}
                  else{
                    alert("please select a size before adding to cart")
                  }
                }}>ADD TO CART</button>
               <p className="productdis-right-category"><span>Tags :</span>Morden, Latest, Comfortable, Versatile, Stylish, Perfect Fit</p>

            </div>
        </div>
      

    )
}
export default Productdis