import {resetMessage} from "../slices/Productslice"

// to reset my component
export const useResetComponent = (dispatch) => {
    return () => {
        setTimeout(()=>{
         dispatch(resetMessage())
        },3000)
    }

}