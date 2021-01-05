import { Dispatch } from "redux"
import { AppRootStateType } from "../../app/Store"
import { TaskType, TaskAPI, UpdateTaskModelType } from "../../api/todolist-api"
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from "./TodolistsReducer"
import {setStatusAC, setErrorAC, SetErrorActionType, SetStatusActionType} from "../../app/appReducer"
import { hendleServerAppError,  hendleServerNetworkError} from "../../utils/errorUtils"

let initialState: TaskobjType = {}

export let tasksReducer = (state: TaskobjType = initialState, action: ActionType): TaskobjType => {
    switch (action.type) {
        case "REMOVE-TASK": 
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}        
        case "ADD-TASK": 
            return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}        
        case "UPDATE-TASK": 
            return { 
                ...state,
                [action.todolistId]: state[action.todolistId]
                .map(  task => task.id === action.taskId ? { ...task, ...action.bllModel } : task)
            }       
        case "ADD-TODOLIST":             
            return {...state, [action.todolist.id]:[]}        
        case "REMOVE-TODOLIST": {
            let stateCopy = { ...state }
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            let stateCopy = { ...state }
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": 
            return {...state, [action.todolistId]: action.tasks}        
        default: return state;
    }
}
// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
 ({ type: "REMOVE-TASK", taskId, todolistId } as const)
export const addTaskAC = (task: TaskType) =>
 ({ type: "ADD-TASK", task } as const)
export const updateTaskAC = (taskId: string, bllModel: UpdateBLLTaskModelType, todolistId: string) => 
    ({ type: "UPDATE-TASK", taskId, bllModel, todolistId } as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => 
    ({ type: "SET-TASKS", tasks, todolistId } as const)

// thunks
export const fetchTasksTS = (todolistId: string) => (dispatch: ThunkDispatch) => {
        dispatch (setStatusAC("loading"))
    TaskAPI.getTasks(todolistId)
            .then((res: any) => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch (setStatusAC("succeeded"))
            })
    }
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
        TaskAPI.deleteTask(todolistId, taskId)
            .then((res: any) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
export const addTaskTC = (title: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch (setStatusAC("loading"))
    TaskAPI.createTask(todolistId, title)
            .then((res: any) => {                
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch (setStatusAC("succeeded"))
                } else {
                    hendleServerAppError(res.data, dispatch)
                }                
            })
            .catch ((error)=>{
                hendleServerNetworkError(error, dispatch)
            })
    }
export const updateTaskTC = (taskId: string, bllModel: UpdateBLLTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatch , getState: () => AppRootStateType) => {
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
            TaskAPI.updateTask(todolistId, taskId, apiModel)
                .then((res: any) => {
                    if (res.data.resultCode === 0){
                        dispatch(updateTaskAC(taskId, bllModel, todolistId))
                    } else {
                        hendleServerAppError(res.data, dispatch)
                    }
                   
                })
                .catch ((error)=>{
                    hendleServerNetworkError(error, dispatch)
                })
        }
    }

//types
type ActionType = | ReturnType<typeof removeTaskAC>
                  | ReturnType<typeof addTaskAC>
                  | ReturnType<typeof updateTaskAC>
                  | AddTodolistActionType
                  | RemoveTodolistActionType
                  | SetTodolistsActionType
                  | ReturnType<typeof setTasksAC>
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

type ThunkDispatch = Dispatch<ActionType | SetStatusActionType | SetErrorActionType >