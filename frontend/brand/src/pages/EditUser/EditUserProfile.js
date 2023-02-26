import React, {useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Container from 'react-bootstrap/Container'

import { resetMessage, UpdateProfile, Profile } from '../../slices/Userslice'

import {uploadsProducts} from '../../settings/utils'
import MessageError from '../../components/Message'

const EditProfile = () => {
    const dispatch = useDispatch() 
  
    const [name, setName] = useState("")
    const[email, setEmail]= useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")

    const [previewImage, setPreviewname] = useState("") 

    const {user,message, loading, error,} = useSelector((state) => state.user)

    //to loading my profileUser
    useEffect(() =>{
      dispatch(Profile())
    },[dispatch])

    // fill field!!
    useEffect(() => {
     if(user) {
      setName(name)
      setEmail(email)
      setBio(bio)
     }

    },[user])


    const HandleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            name
        }
       
        if(profileImage){
            userData.profileImage = profileImage
        }
        if(bio){
            userData.bio = bio
        }
        if(password){
           userData.password = password
        }

        const formdata = new FormData()
        const userFormData = Object.keys(userData).forEach((key) => formdata.append(key, userFormData[key]))

        formdata.append("user", userFormData)
        await dispatch(UpdateProfile(formdata))

        // to control the time of dispatch 
        setTimeout(() => {
         dispatch(resetMessage())    
        },2000)

    }

    const HandleFile = (e) => {
       const image = e.target.file[0]
       setPreviewname(image)
       setProfileImage(image)
    }
    
 
    return(<Container className='text-center' >
     <h2>Edit your Date</h2>
  
    {(user.profileImage|| user.previewImage) && (
        <img className='rounded-circle w-25 h-25 ' src={ previewImage? URL.createObjectURL(previewImage): 
          `${uploadsProducts}/users/${user.profileImage}`}
        alt={user.name} />
    )}
   
   
   
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

       <label>
         <span>Profile Image:</span>
         <input type="file" 
         onChange={HandleFile}
         /> 
       </label>    

       <label>
        <span>Bio:</span>
        <input 
         type="text"
         placeholder='Profile description.'
         onChange={(e) => setBio(e.target.value)}
         value={bio || ""}
         />
       </label>
        
        <label>
            <span>Quer alterar sua Senha?</span>
            <input 
            type="password"
             placeholder='Type your new password.' 
             value={password || '' }
             onChange={(e) => setPassword(e.target.value)}
             />
        </label>

        <div class="h4 pb-2 mb-4 text-danger border-bottom border-danger">
                   Dangerous heading
        </div>


        {loading && <input type='submit' value='Update...'  /> }
        {!loading && (<input  type='submit' disabled value='Wait..'  />)  }

        {error && <MessageError  type='error' msg={error}/> } 
        
        {message && <MessageError type='success' msg={message} /> }

   </form>




    </Container>)

}


export default EditProfile