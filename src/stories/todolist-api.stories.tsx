import React, {useEffect, useState} from 'react';
import {TodolistAPI} from "../api/todolist-api"

export default {
   title: 'Todolist/API'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {   
       
    TodolistAPI.getTodolists()
           .then((response) => {
               setState(response.data)
           })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
    TodolistAPI.createTodolist("NNN")
    .then((response) => {
        setState(response.data)
    })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId ="6c0ddda9-b4b5-49d7-9ee8-d10fc117283b"
        TodolistAPI.deleteTodolist(todolistId)
        .then((response) => {
            setState(response.data)
        })    

    }, [])
 
    return <div> {JSON.stringify(state)}</div>
 }
 export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId ="4a61b3cf-7944-4230-a5f1-caa91d9638ff"
        TodolistAPI.updateTodolist(todolistId, "vvv")
        .then((response) => {
            setState(response.data)
        })    
   }, [])

   return <div> {JSON.stringify(state)}</div>
}


