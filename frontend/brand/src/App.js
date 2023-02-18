
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavOtherBar from './components/navbar';
import LoginUser from './pages/Auth/Auth';

function App() {
  return (
    <div className="App">
     <BrowserRouter> 

     <NavOtherBar/>

     <div className='container' >

      <Routes>
        <Route path='/' element={''} />
        
        <Route path='/login' element={<LoginUser/>}  />
        <Route path='/register' element={<LoginUser/>}  />
        
        <Route path='/' element={<LoginUser/>}  />
        <Route path='/' element={<LoginUser/>}  />
        <Route path='/' element={<LoginUser/>}  />



      </Routes>

     </div>
    
     </BrowserRouter>

    </div>
  );
}

export default App;
