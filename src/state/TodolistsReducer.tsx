import { v1 } from "uuid";
import {Dispatch} from "redux";
import { TodolistAPI, TodolistType } from "../api/todolist-api";

export type FilterValuesType = "all" | "completed" | "active";

let initialState: Array<TodolistBLLType> = [] 

export type TodolistBLLType = TodolistType & {
    filter:FilterValuesType
};


type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType

export type SetTodolistsActionType = {
    type: "SET-TODOLISTS"
    todolists: Array<TodolistBLLType>
}
export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    todolist: TodolistType
}
type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    todolistId: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    todolistId: string
    filter: FilterValuesType
}

export let todolistsReducer = (state: Array<TodolistBLLType> = initialState, action: ActionType): Array<TodolistBLLType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let filtredTodolists = state.filter(tl => tl.id != action.todolistId)
            return (filtredTodolists)
        }   
        case "ADD-TODOLIST": {
            let newTodolist: TodolistBLLType = { ...action.todolist, filter: "all" }
            return [
                ...state, newTodolist
            ]
        }   
        case "CHANGE-TODOLIST-TITLE": {
            let todolist = state.find(tl => tl.id === action.todolistId)
            if (todolist) {
                todolist.title = action.title
            }
            return [
                ...state,
            ]
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find(tl=> tl.id === action.todolistId)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [
                ...state,
            ]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map (tl=> {
                return {
                    ...tl,
                    filter: "all"
                }                
            })
        }
        default: return state;
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST", todolistId}
 }
 export const addTodolistAC = (todolist: TodolistType):  AddTodolistActionType => {
    return { type: "ADD-TODOLIST", todolist}
 }
 export const changeTodolistTitleAC = (todolistId: string, title: string):  ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", todolistId, title}
 }
 export const changeTodolistFilterAC = (filter:FilterValuesType, todolistId: string ): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", filter, todolistId}
 }
 export const setTodolistsAC = (todolists: Array<TodolistBLLType> ): SetTodolistsActionType => {
    return { type: "SET-TODOLISTS", todolists}
 }
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        TodolistAPI.getTodolists()
            .then((res: any) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        TodolistAPI.deleteTodolist(todolistId)
            .then((res: any) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        TodolistAPI.createTodolist(title)
            .then((res: any) => {
                dispatch(addTodolistAC (res.data.data.item))
            })
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        TodolistAPI.updateTodolist(todolistId, title)
            .then((res: any) => {
                dispatch(changeTodolistTitleAC (todolistId, title))
            })
    }
}