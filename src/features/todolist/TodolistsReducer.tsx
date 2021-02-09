import {Dispatch} from "redux"
import { TodolistAPI, TodolistType } from "../../api/todolist-api"
import {TaskType} from "../../api/todolist-api"
import {setStatusAC, RequestStatusType} from "../../app/appReducer"
import { handleServerNetworkError} from "../../utils/errorUtils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

let initialState: Array<TodolistBLLType> = [] 

const slice = createSlice ({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodolistAC (state, action: PayloadAction<{todolistId: string}>) {
            const index = state.findIndex(tl=> tl.id===action.payload.todolistId)
            if(index > -1){
                state.splice(index,1)
            }
        },
        addTodolistAC (state, action: PayloadAction<{todolist: TodolistType}>) {
            state.unshift({ ...action.payload.todolist, filter: "all" , entityStatus: "idle"})           
        },
        changeTodolistTitleAC (state, action: PayloadAction<{todolistId: string, title: string}>) {
            const index = state.findIndex(tl=> tl.id===action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC (state, action: PayloadAction<{filter:FilterValuesType, todolistId: string}>) {
            const index = state.findIndex(tl=> tl.id===action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC (state, action: PayloadAction<{entityStatus:RequestStatusType, todolistId: string}>) {
            const index = state.findIndex(tl=> tl.id===action.payload.todolistId)
            state[index].entityStatus = action.payload.entityStatus
        },
        setTodolistsAC (state, action: PayloadAction<{todolists: Array<TodolistBLLType>}>) {
           return action.payload.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))  
        }
    }
 })

export let todolistsReducer = slice.reducer
export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC,
    changeTodolistFilterAC, changeTodolistEntityStatusAC, setTodolistsAC } = slice.actions

//thunks
export const fetchTodolistsTC = () =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC({status:"loading"}))
            const response: any = await TodolistAPI.getTodolists()
            dispatch(setTodolistsAC({todolists:response.data}))
            dispatch(setStatusAC({status:"succeeded"}))
        } catch (error) {
            handleServerNetworkError(error, dispatch)
        }
    }
export const removeTodolistTC = (todolistId: string) =>
async (dispatch: Dispatch) => {
    try {
        dispatch (setStatusAC({status:"loading"}))
        dispatch (changeTodolistEntityStatusAC({entityStatus:"loading", todolistId:todolistId}))
        const response: any = await TodolistAPI.deleteTodolist(todolistId)            
                    dispatch(removeTodolistAC({todolistId:todolistId}))
                    dispatch (setStatusAC({status:"succeeded"}))  
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }             
    }
export const addTodolistTC = (title: string) =>
async (dispatch: Dispatch) => {
    try {
        dispatch (setStatusAC({status:"loading"}))
        const response: any = await TodolistAPI.createTodolist(title)         
                    dispatch(addTodolistAC ({todolist:response.data.data.item}))
                    dispatch (setStatusAC({status:"succeeded"}))  
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }            
    }
export const changeTodolistTitleTC = (todolistId: string, title: string) =>
async (dispatch: Dispatch) => {
    try {
        const response: any = await TodolistAPI.updateTodolist(todolistId, title)            
        dispatch(changeTodolistTitleAC ({todolistId:todolistId, title:title}))    
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
