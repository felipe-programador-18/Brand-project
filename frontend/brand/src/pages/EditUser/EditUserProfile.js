import React, {useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Container from 'react-bootstrap/Container'

import { resetMessage, UpdateProfile, Profile } from '../../slices/Userslice'

import {uploadsProducts} from '../../settings/utils'
import MessageError from '../../components/Message'

const EditProfile = () => {
    const dispatch = useDispatch() 
    const {user,message, loading, error,} = useSelector((state) => state.user)
    
    const [name, setName] = useState("")
    const[email, setEmail]= useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")

    const [previewImage, setPreviewImage] = useState("") 


    //to loading my profileUser
    useEffect(() =>{
      dispatch(Profile())
    },[dispatch])

    // fill field!!
    useEffect(() => {
     if(user) {
       setName(user.name)
       setEmail(user.email)
       setBio(user.bio)
     }

    },[user])


    const HandleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            name
        }
       
        if(profileImage){
            userData.profileImage = profileImage;
        }
        if(bio){
            userData.bio = bio;
        }
        if(password){
           userData.password = password;
        }

        const formdata = new FormData()
        const userFormData = Object.keys(userData).forEach((key) => formdata.append(key, userData[key]))
        formdata.append("user", userFormData)
        await dispatch(UpdateProfile(formdata))

        // to control the time of dispatch 
        setTimeout(() => {
         dispatch(resetMessage())    
        },2000)

    }

    const HandleFile = (e) => {
       const image = e.target.files[0]
       setPreviewImage(image)
       setProfileImage(image)
    }
    
 
    return(<Container className='d-flex  flex-column m-auto ' >
     <h2>Edit your Dates.</h2>
     <p className='text-capitalize' >Adding a picture and tell a more about yourself.</p>
  
    {(user.profileImage || user.previewImage) && (
        <img className=' text-center rounded-circle w-25 h-25 ' src={ previewImage? URL.createObjectURL(previewImage): 
          `${uploadsProducts}/users/${user.profileImage}`}
        alt={user.name} />
    )}
   
   <div className="h4 pb-2 mb-4 text-danger border-bottom border-success">
   </div>
   
   <form onSubmit={HandleSubmit} >
   <input type="text"
       placeholder='Name' 
       onChange={(e) => setName(e.target.value)}
       value={name || ""}   
       />

      <input type="email"
       placeholder='E-mail' 
       disabled 
       value={email || ""}
       onChange ={(e) => setEmail(e.target.value)}
       />  



         <div className="mb-3">
          <label  className="form-label">
            <span>Profile Image:</span>
          </label>
          <input className="form-control" type="file" onChange={HandleFile} />
        </div>    

       <label className='mx-2'>
        <span >Bio:</span>
        <input 
         type="text"
         className='mx-2'
         placeholder='Profile description.'
         onChange={(e) => setBio(e.target.value)}
         value={bio || ""}
         />
       </label>
        
        <label >
            <span className='text-capitalize' >are you want to change password?</span>
            <input 
            type="password"
             placeholder='Type your new password.' 
             value={password || '' }
             onChange={(e) => setPassword(e.target.value)}
             />
        </label>

        <div className="h4 pb-2 mb-4 text-danger border-bottom border-success">
        </div>


        {!loading && <input type='submit' className='btn btn-dark m-auto' value='Update'  /> }
        {loading && <input  type='submit' disabled value='Wait..'  /> }

        {error && <MessageError  type='error' msg={error}/> } 
        
        {message && <MessageError type='success' msg={message} /> }

   </form>


  

    </Container >)

}


export default EditProfile