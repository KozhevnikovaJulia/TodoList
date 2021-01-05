import {ResponseType} from "../api/todolist-api"
import { Dispatch } from "redux"
import {setStatusAC, setErrorAC, SetErrorActionType, SetStatusActionType} from "../app/appReducer"

 export const hendleServerAppError = <D> (data: ResponseType<D>, dispatch: Dispatch <SetStatusActionType | SetErrorActionType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC("Some error occurred"))
    }
    dispatch (setStatusAC("failed"))
}                
  

 export const hendleServerNetworkError = (error: any, dispatch: Dispatch <SetStatusActionType | SetErrorActionType>) => {
    dispatch(setErrorAC(error.message ? error.message : "Some error"))
    dispatch (setStatusAC("failed"))
 }