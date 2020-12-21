import { v1 } from "uuid";
import {TaskType, TaskStatuses, TaskPriorities} from "../../src/api/todolist-api";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from "./TodolistsReducer";

type ActionType = | RemoveTaskActionType
                  | AddTaskActionType
                  | ChangeTaskStatusActionType
                  | ChangeTaskTitleActionType
                  | AddTodolistActionType
                  | RemoveTodolistActionType
                  | SetTodolistsActionType 

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    todolistId: string
    title: string
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
            let task = {id: v1(), title: action.title, status: TaskStatuses.New, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: action.todolistId,
            order: 0, addedDate: ""}
            let tasks = stateCopy[action.todolistId]
            let newTasks = [task, ...tasks]
            stateCopy[action.todolistId]= newTasks
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
            stateCopy[action.todolistId] = []
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
        default: return state;
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType=> {
    return { type: "REMOVE-TASK", taskId, todolistId}
 }
 export const addTaskAC = (title: string, todolistId: string): AddTaskActionType=> {
    return { type: "ADD-TASK", title, todolistId}
 }
 export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string ): ChangeTaskStatusActionType=> {
    return { type: "CHANGE-TASK-STATUS",  taskId, status, todolistId,}
 }
 export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType=> {
    return { type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId}
 }
