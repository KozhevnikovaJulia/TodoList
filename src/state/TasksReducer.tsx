import { v1 } from "uuid";
import {TasksType} from "../TodoList";
import {AddTodolistActionType, RemoveTodolistActionType } from "./TodolistsReducer";

type ActionType = | RemoveTaskActionType
                  | AddTaskActionType
                  | ChangeTaskStatusActionType
                  | ChangeTaskTitleActionType
                  | AddTodolistActionType
                  | RemoveTodolistActionType 

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
    isDone: boolean
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskId: string
    newTitle: string
}

export type TaskobjType = {
    [key: string]: Array<TasksType>
}

export let tasksReducer = (state: TaskobjType, action: ActionType): TaskobjType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let filtredTasks = tasks.filter(task => task.id != action.taskId)
            stateCopy[action.todolistId] = filtredTasks
                return stateCopy
           }
        
        case "ADD-TASK": {
            let stateCopy = {...state}
            let task = {id: v1(), title: action.title, isDone: false}
            let tasks = stateCopy[action.todolistId]
            let newTasks = [task, ...tasks]
            stateCopy[action.todolistId]= newTasks
            return stateCopy
        }   

        case "CHANGE-TASK-STATUS": {
            let stateCopy = { ...state }
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
             }
            return stateCopy
        }   
        
        case "CHANGE-TASK-TITLE": {
            let stateCopy = { ...state }
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.newTitle
             }
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
        default:
            throw new Error("I do not andastand this action.type!")
    }
}


export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType=> {
    return { type: "REMOVE-TASK", todolistId, taskId}
 }
 export const addTaskAC = (todolistId: string, title: string): AddTaskActionType=> {
    return { type: "ADD-TASK", todolistId, title}
 }
 export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType=> {
    return { type: "CHANGE-TASK-STATUS", todolistId, taskId, isDone}
 }
 export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType=> {
    return { type: "CHANGE-TASK-TITLE", todolistId, taskId, newTitle}
 }
