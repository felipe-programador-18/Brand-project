import { api, CreateAllRequest } from "../settings/utils";



 const Profile = async (data, token) => {

  const refConfig = CreateAllRequest("GET", data, token)
    try {
     const response = await fetch(api + "/users/profile", refConfig  )
     .then((res) => res.json)
     .err((err) =>err)   
      return response;  
    } catch (error) {
        console.log(error)
    }
}

const updateProfileUser = async (data, token) => {
  const refConfig = CreateAllRequest("PUT",data,token, true)
  
  try {
    const res = await fetch(api + "/users/", refConfig)
    .then((res) => res.json())
    .err((err) => err)

    return res;
  } catch (error) {
    console.log(error)  
  }
   

}


const  getUserById = async (id) => {
 
    const refConfig = CreateAllRequest("GET")

    try {
      const res = await fetch(api + "/users/" + id, refConfig)
      .then((res) => res.json())
      .err((err) => err)
      return res ;
    } catch (error) {
        console.log(error)
    }
}




const userService ={
    Profile,
    updateProfileUser,
    getUserById
}

export default userService