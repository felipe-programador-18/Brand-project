export const api = "http://localhost:5000/api"

export const uploadsProducts = "http://localhost:5000/uploads"

export const CreateAllRequest = (method, data, token=null , image=null ) => {
    let config;
    if(image) {
     config= {
      method:method,
      body:data,
      headers:{}
     }  
    }else if (method === 'DELETE' || data === null ) {
     config ={
        method:method,
        headers:{}
     }
    }else {
     // this case with me receive dates!
     config ={
       method,
       body: JSON.stringify(data),
       headers:{
        "Content-Type":"application/json"
       }
     }
    }

    
    if(token){
     config.headers.Authorization = `Bearer ${token}`
    }
   
   return config;
}