import { Dispatch } from "redux"
import { setStatusAC } from "../../app/appReducer"
import {AuthAPI, LoginParamsType} from "../../api/todolist-api"
import { handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
   isLoggedIn: false
}
const slice = createSlice ({
   name: "auth",
   initialState: initialState,
   reducers: {
      setIsLoggedInAC (state, action: PayloadAction<{value: boolean}>) {
         state.isLoggedIn = action.payload.value
      }
   }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) =>
async (dispatch: Dispatch) => {
   try {
      dispatch(setStatusAC({status:"loading"}))
      const response = await AuthAPI.login(data)
         
            if (response.data.resultCode === 0) {
               dispatch(setIsLoggedInAC({value:true}))
               dispatch(setStatusAC({status:"succeeded"}))
            } else {
               handleServerAppError(response.data, dispatch)
            }
   } catch (error){
         handleServerNetworkError(error, dispatch)
      }
}

export const logoutTC = () =>
async (dispatch: Dispatch) => {
   try {
      dispatch(setStatusAC({status:"loading"}))
      const response = await AuthAPI.logout()
         
              if (response.data.resultCode === 0) {
                  dispatch(setIsLoggedInAC({value:false}))
                  dispatch(setStatusAC({status:"succeeded"}))
              } else {
                  handleServerAppError(response.data, dispatch)
              }
   } catch(error){
           handleServerNetworkError(error, dispatch)
       }
}
