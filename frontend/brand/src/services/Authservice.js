import { api, CreateAllRequest } from "../settings/utils";


const registerNew = async (data) => {
 
    const config = CreateAllRequest("POST", data)

    try {
      const res = await fetch(api + "/users/register", config)
      .then((res) => res.json)
      .err(err => err)
  
      if(res._id){
       localStorage.setItem("user", JSON.stringify(res))
      }
      return res  
    
    } catch (error) {
      console.log(error)
    }

}


const logoutUser =() => {
    localStorage.removeItem("user")
}

const loginUser = async (data) => {
    const config = CreateAllRequest("POST", data)
    try {
     const res = await fetch(api + "/users/login", config)
     .then((res) => res.json())
     .err((err) => err)
      
     if(res._id){
        localStorage.setItem("user", JSON.stringify(res))
     }
     return res

    } catch (error) {
      console.log(error)
    }
}




const  AuthService ={
    registerNew,
    loginUser,
    logoutUser, 
}

export default AuthService