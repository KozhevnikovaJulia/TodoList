import { todolistsReducer } from "../features/todolist/TodolistsReducer"
import {tasksReducer} from "../features/todolist/TasksReducer"
import {combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer   
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType <typeof rootReducer>

// @ts-ignore
window.store = store;

