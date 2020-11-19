import { todolistsReducer } from "./../state/TodolistsReducer";
import {tasksReducer} from "./../state/TasksReducer";
import {combineReducers, createStore} from "redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer   
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType <typeof rootReducer>

// @ts-ignore
window.store = store;

