import React from "react";
import Navbar from "./componenets/Navbar/Navbar";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Sidebar from "./componenets/sidebar/Sidebar";
import Addproduct from "./componenets/addproduct/Addproduct.jsx";
import Listproduct from "./componenets/Listproduct/Listproduct.jsx";
import Dontshow from "./componenets/Don't/Dontshow.jsx";

function App(){


  return(
    <div>
     
      <Dontshow>
       <Navbar></Navbar>
       </Dontshow>
      
      <Admin></Admin>
      

     
    </div>
  )
}

export default App