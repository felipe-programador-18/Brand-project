import  {api, CreateAllRequest} from "../settings/utils"


//to public product
export const publicProduct = async (data,token) => {
 
    const configReq = CreateAllRequest("POST", data,token,true)   
    try {
     const res = await fetch(api + "/product", configReq)
     .then((res) => res.json())
     .catch((err) => err)
      return res  
    } catch (error) {
       console.log(error) 
    }

}

// to delete product
export const DeletedProduct = async (id, token) => {
    
    const configReq = CreateAllRequest("DELETE",null, token)

    try {
      const res = await fetch(api + "/product/" +id, configReq)
      .then((res) => res.json())
      .catch((err) => err)
       return res; 
    } catch (error) {
      console.log(error)
    }

}

//to getuserProduct
export const getUserProductId = async (id,token) => {
    const configReq = CreateAllRequest("GET",null, token)
    try {
     const res = await fetch(api + "/product/user/" + id, + configReq)
     .then((res) => res.json())
     .catch((err) => err)
     return res;
    } catch (error) {
        console.log(error)
    }

}

// to edit my product
export const EditProduct = async (data, id, token) =>{  
    const configReq = CreateAllRequest("PUT",data, token)

    try {
     const res = await fetch(api +"/product/" +id, configReq)
     .then((res) => res.json())
     .catch((err) => err)
     return res;
    } catch (error) {
     console.log(error)
    }

}


export const getAllProduct = async(token) =>{
    
    const configReq = CreateAllRequest("GET", null, token)
    
    try {
      const res = await fetch(api +"/product", configReq)
      .then((res) => res.json())
      .catch((err) => err)
      return res;  
    } catch (error) {
      console.log(error)   
    }
}

const ProductService = {
    publicProduct,
    DeletedProduct,
    getUserProductId,
    EditProduct,
    getAllProduct 
}

export default ProductService