import React from 'react'

import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


const LoginUser = () => {
    

   return (<div className="row g-3 align-items-center" >

  <form>
   <div className='mb-3 row' > 
    <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"/>
    </div>
    
    </div> 

   <div className="col-auto">
     <label for="inputPassword6" className="col-form-label">Password</label>
   </div>
   <div className="col-auto">
    <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" />
   </div>
   <div className="col-auto">
    <span id="passwordHelpInline" class="form-text">
      Must be more than 7 characters long.
    </span>
    </div>
  </form>
 
 
 </div>
  )
}

export default LoginUser