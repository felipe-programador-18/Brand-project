import {useState, useEffect} from 'react'
import {Link, useParams} from  'react-router-dom'

import { uploadsProducts } from '../../settings/utils'

import {resetMessage, 
  PublicProduct,
  EditProductBrand,
  getProductUser,
  DeletedProduct}  from "../../slices/Productslice"

import {useDispatch, useSelector} from 'react-redux'



import { GetUserBy } from '../../slices/Userslice'
import Container from 'react-bootstrap/Container'


const ProfileUser = () => {

 const [title, setTitle] = useState("")
 const [image, setImage] = useState("")

const HandleSubmit = (e) => {
  e.preventDefault()
}


const HandleFile = () => {

}

const HandleDeleted = () => {

}

return ( <Container>


<form>


</form>

</Container> )




}

export default ProfileUser