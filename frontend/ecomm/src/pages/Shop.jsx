import React from "react";
import Hero from "../Components/hero/Hero.jsx";
import Popular from "../Components/popular/Popular.jsx";
import Offers from "../Components/Offers/Offer.jsx";
import Newcoll from "../Components/Newcollection/Newcoll.jsx";
import Newsletter from "../Components/Newsletter/Newsletter.jsx";
import Footer from "../Components/Footer/Footer.jsx";

const Shop= () =>{
    return(
        <div>
           <Hero></Hero>
           <Popular></Popular>
           <Offers></Offers>
           <Newcoll></Newcoll>
        </div>
    )
}
export default Shop