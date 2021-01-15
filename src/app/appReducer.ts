import {AuthAPI} from "../api/todolist-api"
import { Dispatch } from "redux"
import {setIsLoggedInAC} from "../features/login/authReducer"

const initialState: InitialStateType = {
   status: 'loading',
   error: null,
   isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/SET-INITIALIZED':
            return { ...state, isInitialized: action.isInitialized }
        default:
            return { ...state }
    }
}
export const setStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status } as const)
export const setErrorAC = (error: string | null) => ({ type: "APP/SET-ERROR", error } as const)
export const setInitializedAC = (isInitialized: boolean) => ({ type: 'APP/SET-INITIALIZED', isInitialized } as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    AuthAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
        }
        dispatch(setInitializedAC(true))
    })
}

//types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
   // происходит ли сейчас взаимодействие с сервером
   status: RequestStatusType
   error: string | null
   isInitialized: boolean
}
export type SetStatusActionType = ReturnType<typeof setStatusAC> 
export type SetErrorActionType = ReturnType<typeof setErrorAC>

type ActionsType = ReturnType<typeof setInitializedAC> | SetStatusActionType | SetErrorActionType
