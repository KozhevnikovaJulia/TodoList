import { v1 } from "uuid";

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}
type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter:FilterValuesType
}

export let todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let filtredTodolists = state.filter(tl => tl.id != action.id)
            return (filtredTodolists)
        }   
        case "ADD-TODOLIST": {
            let newTodolistId = v1()
            let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter:"all"}
            return [
                ...state, newTodolist
            ]
        }   
        case "CHANGE-TODOLIST-TITLE": {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [
                ...state,
            ]
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find(tl=> tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [
                ...state,
            ]
        }
        default:
            throw new Error("I do not andastand this action.type!")
    }
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST", id: todolistId}
 }
 export const AddTodolistAC = (title: string):  AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title: title }
 }
 export const ChangeTodolistTitleAC = (todolistId: string, title: string):  ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title}
 }
 export const ChangeTodolistFilterAC = (todolistId: string, filter:FilterValuesType ): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
 }