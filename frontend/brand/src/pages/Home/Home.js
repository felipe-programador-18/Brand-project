import {useEffect}from 'react'
import Container from 'react-bootstrap/esm/Container'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'

import ProductPhoto from '../../components/ProductItem'
import LikesUser from '../../components/Likes'

import { useResetComponent } from '../../hooks/useResetComponent'
import { getAllProduct, LikeProduct } from '../../slices/Productslice'


const Home = () => {
 
    const dispatch= useDispatch()
    const resetMessage = useResetComponent(dispatch)

    const {user} = useSelector((state) => state.auth)
    const {products, loading} = useSelector((state) => state.product)
    console.log('my product here', products)

    useEffect(() => {
     dispatch(getAllProduct())
    },[dispatch])
   
       //like photo
    const handleLike = (product) => {
        dispatch(LikeProduct(product._id))
        resetMessage()
       }
   
       if(loading){
        return <p>Carregando..</p>
       }
   


    return( <Container>
     {products &&
        products.map((product) => (
          <div key={product._id}>
            <ProductPhoto product={product} />
            <LikesUser product={product} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/product/${product._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {products && products.length === 0 && (
        <h2 className="no-product">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user.userId}`}>clique aqui</Link> para começar.
        </h2>
      )}    


    </Container> )

}

export default Home