import React,{useContext, useState,useRef} from "react";
import './Navbar.css'
import carticon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom";
import { Shopcontext } from "../../context/Shopcontext";
import nav_dropdown from '../Assets/free-dropdown.png';
import shoelogo from '../Assets/shoelog.jpeg'


function Navbar(){ 

    const [menu,setMenu] =useState("shop");
    const{getTotalcartItems} = useContext(Shopcontext);
    const menuRef =useRef();

    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return(
        <div className="navbar">
            <div className="nav-logo">
                <img src={shoelogo} alt=""></img>
                <p>URBANSOLE</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle}src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="navmenu">
               <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:"none"}}to='/'>Shop</Link>{menu ==="shop"?<hr/>:<></>}</li>            
                <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:"none"}}to='/mens'>Men</Link>{menu ==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:"none"}}to='/womens'>Women</Link>{menu ==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:"none"}}to='/kids'>Kids</Link>{menu ==="kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :<Link to='/login'><button>login</button></Link>}
                <Link to='/cart'><img src={carticon} alt=""></img></Link>
                  <div className="nav-cart-count">{getTotalcartItems()}</div>
            </div>
        </div>
    )
}
export default Navbar