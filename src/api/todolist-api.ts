import Axios from "axios";

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
 }
 type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
 } 

 type TaskType= {
description: string
title: string
status: number
priority: number
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
     headers: { "API-KEY": "36372fe3-6173-4561-ab55-6cabdb1bf433"}
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
    getTasks  (todolistId: string, pageSize: number, page: number) {
        return instance.get <GetTaskResponce>(`todo-lists/${todolistId}/tasks?count=${pageSize}&page=${page}`)
    },
    createTask (todolistId: string, title: string) {
        return instance.post <ResponseType<{item: TaskType}> >(`todo-lists/${todolistId}/tasks` , {title})
    },
    deleteTask (todolistId: string, taskId: string) {
        return instance.delete <ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask (todolistId: string, taskId: string, title: string, description: string,
                 status: number, priority: number, startDate: string, deadline: string) {
        return instance.put <ResponseType<{}>> (`todo-lists/${todolistId}/tasks/${taskId}`, {
            title, description, status, priority, startDate, deadline})
    },
}
