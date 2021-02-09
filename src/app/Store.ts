import { appReducer } from './appReducer';
import { todolistsReducer } from "../features/todolist/TodolistsReducer"
import {tasksReducer} from "../features/todolist/TasksReducer"
import {combineReducers, createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { authReducer } from "../features/login/authReducer"
import {configureStore} from "@reduxjs/toolkit"

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend( thunkMiddleware )   
    })

export type AppRootStateType = ReturnType <typeof rootReducer>

// @ts-ignore
window.store = store;

