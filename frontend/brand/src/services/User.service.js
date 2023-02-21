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






module.exports ={
    Profile
}