import React ,{createContext, useEffect, useState} from "react";
import all_product from '../Components/Assets/all_product'

export const Shopcontext = createContext(null) ;

const getdefaultcart=()=>{
    let Cart ={};
    for(let index=0;index < 300+1;index++){
        Cart[index] =0 ;
    }
    return Cart;
}

const ShopcontextProvider = (props) =>{
   
    const[all_product,setAll_product] = useState([]);

    const[cartItems,setCartItems] = useState(getdefaultcart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data))
        }
    },[])
    
    const addToCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }           
        alert("added to cart")
    }

    const removefromCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
            //alert("removed from the cart")
    }

    const getTotalcartAmount =()=>{
        let totalAmount =0;
        let size = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===parseInt(item));
                if(itemInfo){
                totalAmount += itemInfo.new_price * cartItems[item];
                }
                
            }
        }
        return totalAmount;
    }

    const getTotalcartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    

    const contval ={getTotalcartItems,getTotalcartAmount,all_product,cartItems,addToCart,removefromCart};

    return(
        <Shopcontext.Provider value={contval}>
            {props.children}
        </Shopcontext.Provider>
    )
}

export default ShopcontextProvider;