import {Dispatch} from "redux";
import {AppRootStateType} from "../../src/store/Store";
import {TaskType, TaskStatuses, TaskPriorities, TaskAPI} from "../../src/api/todolist-api";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from "./TodolistsReducer";

type ActionType = | RemoveTaskActionType
                  | AddTaskActionType
                  | ChangeTaskStatusActionType
                  | ChangeTaskTitleActionType
                  | AddTodolistActionType
                  | RemoveTodolistActionType
                  | SetTodolistsActionType 
                  | SetTasksActionType


type SetTasksActionType = {
    type: "SET-TASKS"
    tasks: Array<TaskType>
    todolistId: string
   
}
type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    task: TaskType
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskId: string
    status: TaskStatuses
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskId: string
    newTitle: string
}

export type TaskobjType = {
    [key: string]: Array<TaskType>
}

let initialState: TaskobjType = {}

export let tasksReducer = (state: TaskobjType = initialState, action: ActionType): TaskobjType => {
    switch (action.type) {
        case "REMOVE-TASK": {
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
                }
           }
        
        case "ADD-TASK": {
            let stateCopy = {...state}         
            let tasks = stateCopy[action.task.todoListId]
            let newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId]= newTasks
            return stateCopy
        } 
        
        case "CHANGE-TASK-STATUS": {
            let stateCopy = { ...state }
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map (
                 task => task.id === action.taskId ?
                {...task, status: action.status} :
                task )
            return stateCopy
        }   
        
        case "CHANGE-TASK-TITLE": {
            let stateCopy = { ...state }
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map (
                 task => task.id === action.taskId ?
                {...task, title: action.newTitle} :
                task )
            return stateCopy
        }        
        case "ADD-TODOLIST": {
            let stateCopy = { ...state }
            stateCopy[action.todolist.id] = []
            return stateCopy
        }   
        case "REMOVE-TODOLIST": {
            let stateCopy = { ...state }
            delete stateCopy[action.todolistId] 
            return stateCopy
        }   
        case "SET-TODOLISTS": {
            let stateCopy = { ...state }
            action.todolists.forEach(tl=>{
                stateCopy[tl.id] = []
            })
            return stateCopy
        }   
        case "SET-TASKS": {
            let stateCopy = { ...state }
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }   
        default: return state;
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType=> {
    return { type: "REMOVE-TASK", taskId, todolistId}
 }
 export const addTaskAC = (task: TaskType): AddTaskActionType=> {
    return { type: "ADD-TASK", task}
 }
 export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string ): ChangeTaskStatusActionType=> {
    return { type: "CHANGE-TASK-STATUS",  taskId, status, todolistId,}
 }
 export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType=> {
    return { type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId}
 }
 export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return { type: "SET-TASKS", tasks, todolistId}
 }

 export const fetchTasksTS = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        TaskAPI.getTasks(todolistId)
            .then((res: any) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
     }
    }
         
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        TaskAPI.deleteTask(todolistId, taskId)
            .then((res: any) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

export const addTaskTC = (title: string, todolistId: string ) => {
    return (dispatch: Dispatch) => {
        TaskAPI.createTask (todolistId, title)
            .then((res: any) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}
export const changeTaskTitleTC = (taskId: string, newTitle: string, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            TaskAPI.updateTask(todolistId, taskId, {
                title: newTitle,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline})
                .then((res: any) => {
                    dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
                })
        }
    }
}

export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch,  getState: () => AppRootStateType) => {
        
       const allTasksFromState = getState().tasks;
       const tasksForCurrentTodolist = allTasksFromState[todolistId]
       const task = tasksForCurrentTodolist.find(t => {
             return t.id === taskId
       })

       if (task) {
        TaskAPI.updateTask (todolistId, taskId, {
             title: task.title,
             description: task.description,
             status: status,
             priority: task.priority,
             startDate: task.startDate,
             deadline: task.deadline})
            .then((res: any) => {
                dispatch(changeTaskStatusAC (taskId, status, todolistId))
            })
       }       
    }
}