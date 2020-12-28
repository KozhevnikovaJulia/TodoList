import {Dispatch} from "redux"
import { TodolistAPI, TodolistType } from "../../api/todolist-api"
import {TaskType} from "../../api/todolist-api"
import {setStatusAC, SetStatusActionType, RequestStatusType} from "../../app/appReducer"

let initialState: Array<TodolistBLLType> = [] 

export let todolistsReducer = (state: Array<TodolistBLLType> = initialState, action: ActionType): Array<TodolistBLLType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": 
            return state.filter(tl => tl.id != action.todolistId)        
        case "ADD-TODOLIST":          
            return [...state, { ...action.todolist, filter: "all" , entityStatus: "idle"}]        
        case "CHANGE-TODOLIST-TITLE": 
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)    
        case "CHANGE-TODOLIST-FILTER": 
            return state.map(tl=> tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)            
        case "SET-TODOLISTS": 
            return action.todolists.map (tl=> ({...tl, filter: "all", entityStatus: "idle" }))        
        default: return state;
    }
}
// actions
export const removeTodolistAC = (todolistId: string) => ({ type: "REMOVE-TODOLIST", todolistId} as const) 
export const addTodolistAC = (todolist: TodolistType) => ({ type: "ADD-TODOLIST", todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({ type: "CHANGE-TODOLIST-TITLE", todolistId, title} as const)
export const changeTodolistFilterAC = (filter:FilterValuesType, todolistId: string ) => ({ type: "CHANGE-TODOLIST-FILTER", filter, todolistId} as const)
export const setTodolistsAC = (todolists: Array<TodolistBLLType> ) => ({ type: "SET-TODOLISTS", todolists} as const)
 
//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType | SetStatusActionType>) => {
    dispatch (setStatusAC("loading"))
        TodolistAPI.getTodolists()
            .then((res: any) => {
                dispatch(setTodolistsAC(res.data))
                dispatch (setStatusAC("succeeded"))
            })
    }
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
        TodolistAPI.deleteTodolist(todolistId)
            .then((res: any) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType | SetStatusActionType>) => {
    dispatch (setStatusAC("loading"))
        TodolistAPI.createTodolist(title)
            .then((res: any) => {
                dispatch(addTodolistAC (res.data.data.item))
                dispatch (setStatusAC("succeeded"))
            })
    }
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
        TodolistAPI.updateTodolist(todolistId, title)
            .then((res: any) => {
                dispatch(changeTodolistTitleAC (todolistId, title))
            })
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
export type AddTodolistActionType = ReturnType <typeof addTodolistAC> 
export type RemoveTodolistActionType = ReturnType <typeof removeTodolistAC> 
export type SetTodolistsActionType = ReturnType <typeof setTodolistsAC>