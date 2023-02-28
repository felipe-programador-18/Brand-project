import {useState, useEffect, useRef} from 'react'
import {Link, useParams} from  'react-router-dom'

import { uploadsProducts } from '../../settings/utils'
import MessageError from '../../components/Message'

import {resetMessage, 
  PublicProduct,
  EditProductBrand,
  getProductUser,
  DeletedProduct}  from "../../slices/Productslice"

import {useDispatch, useSelector} from 'react-redux'

import { GetUserBy } from '../../slices/Userslice'

import Container from 'react-bootstrap/Container'



const ProfileUser = () => {
 const {id} = useParams()
  
 const dispatch = useDispatch()
 const {user, loading} = useSelector((state) => state.user)
 const {user:userAuth} = useSelector((state) => state.auth)
 
 const {product,
  loading: loadingProduct,
  message: messageProduct,
  error: errorProduct
 } = useSelector((state) => state.product)


 const [title, setTitle] = useState("")
 const [image, setImage] = useState("")
 
 const [editId, setEditId] = useState("")
 const[editImage, setEditImage] = useState("")
 const [editTitle, setEditTitle ] = useState("")

 const ProductUser = useRef()
 const EditProfileUser = useRef()


// to reset my component
 const resetComponent = () => {
    setTimeout(() => {
     dispatch(resetMessage())
    },2000)
 }
 
// to manage my rending with useEffect
useEffect(() => {
  dispatch(getProductUser(id))
  dispatch(GetUserBy(id))
},[dispatch, id])


// to handlemysubmit 
 const HandleSubmit = (e) => {
  e.preventDefault()
  const photoData = {
   title, 
   image
  }

  const ProductDate = new FormData()
  const ProductformDate = Object.keys(ProductDate).forEach((key) => {
    ProductDate.append(key, photoData[key])
  })

  ProductDate.append("product", ProductformDate)
  dispatch(PublicProduct(ProductDate))
  setTitle("")
  
  resetComponent()
}

// to handleFile
const HandleFile = (e) => {
  const image = e.target.files[0]
  setImage(image)
}
// to handleDeleleted
const HandleDeleted = (id) => {
  dispatch(DeletedProduct(id))
  resetComponent()
}

// to show or hide options 
const ShowOrHide = () => {
  ProductUser.current.classList.toggle("hide")
  EditProfileUser.current.classList.toggle("hide")
}

// to handmyUpdateProductPhoto
const HandMyUpdate = (e) => {
  e.preventDefault()

  const ProductPhoto = {
    title: editTitle,
    id: editId
  }
  dispatch(EditProductBrand(ProductPhoto))
  resetComponent()
}

// here verify if my form was opened or closed
const HandEdit = (product) => {
  if( EditProfileUser.current.classList.contains("hide")){
   ShowOrHide()
  }

  setEditId(product._id)
  setEditTitle(product.title)
  setEditImage(product.image)
 }
 
//verify if i form called 
 const HandCanEdit = (e) => {
  ShowOrHide()
}

if(loading) {
  return <p>Loading Posts .....</p>
}

return ( <div className='text-center' >
  <div className='text-center'>
    {user.ProfileImage && (
     <img className=''  src={`${uploadsProducts}/users/${user.ProfileImage}`}  
     alt={user.name} />
    )}
   <div className='text-center' >
    <h2>{user.name}</h2>
     <p>{user.bio}</p> 
   </div>
  
  </div>

 
 {id === userAuth._id && (<div className='' >

 <div ref={ProductUser} >  
   <form onSubmit={HandleSubmit} >
  
    <label>
     <input type="text" />
    </label>

  
    <label>
    <span class="badge badge-light">Title Of The Product</span>
     <input 
      type="text"  
      value={title | ""}
      required
      onChange={(e) => setTitle(e.target.value)}
      placeholder='Insert a Title...'
     />
     </label>
  
     <label>
      <span className="badge badge-light" >To add an Image</span>
      <input 
      type="file"  
      value ={HandleFile}
      />
     </label>
     
     {!loadingProduct &&  <input type='submit' value='Public' /> }
     {loadingProduct && (<input type='submit' value='Hold on...' /> )}

     {errorProduct && <MessageError   msg ={errorProduct} type='error' />  }

   </form>
  </div>  


  <div className='text-decoration-none' ref={EditProfileUser}> 
    <p>Editing:</p>
     {editImage &&(<>
     <img src={`${uploadsProducts}/product/${editImage}`} alt={editImage} />
     </>)}


     <form>
      <input type="text" />
      <input type='text' />

     </form>
   
   </div>

  











 </div>)}
 <form onSubmit={HandleSubmit} >
  
  
  <label>
    <input type="text" />
  </label>

  
  <label>
  <span class="badge badge-light">Title Of The Picture</span>
    <input 
     type="text"  
     value={title | ""}
     required
     onChange={(e) => setTitle(e.target.value)}
     placeholder='Insert a Title...'
     />
  </label>
  
  <label>
    <input type="text" />
  </label>
  
  <label>
    <input type="text" />
  </label>


  </form>













</div>)
}

export default ProfileUser