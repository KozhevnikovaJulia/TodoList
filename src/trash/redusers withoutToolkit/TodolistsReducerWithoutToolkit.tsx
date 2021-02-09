import {Dispatch} from "redux"
import { TodolistAPI, TodolistType, TaskType } from "../../api/todolist-api"
import {setStatusAC, SetStatusActionType, SetErrorActionType, RequestStatusType} from "./appReducerWithoutToolkit"
import { handleServerAppError,  handleServerNetworkError} from "../../utils/errorUtils"
import {ACTIONS_TYPE} from "../../utils/enumActionTypes"

let initialState: Array<TodolistBLLType> = [] 

export let todolistsReducer = (state: Array<TodolistBLLType> = initialState, action: ActionType): Array<TodolistBLLType> => {
    switch (action.type) {
        case ACTIONS_TYPE.REMOVE_TODOLIST: 
            return state.filter(tl => tl.id != action.todolistId)        
        case ACTIONS_TYPE.ADD_TODOLIST:          
            return [...state, { ...action.todolist, filter: "all" , entityStatus: "idle"}]        
        case ACTIONS_TYPE.CHANGE_TODOLIST_TITLE: 
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)    
        case ACTIONS_TYPE.CHANGE_TODOLIST_FILTER: 
            return state.map(tl => tl.id === action.todolistId ? { ...tl, filter: action.filter } : tl)
        case ACTIONS_TYPE.CHANGE_TODOLIST_ENTITY_STATUS:
            return state.map(tl => tl.id === action.todolistId ? { ...tl, entityStatus: action.entityStatus } : tl)
        case ACTIONS_TYPE.SET_TODOLISTS:
            return action.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
        default: return state;
    }
}
// actions
export const removeTodolistAC = (todolistId: string) => ({ type: ACTIONS_TYPE.REMOVE_TODOLIST, todolistId} as const) 
export const addTodolistAC = (todolist: TodolistType) => ({ type: ACTIONS_TYPE.ADD_TODOLIST, todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({ type: ACTIONS_TYPE.CHANGE_TODOLIST_TITLE, todolistId, title} as const)
export const changeTodolistFilterAC = (filter:FilterValuesType, todolistId: string ) => ({ type: ACTIONS_TYPE.CHANGE_TODOLIST_FILTER, filter, todolistId} as const)
export const changeTodolistEntityStatusAC = (entityStatus:RequestStatusType, todolistId: string ) => ({ type: ACTIONS_TYPE.CHANGE_TODOLIST_ENTITY_STATUS, entityStatus, todolistId} as const)
export const setTodolistsAC = (todolists: Array<TodolistBLLType> ) => ({ type: ACTIONS_TYPE.SET_TODOLISTS, todolists} as const)
 
//thunks
export const fetchTodolistsTC = () =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC("loading"))
            const response: any = await TodolistAPI.getTodolists()
            dispatch(setTodolistsAC(response.data))
            dispatch(setStatusAC("succeeded"))
        } catch (error) {
            handleServerNetworkError(error, dispatch)
        }
    }
export const removeTodolistTC = (todolistId: string) =>
async (dispatch: Dispatch) => {
    try {
        dispatch (setStatusAC("loading"))
        dispatch (changeTodolistEntityStatusAC("loading", todolistId))
        const response: any = await TodolistAPI.deleteTodolist(todolistId)            
                    dispatch(removeTodolistAC(todolistId))
                    dispatch (setStatusAC("succeeded"))  
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }             
    }
export const addTodolistTC = (title: string) =>
async (dispatch: Dispatch) => {
    try {
        dispatch (setStatusAC("loading"))
        const response: any = await TodolistAPI.createTodolist(title)         
                    dispatch(addTodolistAC (response.data.data.item))
                    dispatch (setStatusAC("succeeded"))  
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }            
    }
export const changeTodolistTitleTC = (todolistId: string, title: string) =>
async (dispatch: Dispatch) => {
    try {
        const response: any = await TodolistAPI.updateTodolist(todolistId, title)            
        dispatch(changeTodolistTitleAC (todolistId, title))    
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }           
    }
//types
export type TaskobjType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistBLLType = TodolistType & {
    filter:FilterValuesType
    entityStatus: RequestStatusType
}
type ActionType = | RemoveTodolistActionType 
                  | AddTodolistActionType
                  | ReturnType <typeof changeTodolistTitleAC> 
                  | ReturnType <typeof changeTodolistFilterAC> 
                  | SetTodolistsActionType
                  |  ChangeTodolistEntityStatusActionType
export type AddTodolistActionType = ReturnType <typeof addTodolistAC> 
export type RemoveTodolistActionType = ReturnType <typeof removeTodolistAC> 
export type SetTodolistsActionType = ReturnType <typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType <typeof changeTodolistEntityStatusAC>
type ThunkDispatch = Dispatch<ActionType | SetStatusActionType |SetErrorActionType  >