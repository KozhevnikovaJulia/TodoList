import React from "react"
import {Provider} from "react-redux"
import {combineReducers, createStore, applyMiddleware} from "redux"
import {tasksReducer} from "../../features/todolist/TasksReducer"
import {todolistsReducer} from "../../features/todolist/TodolistsReducer"
import {appReducer} from "../../app/appReducer"
import {v1} from "uuid"
import {AppRootStateType} from "../../app/Store"
import {TaskStatuses, TaskPriorities} from "../../../src/api/todolist-api"
import thunk from "redux-thunk"
import { authReducer } from "../../features/login/authReducer"

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer,
   auth: authReducer   
})

const initialGlobalState = {
todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
    {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "loading", addedDate: "", order: 0}
] ,
tasks: {
    ["todolistId1"]: [
        {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
        order: 0, addedDate: ""},
        {id: v1(), title: "JS", status: TaskStatuses.Completed, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
        order: 0, addedDate: ""}
    ],
    ["todolistId2"]: [
        {id: v1(), title: "Milk", status: TaskStatuses.Completed, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
        order: 0, addedDate: ""},
        {id: v1(), title: "React Book", status: TaskStatuses.Completed, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
        order: 0, addedDate: ""}
    ]
},
app: { status: "", error: null, isInitialized: false},
auth: { isLoggedIn: false}
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (StoryFn: any) =>
<Provider store={storyBookStore }>{StoryFn()}</Provider>

