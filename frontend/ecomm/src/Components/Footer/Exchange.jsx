import React from 'react'
import './Return.css'

const Exchange = () => {
  return (
    <div className='link'>
        <h2>Exchange</h2>
        <p>At URBANSOLE, we understand that finding the perfect fit is essential. That’s why we offer a flexible exchange policy to help you get the right pair of shoes. Whether you need a different size, color, or style, we’re here to assist you with hassle-free exchanges.</p>
        <h3>Eligibility for Exchanges</h3>
        <p>
            <ul>
                <li>
                The item must be unused, in its original condition, and in the original packaging (including the shoe box).
                </li>
                <li>The exchange request must be made within 7 days of receiving your order.</li>                
            </ul>
        </p>
        <h3>Non-Exchangeable Items</h3>

        <p>
            <ul>
                <li>Shoes marked as final sale or clearance items.</li>
                <li>Personalized or customized shoes</li>
            </ul>
        </p>
    </div>
  )
}

export default Exchange