import React from "react";
import './Hero.css';
import hand_icon from'../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero from '../Assets/hero_image.png'
//import hero from '../Assets/heroi1.png'

function Hero(){
    return(
        <div className="hero">
           <div className="heroleft">
            <h2>new arrivals only</h2>
            <div>
                <div className="herohandicon">
                    <p>new</p>
                    <img src={hand_icon} alt=""></img>
                </div>
                <p>collection</p>
                <p>for everyone</p>
            </div>
            <div className="herobtn">
                <div>latest collection</div>
                <img src={arrow_icon} alt=""></img>
            </div>
           </div>
           <div className="heroright">
             <img src={hero} alt="" />
           </div>
        </div>
    )
}
export default Hero