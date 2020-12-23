import React, {useEffect, useState} from 'react';
import {TaskAPI} from "../api/todolist-api"

export default {
   title: 'Todolist/API'
}

export const GetTask = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {   
    const todolistId ="4a61b3cf-7944-4230-a5f1-caa91d9638ff"    
    TaskAPI.getTasks(todolistId)
           .then((response) => {
               setState(response.data)
           })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
   const [state, setState] = useState<any>(null)
   const [todolistId, setTodolistId] = useState<string>("")
   const [taskTitle, setTaskTitle] = useState<string>("")

   const createTaskCallBack =()=> {
    TaskAPI.createTask(todolistId, taskTitle)
    .then((response) => {
        setState(response.data)
    })
   }

   return <div> {JSON.stringify(state)}
   <div>
       <input type="text" value={todolistId} placeholder="todolistId" onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
       <input type="text" value={taskTitle} placeholder="newTaskTitle" onChange={(e)=>{setTaskTitle(e.currentTarget.value)}}/>
       <button onClick={createTaskCallBack}>Create Task</button>
   </div>
   
   </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
   const [taskId, setTaskId] = useState<string>("")

    const deleteTaskCallBack = ()=> {
        TaskAPI.deleteTask(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })  
    }
 
    return <div> {JSON.stringify(state)}
     <div>
       <input type="text" value={todolistId} placeholder="todolistId" onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
       <input type="text" value={taskId} placeholder="taskId" onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
       <button onClick={deleteTaskCallBack}>Delete Task</button>
   </div>
    </div>
 }
 export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")

    const updateTaskCallBack = ()=> {
        TaskAPI.updateTask(todolistId, taskId, {title, description,  status, priority, startDate, deadline})
        .then((response) => {
            setState(response.data)
        })    
    }

   return <div> {JSON.stringify(state)}
    <div>
           <input type="text" value={todolistId} placeholder="todolistId" onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
           <input type="text" value={taskId} placeholder="taskId" onChange={(e) => { setTaskId(e.currentTarget.value) }} />
           <input type="text" value={title} placeholder="title" onChange={(e) => { setTitle(e.currentTarget.value) }} />
           <input type="text" value={description} placeholder="description" onChange={(e) => { setDescription(e.currentTarget.value) }} />
           <input type="text" value={status} placeholder="status" onChange={(e) => { setStatus (+e.currentTarget.value) }} />
           <input type="text" value={priority} placeholder="priority" onChange={(e) => { setPriority(+e.currentTarget.value) }} />
           <input type="text" value={startDate} placeholder="startDate" onChange={(e) => { setStartDate(e.currentTarget.value) }} />
           <input type="text" value={deadline} placeholder="deadline" onChange={(e) => { setDeadline(e.currentTarget.value) }} />
           <button onClick={updateTaskCallBack}>Update Task</button>
       </div>
   </div>
}


