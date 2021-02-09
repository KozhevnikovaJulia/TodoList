import {AuthAPI} from "../api/todolist-api"
import { Dispatch } from "redux"
import {setIsLoggedInAC} from "../features/login/authReducer"
import { handleServerNetworkError } from "../utils/errorUtils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: InitialStateType = {
   status: "loading",
   error: null,
   isInitialized: false
}
const slice = createSlice ({
    name: "app",
    initialState: initialState,
    reducers: {
        setStatusAC (state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setErrorAC (state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error 
        },
        setInitializedAC (state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
 })
export const appReducer = slice.reducer
export const {setInitializedAC, setErrorAC, setStatusAC} = slice.actions

export const initializeAppTC = () =>
async (dispatch: Dispatch) => {
    try {
        const response = await AuthAPI.me()   
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}))
        } else {
        }
        dispatch(setInitializedAC({isInitialized:true}))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
   
   
}

//types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
   // происходит ли сейчас взаимодействие с сервером
   status: RequestStatusType
   error: string | null
   isInitialized: boolean
}
 