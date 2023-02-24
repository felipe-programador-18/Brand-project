import React, {useState, useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'

import { GetUserBy } from '../../slices/Userslice'
import Container from 'react-bootstrap'


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