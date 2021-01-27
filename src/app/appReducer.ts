import {AuthAPI} from "../api/todolist-api"
import { Dispatch } from "redux"
import {setIsLoggedInAC} from "../features/login/authReducer"
import {ACTIONS_TYPE} from "../utils/enumActionTypes"
import { handleServerAppError,  handleServerNetworkError} from "../utils/errorUtils"

const initialState: InitialStateType = {
   status: 'loading',
   error: null,
   isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.SET_STATUS:
            return { ...state, status: action.status }
        case ACTIONS_TYPE.SET_ERROR:
            return { ...state, error: action.error }
        case ACTIONS_TYPE.SET_INITIALIZED:
            return { ...state, isInitialized: action.isInitialized }
        default:
            return { ...state }
    }
}
export const setStatusAC = (status: RequestStatusType) => ({ type: ACTIONS_TYPE.SET_STATUS, status } as const)
export const setErrorAC = (error: string | null) => ({ type: ACTIONS_TYPE.SET_ERROR, error } as const)
export const setInitializedAC = (isInitialized: boolean) => ({ type: ACTIONS_TYPE.SET_INITIALIZED, isInitialized } as const)

export const initializeAppTC = () =>
async (dispatch: Dispatch) => {
    try {
        const response = await AuthAPI.me()   
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
        }
        dispatch(setInitializedAC(true))
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
export type SetStatusActionType = ReturnType<typeof setStatusAC> 
export type SetErrorActionType = ReturnType<typeof setErrorAC>

type ActionsType = ReturnType<typeof setInitializedAC> | SetStatusActionType | SetErrorActionType


 