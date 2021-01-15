import { appReducer } from './appReducer';
import { todolistsReducer } from "../features/todolist/TodolistsReducer"
import {tasksReducer} from "../features/todolist/TasksReducer"
import {combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { authReducer } from "../features/login/authReducer"

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType <typeof rootReducer>

// @ts-ignore
window.store = store;

