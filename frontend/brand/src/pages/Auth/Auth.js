import React, { useEffect, useState } from 'react'

import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../slices/Authslice' 


const LoginUser = () => {
  
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
  
   const {loading,error} = useSelector((state) => state.auth)
   const dispatch = useDispatch()  
    
  const HandleSubmit = (e) => {  
    e.preventDefault()

    const user = {
     email,
     password
    }
    console.log(user)
    dispatch(login(user))

  }

  useEffect(() => {
    dispatch(reset())
  },[dispatch])


   return (<div className="row g-3 align-items-center my-2 " >

  <form>
   
    <div className="form-floating mb-3">
      <input 
      type="text" 
      readonly 
      className="form-control my-2 " 
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
  
  </form>
 
 
 </div>
  )
}

export default LoginUser