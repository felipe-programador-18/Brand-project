export const api = "http://localhost:5000/api"

// Reminder way to save uploads of backend!
export const uploads = "http://localhost:5000/uploads"


export const reqConfig = (method, data, token=null, image=null) => {

    let config
    if(image){
      config ={
       method:method,
       body: data ,
       headers:{} 
      }

    }else if(method === 'DELETE' || data === null){
      config={
       method: method,
       headers:{}
      }
    }else{
      config ={
        method,
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
      }
    }
    
    if(token){
        
    }
    
}