import React from 'react'
import './Return.css'

const Return = () => {
  return (
    <div className='link'>
      <h2>Return Policy</h2>
      <p>
      At URBANSOLE, we want you to be completely satisfied with your purchase. If you're not happy with your product, we're here to help.
      </p>
      <h3>Eligibility for Returns</h3>
      <p>
        <ul>
          <li>You have 7 days to return an item from the date you received it. </li>
          <li>To be eligible for a return, the item must be unused and in the same condition that you received it. It must also be in the original packaging.</li>
          <li>      A receipt or proof of purchase is required to complete your return.          </li>
        </ul>
      </p>
      <h3>Non-returnable Items </h3> 
      <p>
        <ul>
          <li>Used products are not returnable.</li>
          <li>Customized orders are not returnable.</li>
        </ul>
      </p>
      <h2>Refunds</h2>
      <p>
        <ul>
          <li>Once we receive your returned item, we will inspect it and notify you that we have received your returned item.</li>
          <li>If your return is approved, we will initiate a refund to your original method of payment.</li>
          <li>Refunds will be processed within 5-7 of days, but please allow additional time for your bank or credit card company to process the refund.</li>
        </ul>
      </p>
    </div>
  )
}

export default Return