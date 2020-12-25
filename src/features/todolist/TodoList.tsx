import React, {useCallback, useEffect} from "react"
import { AddItemForm } from "../../components/addItemForm/AddItemForm"
import { EditableSpan } from "../../components/editableSpan/EditableSpan"
import { FilterValuesType } from "./TodolistsReducer"
import { fetchTasksTS } from "./TasksReducer"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import Button from "@material-ui/core/Button"
import {Task} from "./task/Task"
import {TaskType, TaskStatuses} from "../../api/todolist-api"
import {useDispatch} from "react-redux"

type TodoListPropsType = {
    id:string
    title:string
    tasks:Array<TaskType>
    removeTask:(taskId:string, todolistID:string)=>void
    changeFilter:(value: FilterValuesType, todolistID:string)=>void
    addTask:(title:string, todolistID:string)=>void
    changeStatus:(taskID:string, status:TaskStatuses, todolistID:string)=> void
    changeTaskTitle:(taskID:string, newTitle:string, todolistID:string)=> void
    filter:FilterValuesType
    removeTodolist: (todolistID:string)=> void
    changeTodolist: (todolistID:string, newTitle: string)=> void
}

export const TodoList = React.memo ((props:TodoListPropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTS(props.id))
    }, [])  
    
    let tasksForTodoList = props.tasks
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    const addTask = useCallback ((title:string) => {props.addTask(title, props.id)}, [props.addTask, props.id])
    const onClickAllFilter = useCallback (() =>{props.changeFilter("all", props.id)}, [props.changeFilter, props.id]);
    const onClickActiveFilter = useCallback (() =>{props.changeFilter("active", props.id)}, [props.changeFilter, props.id]);
    const onClickCompletedFilter = useCallback (() =>{props.changeFilter("completed", props.id)}, [props.changeFilter, props.id])
    const removeTodolist = ()=>{props.removeTodolist(props.id)}
    const changeTodolist =useCallback ((newTitle: string) => {props.changeTodolist(props.id, newTitle)},[props.changeTodolist, props.id])

    return (
        <div>
            <h3><EditableSpan value={props.title} onChange={changeTodolist}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h3>
           
            <AddItemForm addItem={addTask} />

            <div>
                {tasksForTodoList.map(task => <Task  removeTask = { props.removeTask}
                                                changeStatus = {props.changeStatus}
                                                changeTaskTitle = {props.changeTaskTitle}
                                                task = {task}
                                                todolistId = {props.id}
                                                key = {task.id} />                  
                )}
            </div>
            <div>
                <Button  variant={props.filter === "all" ? "contained" : "outlined"} onClick={onClickAllFilter}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"} onClick={onClickActiveFilter}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"} onClick={onClickCompletedFilter}>Completed</Button>
            </div>
        </div>
    )
})