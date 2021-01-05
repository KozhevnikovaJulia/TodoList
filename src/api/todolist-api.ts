import Axios from "axios"

export enum TaskStatuses {
New = 0,
InProgress = 1,
Completed = 2,
Draft = 3
}
export enum TaskPriorities {
Low = 0,
Middle = 1,
Hi = 2,
Urgently = 3,
Later = 4
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
 }
 export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
 } 

 export type TaskType= {
description: string
title: string
status: TaskStatuses
priority: TaskPriorities
startDate: string
deadline: string
id: string
todoListId: string
order: number
addedDate: string
 }
 type GetTaskResponce = {
     error: string
     totalCount: number
     items:Array<TaskType>
 }

const instance = Axios.create ({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
     withCredentials: true,
     headers: { "API-KEY": "e9273c8b-70eb-4960-b897-692d970ce8cd"}
})

export const TodolistAPI = {
    getTodolists  () {
        return instance.get <Array<TodolistType>>(`todo-lists/`)
    },
    createTodolist (title: string) {
        return instance.post <ResponseType<{item: TodolistType}> >(`todo-lists/` , {title})
    },
    deleteTodolist (todolistId: string) {
        return instance.delete <ResponseType<{}>>(`todo-lists/`+ todolistId)
    },
    updateTodolist (todolistId: string, title: string) {
        return instance.put <ResponseType< {}>>(`todo-lists/${todolistId}`, {title})
    },
}

export const TaskAPI = {
    getTasks  (todolistId: string) {
        return instance.get <GetTaskResponce>(`todo-lists/${todolistId}/tasks`)
    },
    createTask (todolistId: string, title: string) {
        return instance.post <ResponseType<{item: TaskType}> >(`todo-lists/${todolistId}/tasks` , {title})
    },
    deleteTask (todolistId: string, taskId: string) {
        return instance.delete <ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    // updateTask (todolistId: string, taskId: string, model: UpdateTaskModelType{ title: string, description: string,
    //              status: number, priority: number, startDate: string, deadline: string}) {
    //     return instance.put <ResponseType<{}>> (`todo-lists/${todolistId}/tasks/${taskId}`, {
    //         title, description, status, priority, startDate, deadline})
    // },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}
