import React, { useEffect, useState } from 'react'

import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../slices/Authslice' 
import MessageError from '../../components/Message'

import Container from 'react-bootstrap/esm/Container'

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


   return (<Container className="d-flex p-0 m-0 flex-column my-2 bg-light top-4" >

  <form onSubmit={HandleSubmit} >
   
    <div className="form-floating m-auto my-2 mb-3 w-50">
      <input 
      type="text" 
      readonly 
      className="form-control my-4 " 
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
    className="form-control" 
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

   {!loading && <input  className='text-center m-auto d-flex bg-success text-light' type='submit' value='Enter' /> }
   {loading && <input className='m-auto d-flex btn-dark' type='submit' disabled  value='wait...' /> }

   {error && <MessageError role="alert" msg={error} type='error' /> }
  
  </form>
  
 
 </Container>
  )
}

export default LoginUser