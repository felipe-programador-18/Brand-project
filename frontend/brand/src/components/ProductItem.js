import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Link } from 'react-router-dom'
import { uploadsProducts } from '../settings/utils'



const ProductPhoto = ({product}) => {
  console.log("My product here", product)
   
    return(<Container>
     {product.image && ( 
        <img src={`${uploadsProducts}/product/${product.image}`} 
         alt={product.title}
         />
      )}  
     
     <h2>{product.title} </h2> 
     
     <p><span>
        Publish by: 
        <Link to={`/users/${product.userId}`} > 
           {product.Username}
         </Link>  
        </span>
     </p>
    
    </Container>)
 
}

export default ProductPhoto