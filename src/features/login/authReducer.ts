import { Dispatch } from "redux"
import { SetErrorActionType, setStatusAC , SetStatusActionType } from "../../app/appReducer"
import {AuthAPI, LoginParamsType} from "../../api/todolist-api"
import { handleServerAppError,  handleServerNetworkError} from "../../utils/errorUtils"

const initialState = {
   isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case 'login/SET-IS-LOGGED-IN':
           return {...state, isLoggedIn: action.value}
       default:
           return state
   }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
   ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
   dispatch(setStatusAC('loading'))
   AuthAPI.login(data)
      .then((res: any) => {
         if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC("succeeded"))
         } else {
            handleServerAppError(res.data, dispatch)
         }
      })
      .catch((error) => {
         handleServerNetworkError(error, dispatch)
      })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
   dispatch(setStatusAC('loading'))
   AuthAPI.logout()
       .then(res => {
           if (res.data.resultCode === 0) {
               dispatch(setIsLoggedInAC(false))
               dispatch(setStatusAC('succeeded'))
           } else {
               handleServerAppError(res.data, dispatch)
           }
       })
       .catch((error) => {
           handleServerNetworkError(error, dispatch)
       })
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusActionType | SetErrorActionType

