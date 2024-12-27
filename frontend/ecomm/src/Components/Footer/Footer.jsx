import React from "react";
import './Footer.css'
import footer from '../Assets/logo_big.png'
import shoelogo from '../Assets/shoelog.jpeg'
import instagram from '../Assets/instagram_icon.png'
import pintrest from '../Assets/pintester_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'
import Return from "./Return.jsx";
import './Return.css'
    
        

import {Link} from "react-router-dom"

function Footer(){
    return(
        <div className="footer">
           <div className="footerlogo">
            <img src={shoelogo} alt="" />
            <p>URBANSOLE</p>
           </div>
           <ul className="footerlinks">
            <li>
            <Link style={{textDecoration:"none",color:  "#ff4141"}} to="/About">
                About Us
            </Link>
            </li>
            <li>
            <Link style={{textDecoration:"none",color: " #ff4141"}} to="/contact">
                Contact Us
                </Link>
                </li>
            <li>
            <Link style={{textDecoration:"none",color: " #ff4141"}} to="/return">
              Return Policy
            </Link>
            </li>
            <li>
            <Link style={{textDecoration:"none",color: " #ff4141"}} to="/exchange">
              Exchange Policy
            </Link>
            </li>
           </ul>
           <div className="footer-social-icon">
            
            <div className="footer-icon-container">
                <img src={instagram} alt=""></img>
            </div>
            <div className="footer-icon-container">
                <img src={pintrest} alt=""></img>
            </div><div className="footer-icon-container">
                <img src={whatsapp} alt=""></img>
            </div>
           </div>
           <div className="footercopy">
            <hr/>
            <p>Copyright @2023 - All Right Reserved</p>
           </div>
        </div>
    )
}
export default Footer