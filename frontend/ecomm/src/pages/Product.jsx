import React, { useContext } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { useParams } from "react-router-dom";
import Breadcrums from "../Components/Breadcrums/Breadcrums.jsx";
import Productdis from "../Components/Productdis/Productdis.jsx";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox.jsx";
//import RelatedProducts from "../Components/RelatedProducts/RelatedProducts.jsx";

function Product(){
    const {all_product} = useContext(Shopcontext);
    const {productId} = useParams();
    const product = all_product.find((e)=> e.id === Number(productId));
    return(
        <div>
          <Breadcrums product={product}></Breadcrums>
          <Productdis product={product}></Productdis>
          <DescriptionBox></DescriptionBox>
        </div>
    )
}
export default Product