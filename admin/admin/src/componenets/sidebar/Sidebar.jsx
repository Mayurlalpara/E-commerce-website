import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';
import cart from '../../assets/Product_Cart.svg';
import listpro from '../../assets/Product_list_icon.svg'
import user from '../../assets/user.png'
import money from '../../assets/money.png'
import feedback from '../../assets/feedback.png'
import order from '../../assets/booking.png'

function Sidebar(){
   return(
    <div className ='sidebar'>
      <Link to={'/userlist'} style={{textDecoration:"none" }}>
       <div className="sidebar-item">
        <img src={user} alt=""></img>
        <p>List of Users</p>
       </div>
       </Link>
       <Link to={'/addproduct'} style={{textDecoration:"none" }}>
       <div className="sidebar-item">
        <img src={cart} alt=""></img>
        <p>Add Product</p>
       </div>
       </Link>
       <Link to={'/listproduct'} style={{textDecoration:"none" }}>
       <div className="sidebar-item">
        <img src={listpro} alt=""></img>
        <p>List of Products</p>
       </div>
       </Link>
       <Link to={'/paymentlist'} style={{textDecoration:"none" }}>
       <div className="sidebar-item">
        <img src={money} alt=""></img>
        <p>List of Payments</p>
       </div>
       </Link>
       <Link to={'/feedbacklist'} style={{textDecoration:"none" }}>
       <div className="sidebar-item">
        <img src={feedback} alt=""></img>
        <p>List of Feedbacks</p>
       </div>
       </Link>
       <Link to={'/orderlist'} style={{textDecoration:"none" }}>
       <div className="sidebar-item">
        <img src={order} alt=""></img>
        <p>List of orders</p>
       </div>
       </Link>
    </div>
   )
}

export default Sidebar