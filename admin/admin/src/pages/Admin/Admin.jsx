import React from "react";
import './Admin.css';
import Sidebar from "../../componenets/sidebar/Sidebar.jsx";
import Addproduct from "../../componenets/addproduct/Addproduct.jsx";
import Listproduct from "../../componenets/Listproduct/Listproduct.jsx";
import Navbar from "../../componenets/Navbar/Navbar.jsx";
import Dontshow from "../../componenets/Don't/Dontshow.jsx";
import Login from "../Login/Login.jsx";
import { Routes,Route , BrowserRouter, Navigate } from "react-router-dom";
import Userlist from "../../componenets/UserList/Userlist.jsx";
import Paymentlist from "../../componenets/Paymentlist/Paymentlist.jsx";
import Feedbacklist from "../../componenets/Feedbacklist/Feedbacklist.jsx";
import OrderList from "../../componenets/orderlist/Orderlist.jsx";


function Admin(){

  

const isAuthenticated = () => {
  return localStorage.getItem("auth-token"); // Check if token exists
};



  return(
    <div className="admin">
      <Dontshow>
      <Sidebar></Sidebar>
      </Dontshow>


      <Routes>
        <Route path="/adminlogin" element={<Login></Login>}></Route>
        <Route path='/addproduct' element={isAuthenticated()?<Addproduct></Addproduct>:<Navigate to="/adminlogin"></Navigate>}></Route>
        <Route path='/listproduct' element={<Listproduct> </Listproduct>}></Route>
        <Route path="*" element={<Navigate to="/adminlogin" />} />
        <Route path='/userlist' element={isAuthenticated()?<Userlist></Userlist>:<Navigate to='/adminlogin'></Navigate>}></Route>
        <Route path="/orderlist" element={<OrderList></OrderList>}></Route>
        <Route path="/paymentlist" element={<Paymentlist></Paymentlist>}></Route>
        <Route path="/feedbacklist" element={<Feedbacklist></Feedbacklist>}></Route>
      </Routes>

      
    </div>
  )
}

export default Admin