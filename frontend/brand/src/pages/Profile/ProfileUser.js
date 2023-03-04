import {useState, useEffect, useRef} from 'react'
import {Link, useParams} from  'react-router-dom'

import { uploadsProducts } from '../../settings/utils'
import MessageError from '../../components/Message'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'

import {resetMessage, 
  PublicProduct,
  EditProductBrand,
  getProductUser,
  DeletedProduct}  from "../../slices/Productslice"

import {useDispatch, useSelector} from 'react-redux'
import { GetUserBy } from '../../slices/Userslice'




const ProfileUser = () => {
 const {id} = useParams()
  
 const dispatch = useDispatch()
 const {user, loading} = useSelector((state) => state.user)
 const {user:userAuth} = useSelector((state) => state.auth)
 
 const {products,
  loading: loadingProduct,
  message: messageProduct,
  error: errorProduct
 } = useSelector((state) => state.product)

 console.log("testing product here", products)

 const [name, setName] = useState("")
 const [image, setImage] = useState("")
 const [describe, setDescribe] = useState("")
 const [ brand, setBrand] = useState("")
 const [price, setPrice] = useState(0)
 const [ category, setCategory] = useState("")
 const [inventory, setInventory] = useState(0)
 
 const [editId, setEditId] = useState("")
 const[editImage, setEditImage] = useState("")
 const [editName, setEditName ] = useState("")
 const [editDescribe,setEditDescribe] = useState("")
 const [editPrice, setEditPrice] = useState(0)
 const [editCategory, setEditCategory] = useState("")
 const [editInventory, setEditInventory] = useState("")

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
  dispatch(GetUserBy(id))
  dispatch(getProductUser(id))
},[dispatch, id])


// to handlemysubmit 
 const HandleSubmit = (e) => {
  e.preventDefault()
  const photoData = {
   name, 
   image,
   price,
   describe,
   category,
   inventory,
   brand
  }

  const ProductDate = new FormData()
  const ProductformDate = Object.keys(ProductDate).forEach((key) => {
    ProductDate.append(key, photoData[key])
  })

  ProductDate.append("product", ProductformDate)
  dispatch(PublicProduct(ProductDate))
  setName("")
  setDescribe("")
  
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
    name: editName,
    id: editId,
    describe: editDescribe,
    price: editPrice,
    category: editCategory,
    inventory: editInventory
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
  setEditName(product.name)
  setEditImage(product.image)
  setEditCategory(product.category)
  setEditDescribe(product.describe)
  setEditPrice(product.price)
  setEditInventory(product.inventory)
  
 }
 
//verify if i form called 
 const HandCanEdit = (e) => {
  ShowOrHide()
}

if(loading) {
  return <p>Loading Posts .....</p>
}

return ( <div className='d-flex flex-column' >
  <div className=''>
    {user.ProfileImage && (
     <img className=''  src={`${uploadsProducts}/users/${user.ProfileImage}`}  
     alt={user.name} />
    )}
   <div className='text-center' >
    <h2>{user.name}</h2>
     <p>{user.bio}</p> 
   </div>
  
  </div>

 
 {id === userAuth._id && (<> 

 <div className='' ref={ProductUser} >  
   <form onSubmit={HandleSubmit} >
  
    <label>
     <input type="text" />
    </label>

  
    <label>
    <span class="badge badge-dark">Title Of The Product</span>
     <input 
      type="text"  
      value={name || ""}
      required
      onChange={(e) => setName(e.target.value)}
      placeholder='Insert a Title...'
     />
     </label>

     <label>
    <span> Describe your product </span>
     <input 
      type="text"
      value={describe|| ""}
      required
      placeholder='Describe your product' 
      onChange={(e) => setDescribe(e.target.value)}
       />
     </label>

  
     <label>
      <p className="text-dark badge-dark" >To add an Image</p>
      <input 
      type="file"  
      onChange={HandleFile}
      />
     </label>

     <label>
     <span> Category of Product </span>
     <input 
      type="text"
      value={category|| ""}
      required
      placeholder='Category of Product' 
      onChange={(e) => setCategory(e.target.value)}
       />
     </label>

     <label>
      <span>Price of Product</span>
      <input 
       type="number" 
       placeholder='To add price on product'
       value={price || ""}
       required  
       onChange={(e) => setPrice(e.target.value)}/>
     </label>


     <label>
      <span>Price of Product</span>
      <input 
       type="number" 
       placeholder='Inventary of product'
       value={inventory || ""}
       required  
       onChange={(e) => setInventory(e.target.value)}/>
     </label>
     
     {!loadingProduct &&  <input type='submit' value='Public' /> }
     {loadingProduct && (<input type='submit' value='Hold on...' /> )}

     {errorProduct && <MessageError   msg ={errorProduct} type='error' />  }

   </form>
  </div>  


  <div className='  text-decoration-none' ref={EditProfileUser}> 
    <p>Editing:</p>
     {editImage &&(<>
     <img src={`${uploadsProducts}/product/${editImage}`} alt={editImage} />
     </>)}


     <form onSubmit={HandMyUpdate} >
      <input type="text" 
       className='m-auto text-capitalize'
       placeholder="edit your title:"
       value ={editName || ""}
       onChange={(e) => setEditName(e.target.value)}
      />
      <input className='m-auto' type='text' value='update' />
      
      <button onClick={HandCanEdit} className='btn text-capitalize btn-dark text-light' >
       Cancel Edit
      </button>
      </form>
      {errorProduct && <MessageError type='error' msg={errorProduct} />} 
      {messageProduct && <MessageError type='success' msg={messageProduct} />}
  </div>
 
 </>)}

    <div className='' >
      <h1>Product Created!</h1>
       <div>
        {products && products.map((product) => (
          <div key={product._id} >

            {product.image && (
              <img src={`${uploadsProducts}/product/${product.image}`} alt={product.name} />
            )}

            {id === userAuth._id ? (<div>
                 <Link to={`/photos/${product._id}`} >
                   <BsFillEyeFill/>  
                
                 </Link> 
                   <BsPencilFill onClick={() => HandEdit(product) } />
                   <BsXLg onClick={() => HandleDeleted(product._id) } />
            
            </div>): (<Link className='btn' to={`/photos/${product._id}`} >See.</Link> )}
          </div>
        )) }

      {products.length === 0 && <p className='text-capitalize' >anyone picture here.</p> }
       </div>
    </div>
</div>)
}

export default ProfileUser