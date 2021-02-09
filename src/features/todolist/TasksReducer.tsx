import { Dispatch } from "redux"
import { AppRootStateType } from "../../app/Store"
import { TaskType, TaskAPI, UpdateTaskModelType } from "../../api/todolist-api"
import {setStatusAC} from "../../app/appReducer"
import { handleServerAppError,  handleServerNetworkError} from "../../utils/errorUtils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { removeTodolistAC, addTodolistAC, setTodolistsAC } from "../todolist/TodolistsReducer"

let initialState: TaskobjType = {}

const slice = createSlice ({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, bllModel: UpdateBLLTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = { ...tasks[index], ...action.payload.bllModel }
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [] 
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                                state[tl.id] = []
                            })
        });
    }
    // extraReducers: {
    //     [removeTodolistAC.type](state, action: PayloadAction<{}>) { },
    //     [addTodolistAC.type](state, action: PayloadAction<{}>) { },
    //     [setTodolistsAC.type](state, action: PayloadAction<{}>) { }
    // }
})
 export const tasksReducer = slice.reducer
 export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC } = slice.actions

// thunks
export const fetchTasksTS = (todolistId: string) =>
async (dispatch: Dispatch) => {
    try {
        dispatch (setStatusAC({status:"loading"}))
        const response = await TaskAPI.getTasks(todolistId)            
                dispatch(setTasksAC({tasks:response.data.items, todolistId:todolistId}))
                dispatch (setStatusAC({status:"succeeded"})) 
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
                
    }
export const removeTaskTC = (taskId: string, todolistId: string) =>
async (dispatch: Dispatch) => {
    try {
        const response = await TaskAPI.deleteTask(todolistId, taskId)           
        dispatch(removeTaskAC({taskId:taskId, todolistId:todolistId})) 
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }              
    }
export const addTaskTC = (title: string, todolistId: string) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC({status:"loading"}))
            const response = await TaskAPI.createTask(todolistId, title)

            if (response.data.resultCode === 0) {
                dispatch(addTaskAC({task:response.data.data.item}))
                dispatch(setStatusAC({status:"succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
        }
    }
export const updateTaskTC = (taskId: string, bllModel: UpdateBLLTaskModelType, todolistId: string) =>
async (dispatch: Dispatch , getState: () => AppRootStateType) => {
        try {
            const allTasksFromState = getState().tasks;
            const tasksForCurrentTodolist = allTasksFromState[todolistId]
            const task = tasksForCurrentTodolist.find(t => t.id === taskId)
            if (task) {
                const apiModel: UpdateTaskModelType = {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    ...bllModel
                }
                const response = await TaskAPI.updateTask(todolistId, taskId, apiModel)

                if (response.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId:taskId, bllModel:bllModel, todolistId:todolistId}))
                } else {
                    handleServerAppError(response.data, dispatch)
                }
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
        }
    }

//types
export type UpdateBLLTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export type TaskobjType = {
    [key: string]: Array<TaskType>
}
