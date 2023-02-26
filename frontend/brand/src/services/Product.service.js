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
export const getProductUserId = async (id,token) => {
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

// to getuser id

export const getUserId =  async(id,token) => {
     
    const configReq= CreateAllRequest("GET",null,token)
    try {
      const res = await fetch(api +"/product/"+id,configReq)
      .then((res) =>res.json())
      .catch((err) => err)
      return res;
    } catch (error) {
        console.log(error)
    }
}

// to get all GetAll product
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


export const CommentProduct = async(data,id, token) => {

  const configReq= CreateAllRequest("PUT", data,token)

   try {
    const res = await fetch(api+ '/product/comment/' +id, configReq)
    .then((res) => res.json())
    .catch((err) => err)
    return res;
   } catch (error) {
     console.log(error)  
   }


}

export const LikeProduct= async (id,token) => {

    const configReq = CreateAllRequest("PUT",null, token)
    try {
     const res = await fetch(api + "/product/like/" +id, configReq)
     .then((res) => res.json())
     .catch((err) => err)
     return res ;
        
    } catch (error) {
        console.log(error)
    }
}

export const SearchProduct = async (query, token) => {
  const configReq = CreateAllRequest("GET",null, token)

  try {
    const res = await fetch(api+ "/product/search?q="+ query, configReq)
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
    getProductUserId,
    EditProduct,
    getAllProduct,
    CommentProduct,
    LikeProduct,
    getUserId,
    SearchProduct  
}

export default ProductService