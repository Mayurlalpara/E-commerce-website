import React from "react";
import './Newsletter.css'
function Newsletter(){
    return(
        <div className="newsletter">
          <h1>Get Exclusive Offer On Your Email</h1>
          <p>Subscribe to our newsletter and stay updated</p>
          <div>
            <input type="email" placeholder="your email Id" />
          <button>Subscribe</button>
          </div>
        </div>
    )
}
export default Newsletter