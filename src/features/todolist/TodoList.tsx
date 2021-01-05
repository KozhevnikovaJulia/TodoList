import React, {useCallback, useEffect} from "react"
import { AddItemForm } from "../../components/addItemForm/AddItemForm"
import { EditableSpan } from "../../components/editableSpan/EditableSpan"
import { FilterValuesType, TodolistBLLType } from "./TodolistsReducer"
import { fetchTasksTS } from "./TasksReducer"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import Button from "@material-ui/core/Button"
import {Task} from "./task/Task"
import {TaskType, TaskStatuses} from "../../api/todolist-api"
import {useDispatch} from "react-redux"

type TodoListPropsType = {
    todolist: TodolistBLLType
    // id:string
    // title:string
    tasks:Array<TaskType>
    removeTask:(taskId:string, todolistID:string)=>void
    changeFilter:(value: FilterValuesType, todolistID:string)=>void
    addTask:(title:string, todolistID:string)=>void
    changeStatus:(taskID:string, status:TaskStatuses, todolistID:string)=> void
    changeTaskTitle:(taskID:string, newTitle:string, todolistID:string)=> void
    // filter:FilterValuesType
    removeTodolist: (todolistID:string)=> void
    changeTodolist: (todolistID:string, newTitle: string)=> void
    demo?:boolean
}

export const TodoList = React.memo (({demo= false,...props}:TodoListPropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo){
            return
        }
        dispatch(fetchTasksTS(props.todolist.id))
    }, [])  
    
    let tasksForTodoList = props.tasks
    if (props.todolist.filter === "active") {
        tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    const addTask = useCallback ((title:string) => {props.addTask(title, props.todolist.id)}, [props.addTask, props.todolist.id])
    const onClickAllFilter = useCallback (() =>{props.changeFilter("all", props.todolist.id)}, [props.changeFilter, props.todolist.id]);
    const onClickActiveFilter = useCallback (() =>{props.changeFilter("active", props.todolist.id)}, [props.changeFilter, props.todolist.id]);
    const onClickCompletedFilter = useCallback (() =>{props.changeFilter("completed", props.todolist.id)}, [props.changeFilter, props.todolist.id])
    const removeTodolist = ()=>{props.removeTodolist(props.todolist.id)}
    const changeTodolist =useCallback ((newTitle: string) => {props.changeTodolist(props.todolist.id, newTitle)},[props.changeTodolist, props.todolist.id])

    return (
        <div>
            <h3><EditableSpan value={props.todolist.title} onChange={changeTodolist} disabled = {props.todolist.entityStatus=== "loading"}/>
                <IconButton aria-label="delete" onClick={removeTodolist} disabled ={props.todolist.entityStatus==="loading"}>
                    <DeleteIcon />
                </IconButton>
            </h3>
           
            <AddItemForm addItem={addTask} disabled = {props.todolist.entityStatus=== "loading"}/>

            <div>
                {tasksForTodoList.map(task => <Task  removeTask = { props.removeTask}
                                                changeStatus = {props.changeStatus}
                                                changeTaskTitle = {props.changeTaskTitle}
                                                task = {task}
                                                todolistId = {props.todolist.id}
                                                key = {task.id} />                  
                )}
            </div>
            <div>
                <Button  variant={props.todolist.filter === "all" ? "contained" : "outlined"} onClick={onClickAllFilter}>All</Button>
                <Button variant={props.todolist.filter === "active" ? "contained" : "outlined"} onClick={onClickActiveFilter}>Active</Button>
                <Button variant={props.todolist.filter === "completed" ? "contained" : "outlined"} onClick={onClickCompletedFilter}>Completed</Button>
            </div>
        </div>
    )
})