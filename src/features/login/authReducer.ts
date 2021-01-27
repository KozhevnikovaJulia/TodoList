import { Dispatch } from "redux"
import { SetErrorActionType, setStatusAC , SetStatusActionType } from "../../app/appReducer"
import {AuthAPI, LoginParamsType} from "../../api/todolist-api"
import { handleServerAppError,  handleServerNetworkError} from "../../utils/errorUtils"
import {ACTIONS_TYPE} from "../../utils/enumActionTypes"

const initialState = {
   isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case ACTIONS_TYPE.SET_ISLOGGEDIN:
           return {...state, isLoggedIn: action.value}
       default:
           return state
   }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
   ({type: ACTIONS_TYPE.SET_ISLOGGEDIN, value} as const)

// thunks
export const loginTC = (data: LoginParamsType) =>
async (dispatch: Dispatch<ActionsType>) => {
   try {
      dispatch(setStatusAC('loading'))
      const response = await AuthAPI.login(data)
         
            if (response.data.resultCode === 0) {
               dispatch(setIsLoggedInAC(true))
               dispatch(setStatusAC("succeeded"))
            } else {
               handleServerAppError(response.data, dispatch)
            }
   } catch (error){
         handleServerNetworkError(error, dispatch)
      }
}

export const logoutTC = () =>
async (dispatch: Dispatch<ActionsType>) => {
   try {
      dispatch(setStatusAC('loading'))
      const response = await AuthAPI.logout()
         
              if (response.data.resultCode === 0) {
                  dispatch(setIsLoggedInAC(false))
                  dispatch(setStatusAC('succeeded'))
              } else {
                  handleServerAppError(response.data, dispatch)
              }
   } catch(error){
           handleServerNetworkError(error, dispatch)
       }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusActionType | SetErrorActionType

   
// export const logout = () =>
//     async (dispatch: any) => {
//         try {
//             const response = await AuthAPI.logout()
//             if (response.data.resultCode === 0) {
//                 dispatch(setUserData(null, null, null, false))
//             }
//         } catch (error) {
//             handleServerNetworkError(error, dispatch)
//         }
//     }