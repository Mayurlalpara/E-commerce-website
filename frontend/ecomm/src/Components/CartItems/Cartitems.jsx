import React, { useContext, useState } from "react";
import './Cartitems.css';
import { Shopcontext } from "../../context/Shopcontext";
import remove_icon from "../Assets/cart_cross_icon.png"
//import QR from "../Assets/QR.png"
import {Link} from 'react-router-dom'


function Cartitems(){
    const{getTotalcartAmount,all_product,cartItems,removefromCart} = useContext(Shopcontext);

    const buyNow = async () =>{
    const authToken = localStorage.getItem('auth-token');
    if(authToken){
        window.location.href='/payment'
    }
    else{
        alert("you need to login or signup");
        window.location.href='/login'
    }

    try{
        const totalamount = getTotalcartAmount();  

        const orderItems = all_product.filter((product)=> cartItems[product.id]>0).map((product)=>({
            name: product.name,
            size: localStorage.getItem(`size_${product.id}`),
            quantity:cartItems[product.id],
            imageUrl:product.image,
            price:product.new_price,
            
        }));

        const response = await fetch ('http://localhost:4000/order',{
            method:'POST',
            headers:{
                accept:'application/json',
                'Content-type':'application/json',
                'auth-token':authToken,
            },
            body: JSON.stringify({
                items: orderItems,
                totalamount,
            }),
        });
        const data = await response.json();
        if(response.ok){
            alert('your order is confirmed');
        }
        else{
            alert(`Error: ${data.message}`);
        }
    }
        catch(error){
            console.error('Error:', error);
            alert('An error occurred while placing your order');
        }
        
    
}


    return(
        <div className="caritems">
           <div className="cartitems-format-main">
            <p>Products</p>
            <p>Titles</p>
            <p>Price</p>
            <p>Size</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
            </div> 
            <hr></hr>
            {all_product.map((e)=>{
                if(cartItems[e.id]>0){
                    const selectedSiz = localStorage.getItem(`size_${e.id}`)
                   return (<div key={e.id}>
                <div className="cartitems-format cartitems-format-main">
                   <img src={e.image} alt="" className="carticon-product-icon"/>
                   <p>{e.name}</p>
                   <p>₹{e.new_price}</p>
                   <p>{selectedSiz}</p>
                   <button className="cartitems-quantity">{cartItems[e.id]}</button> 
                   <p>₹{e.new_price*cartItems[e.id]}</p> 
                   <img className="carticon-remove-icon" src={remove_icon} onClick={()=>{removefromCart(e.id)}} alt="" />           
                </div>
                <hr/>
            </div>)
                }
                return null;

            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>₹{getTotalcartAmount()}</p>
                </div>
                <hr/>
                <div className="cartitems-total-item">
                    <p>Sheeping fee</p>
                    <p>Fee</p>
                </div>
                <hr/>
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>₹{getTotalcartAmount()}</h3>
                </div>
                </div> 
                
                <button onClick={buyNow} >Place Order</button> 
              
            </div>
            {/*<div className="cartitems-promocode">
                <p>if you have a promo code,enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder="promo code"></input>
                    <button>Submit</button>
                </div>*/}
                  
            </div>
        </div>
        
    )

}
export default Cartitems