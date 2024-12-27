import React from "react";
import './Offer.css'
//import exclu from '../Assets/exclusive_image.png'
//import exclu from '../Assets/heroi1.png'
//import exclu from '../Assets/exclu.png'
import exclu from '../Assets/excluu.png'

function Offers(){
    return(
        <div className="Offers">
            <div className="offerleft">
                <h1>Exclusive</h1>
                <h1>Offers for you</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button>CHECK NOW</button>
            </div>
            <div className="offerright">
                 <img src={exclu} alt=" "></img>   
            </div>
        </div>
    )
}
export default Offers