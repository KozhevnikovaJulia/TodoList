import { v1 } from "uuid";

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
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
export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter:FilterValuesType
}
let initialState: Array<TodolistType> = [] 

export let todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let filtredTodolists = state.filter(tl => tl.id != action.todolistId)
            return (filtredTodolists)
        }   
        case "ADD-TODOLIST": {
            let newTodolistId = action.todolistId
            let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter:"all"}
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
        default: return state;
            // throw new Error("I do not andastand this action.type!")
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST", todolistId}
 }
 export const addTodolistAC = (title: string):  AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title, todolistId: v1()}
 }
 export const changeTodolistTitleAC = (todolistId: string, title: string):  ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", todolistId, title}
 }
 export const changeTodolistFilterAC = (filter:FilterValuesType, todolistId: string ): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", filter, todolistId}
 }