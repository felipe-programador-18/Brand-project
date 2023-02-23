import {useState} from 'react' 
import { useSelector, useDispatch } from 'react-redux';
import  {useNavigate} from 'react-router-dom'

import {UseAuth} from '../hooks/Auth'


import {NavLink,Link} from 'react-router-dom'
import {logout,reset} from '../slices/Authslice'

const NavOtherBar = () => {
  
  const {auth} = UseAuth()
  const {user} = useSelector((state) => state.auth)
  
  const [query, setQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const HandleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/login")
  }


  const HandleSearch = (e) => {
    e.preventDefault()
    
    if(query){
      return navigate(`/search?=q${query}`)
    }
    
    setQuery("")
  }



    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  
  <div className="container-fluid">
     
     <Link className='text-decoration-none text-dark ' to='/' > BrandStore </Link>
 
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {auth?  ( <>  
        <li className="nav-item">
          <Link to='/' className="nav-link active" >Home</Link>
        </li>
        {user && (<>
          <li>
              <NavLink className="dropdown-item"  > 
              User
              </NavLink>
            </li>  
        
        </>)}
        <li>
              <Link className="dropdown-item"  > 
             Profile
              </Link>
        </li> 

        <li>
           <span onClick={HandleLogout} >Logout</span>
        </li>
      
      </> ):  (<>
         {" "}
        
        <li className="nav-item">
          <Link className='nav-link' to='/login' >Sing-in </Link> 
        </li>
         <li>
          <Link className='nav-link' to='/register' >Register</Link>
         </li>
      
      </>
      )}
    </ul>    
       
  
     
      <form className="d-flex" role="search" onSubmit={HandleSearch} >
        <input className="form-control me-2" 
        type="search" 
        placeholder="Search"
        aria-label="Search" 
        onChange={(e) => setQuery(e.target.value) }
        />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
   
   
   
    </div>
  </div>
</nav>
  
  
 
  )



}

export default NavOtherBar