import React from 'react' 
import Container from 'react-bootstrap/esm/Container'
import { BsHeart, BsHeartFill } from 'react-icons/bs'



const LikesUser = ({product, user, HandleLike}) => {


    return (<Container>
        {product && user (<>
         {product.likes.includes(user._id)? (
            <BsHeartFill/>
          ) : (
            <BsHeart onClick={() => HandleLike(product)} />
          ) }
        </>)}
    
        <p>  {product.likes.length}  like(s).  </p>
    </Container>)
}

export default LikesUser