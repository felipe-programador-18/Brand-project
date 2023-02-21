import React, {useState} from 'react'
import Container from 'react-bootstrap/esm/Container'
import  {BsSearch} from 'react-icons/bs'

const TestingSearch = () => {
  
  const [search, setQuery] = useState("")

return (<Container className='text-center' >

<form className='position-relative w-25 ' 
       id='search-form'
       onSubmit={''}>
        
        <BsSearch className='position-absolute top-4 bottom-4 '  />
        <input  type='text' placeholder='Pesquisar' onChange={(e) => setQuery(e.target.value) } />
      </form>

</Container>)

}

export default TestingSearch



