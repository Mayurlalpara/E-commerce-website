import './Navbar.css';
//import logo from'../../assets/logo.png'
import navProfile from '../../assets/profilepic.jpg'
import logo from '../../assets/shoelog.jpeg'


function Navbar(){

    return(
      <div className="navbar">
        
        <div className="logo">
        <img src={logo} alt="" className="navlogo" />
          <h1>URBANSOLE</h1>
          <h5>Admin Panel</h5>
         </div>
         <img src={navProfile} className='nav-Profile'alt="" />
      </div>
    )
  }
  
  export default Navbar