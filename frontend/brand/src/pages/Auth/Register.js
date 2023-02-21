import React, {useState, useEffect} from 'react'

import {useDispatch,useSelector} from 'react-redux'

import { reset, register } from '../../slices/Authslice'

import Container from "react-bootstrap/Container"
import { useNavigate } from 'react-router-dom'



const RegisterUser = () =>{
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword, setConfirmPass] = useState("")

  
  const dispatch = useDispatch()
  const {loading, error} = useSelector((state) => state.auth)
  
   const HandleSubmit = (e) => {
    e.preventDefault()
   
    const user = {
      name,
      email,
      password,
      confirmPassword
    }
    console.log('testing my user register here', user)
    dispatch(register(user))
   }
  
  
  
  return (<Container>
     
<form>
   <div className="form-floating mb-3">
      <input
       type="text" 
       readonly
       required 
       className="form-control my-2 " 
       id="staticEmail"
       placeholder="your name"/>
      
      <label for="floatingInput" className="col-sm-2 col-form-label">Name:</label>
    
    </div> 

   
    <div className="form-floating mb-3">
      <input
       type="text" 
       readonly className="form-control my-2 " 
       id="staticEmail"
       required 
       placeholder="name@example.com"/>
      
      <label 
      for="floatingInput" 
      className="col-sm-2 col-form-label"
      >Email</label>
    
    </div> 

   <div className="form-floating mb-3">
    <input 
    type="password" 
    id="inputPassword6" 
    className="form-control" 
    aria-describedby="passwordHelpInline" 
    placeholder='Password' />
   
    <label 
    for="floatingInput"  
    id="floatingInput" 
    className="col-form-label"
    >Password</label>
    
    <span id="passwordHelpInline" className="form-text h1">
      Must be more than 7 characters long.
    </span>
   
   </div>

   <div className="form-floating mb-3">
    <input 
    type="password" 
    id="inputPassword6" 
    className="form-control"
    required 
    aria-describedby="passwordHelpInline" 
    placeholder='Password' />
   
    <label 
    for="floatingInput" 
    id="floatingInput" 
    className="col-form-label"
    >Confirm your Password</label>
    
    <span id="passwordHelpInline" className="form-text h1">
      Must be more than 7 characters long.
    </span>
   
   </div>
  
  </form> 

</Container>)


}

export default RegisterUser