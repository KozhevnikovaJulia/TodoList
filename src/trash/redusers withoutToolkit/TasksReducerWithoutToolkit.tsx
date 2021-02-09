import { Dispatch } from "redux"
import { AppRootStateType } from "../../app/Store"
import { TaskType, TaskAPI, UpdateTaskModelType } from "../../api/todolist-api"
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from "./TodolistsReducerWithoutToolkit"
import {setStatusAC, setErrorAC, SetErrorActionType, SetStatusActionType} from "./appReducerWithoutToolkit"
import { handleServerAppError,  handleServerNetworkError} from "../../utils/errorUtils"
import {ACTIONS_TYPE} from "../../utils/enumActionTypes"

let initialState: TaskobjType = {}

export let tasksReducer = (state: TaskobjType = initialState, action: ActionType): TaskobjType => {
    switch (action.type) {
        case ACTIONS_TYPE.REMOVE_TASK: 
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}        
        case ACTIONS_TYPE.ADD_TASK: 
            return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}        
        case ACTIONS_TYPE.UPDATE_TASK: 
            return { 
                ...state,
                [action.todolistId]: state[action.todolistId]
                .map(  task => task.id === action.taskId ? { ...task, ...action.bllModel } : task)
            }       
        case ACTIONS_TYPE.ADD_TODOLIST:             
            return {...state, [action.todolist.id]:[]}        
        case ACTIONS_TYPE.REMOVE_TODOLIST: {
            let stateCopy = { ...state }
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case ACTIONS_TYPE.SET_TODOLISTS: {
            let stateCopy = { ...state }
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case ACTIONS_TYPE.SET_TASKS: 
            return {...state, [action.todolistId]: action.tasks}        
        default: return state;
    }
}
// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
 ({ type: ACTIONS_TYPE.REMOVE_TASK, taskId, todolistId } as const)
export const addTaskAC = (task: TaskType) =>
 ({ type: ACTIONS_TYPE.ADD_TASK, task } as const)
export const updateTaskAC = (taskId: string, bllModel: UpdateBLLTaskModelType, todolistId: string) => 
    ({ type: ACTIONS_TYPE.UPDATE_TASK, taskId, bllModel, todolistId } as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => 
    ({ type: ACTIONS_TYPE.SET_TASKS, tasks, todolistId } as const)


// thunks
export const fetchTasksTS = (todolistId: string) =>
async (dispatch: Dispatch) => {
    try {
        dispatch (setStatusAC("loading"))
        const response = await TaskAPI.getTasks(todolistId)            
                dispatch(setTasksAC(response.data.items, todolistId))
                dispatch (setStatusAC("succeeded")) 
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
                
    }
export const removeTaskTC = (taskId: string, todolistId: string) =>
async (dispatch: Dispatch) => {
    try {
        const response = await TaskAPI.deleteTask(todolistId, taskId)           
        dispatch(removeTaskAC(taskId, todolistId)) 
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }              
    }
export const addTaskTC = (title: string, todolistId: string) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setStatusAC("loading"))
            const response = await TaskAPI.createTask(todolistId, title)

            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(response.data.data.item))
                dispatch(setStatusAC("succeeded"))
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
                    dispatch(updateTaskAC(taskId, bllModel, todolistId))
                } else {
                    handleServerAppError(response.data, dispatch)
                }
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
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