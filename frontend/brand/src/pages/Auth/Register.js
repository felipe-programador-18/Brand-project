import React, {useState, useEffect} from 'react'

import {useDispatch,useSelector} from 'react-redux'

import { reset, register } from '../../slices/Authslice'

import Container from "react-bootstrap/Container"
import { useNavigate, Link } from 'react-router-dom'
import MessageError from '../../components/Message'



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
  
  
  return (<Container className=" d-flex flex-column my-2 bg-dark w-75 h-75 " >
     
<form onSubmit={HandleSubmit} >
   
   <div className="form-floating m-auto my-2 mb-3 w-50">
      <input
       type="text"
       required 
       className="form-control my-2 " 
       id="staticEmail"
       value={name || ""}
       placeholder="your name"
       onChange={(e) => setName(e.target.value)}
       />
      
      <label for="floatingInput" className="col-sm-2 col-form-label">Name:</label>
    
    </div> 

   
    <div className="form-floating m-auto mb-3 w-50">
      <input
       type="text" 
       readonly 
       className="form-control my-2 " 
       required 
       value={email || ""}
       placeholder="name@example.com"
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
    value={password || ""}
    required
    placeholder='Password'
    onChange={(e) => setPassword(e.target.value)}
    />
   
    <label 
    for="floatingInput"  
    //id="floatingInput" 
    className="col-form-label"
    >Password</label>

    <span id="passwordHelpInline" className="form-text h1">
      Must be more than 7 characters long.
    </span>
   
   </div>

   <div className="form-floating m-auto w-50 mb-3">
    <input 
    type="password" 
    className="form-control"
    required 
    value={confirmPassword || ""}
    placeholder='ConfirmPassword'
    onChange={(e) => setConfirmPass(e.target.value)}
    />
   
    <label 
    for="floatingInput" 
    id="floatingInput" 
    className="col-form-label"
    >Confirm your Password</label>
    
    <p className='my-2' >Already Have account? <Link className='text-light  text-decoration-none '  to='/login'>Click here</Link> </p>
   </div>


   {!loading && <input className='text-center m-auto d-flex bg-dark' type='submit' value='Register' /> }
   {loading && (<input className='text-center m-auto d-flex bg-dark' type='submit' disabled value='Wait...' />)}

   {error && <MessageError msg={error} type='error' />  }
  
  </form> 

</Container>)


}

export default RegisterUser