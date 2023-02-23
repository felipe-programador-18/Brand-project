import React, { useEffect, useState } from 'react'

import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../slices/Authslice' 
import MessageError from '../../components/Message'


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


   return (<div className=" d-flex flex-column my-2 " >

  <form onSubmit={HandleSubmit} >
   
    <div className="form-floating m-auto mb-3 w-50">
      <input 
      type="text" 
      readonly 
      className="form-control m-auto my-4 " 
      id="staticEmail"
      required 
      placeholder="name@example.com"
      value={email|| ""}
      onChange={(e) => setEmail(e.target.value)}
      />
      
      <label 
      for="floatingInput" 
      className="col-sm-2 col-form-label"
      >Email</label>
    
    </div> 

   <div className="form-floating m-auto mb-3 w-50">
    <input 
    type="password" 
    className="form-control  m-auto" 
    aria-describedby="passwordHelpInline"
    value={password|| ""} 
    placeholder='Password'
    onChange={(e) => setPassword(e.target.value)}
    />
   
    <label 
    for="floatingInput" 

    className="col-form-label"
    >Password</label>
     
   </div>

   {!loading && <input  className='m-auto w-25 text-center d-flex bg-dark text-light ' type='submit' value='Enter' /> }
   {loading && <input className='m-auto d-flex btn-dark' type='submit' disabled  value='wait...' /> }

   {error && <MessageError msg={error} type='error' /> }
  
  </form>
 
 
 </div>
  )
}

export default LoginUser