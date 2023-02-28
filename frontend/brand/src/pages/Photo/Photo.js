import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/esm/Container'
import ProductPhoto from '../../components/ProductItem'

import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { getUserProductId,LikeProduct, CommentProduct } from '../../slices/Productslice'

import { useResetComponent } from '../../hooks/useResetComponent'

const PhotoProduct = () => {
   const {id} = useParams()

   const dispatch= useDispatch()
    
   const ResetMess = useResetComponent()
   
   const [comments, setComments] = useState("")


   useEffect(() => {

   },[])

    return ( <Container>

    </Container>)

}

export default PhotoProduct