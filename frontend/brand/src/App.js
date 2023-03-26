
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from  './pages/Home/Home'

import NavOtherBar from './components/navbar';
import Footer from './components/Footer'

import LoginUser from './pages/Auth/Auth';

import  {UseAuth} from './hooks/Auth'
import TestingSearch from './components/TestSearch';
import RegisterUser from './pages/Auth/Register';
import EditProfile from './pages/EditUser/EditUserProfile';
import ProfileUser from './pages/Profile/ProfileUser';


function App() {
  const {auth, loading} = UseAuth()
  console.log("Testing my Auth here", auth)

  if(loading){
    return <p>Loading .....</p>
  }
  
  return (
    <div className="App">
     <BrowserRouter> 

     <NavOtherBar/>


     <div className='container' >

      <Routes>
        <Route path='/' element={ auth ? "" : 
        <Navigate to='/login' />  } />
        
        <Route path='/profile' element={ auth ? <EditProfile/> :
         <Navigate to='/login' />}  />
        
        <Route path='/users/:id' element={auth ?<ProfileUser/> : 
        <Navigate to='/login' />}     />
        
        <Route path='/login' element={ !auth ? <LoginUser/> : 
        <Navigate to='/' />  }  />
        
        <Route path='/register' element={ !auth ? <RegisterUser/> : 
        <Navigate to='/' />  }  />
        
        
        <Route path='/' element={<LoginUser/>}  />

      </Routes>

     </div>
      
     <Footer/> 
     </BrowserRouter>

    </div>
  );
}

export default App;
