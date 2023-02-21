import {useState, useEffect} from 'react' 
import { useSelector, useDispatch } from 'react-redux';
import  {useNavigate} from 'react-router-dom'

import {UseAuth} from '../hooks/Auth'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import  {BsSearch} from 'react-icons/bs'

import {NavLink,Link} from 'react-router-dom'
import {logout} from '../slices/Authslice'

const NavOtherBar = () => {
  
  const {auth} = UseAuth()
 // const {user} = useSelector((state) => state.auth)
  
  const [query, setQuery] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const HandleLogout = () => {
    dispatch(logout())
    dispatch()
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
  
  <Navbar bg="light mx-6 "  expand="lg"> 
      <Navbar.Brand href="home">Brand-Project</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          
          <Nav.Link href='/home' >Home</Nav.Link>
          <Nav.Link href="/login" >Sing-in</Nav.Link>
         
          <NavDropdown title="Information" id="basic-nav-dropdown">
            <NavDropdown.Item href="/about" >Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Product
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Users</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
   
  </Navbar> 
  
 
  )



}

export default NavOtherBar