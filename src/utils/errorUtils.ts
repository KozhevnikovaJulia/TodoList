import {ResponseType} from "../api/todolist-api"
import { Dispatch } from "redux"
import {setStatusAC, setErrorAC} from "../app/appReducer"

 export const handleServerAppError = <D> (data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setErrorAC({error:"Some error occurred"}))
    }
    dispatch (setStatusAC({status:"failed"}))
}                
  

 export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {
    dispatch(setErrorAC(error.message ? error.message : "Some error"))
    dispatch (setStatusAC({status:"failed"}))
 }