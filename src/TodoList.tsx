import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { FilterValusType } from "./App";

type TodoListPropsType = {
    id:string
    title:string
    tasks:Array<TasksType>
    removeTask:(taskId:string, todolistID:string)=>void
    changeFilter:(value: FilterValusType, todolistID:string)=>void
    addTask:(title:string, todolistID:string)=>void
    changeStatus:(taskID:string, isDone:boolean, todolistID:string)=> void
    changeTaskTitle:(taskID:string, newTitle:string, todolistID:string)=> void
    filter:FilterValusType
    removeTodolist: (todolistID:string)=> void
    changeTodolist: (todolistID:string, newTitle: string)=> void
}
export type TasksType = {
    id: string,
    title: string,
    isDone:boolean
}

export function TodoList(props:TodoListPropsType) {
    const addTask = (title:string) => {props.addTask(title, props.id)}
    const onClickAllFilter = () =>{props.changeFilter("all", props.id) };
    const onClickActiveFilter = () =>{props.changeFilter("active", props.id) };
    const onClickCompletedFilter = () =>{props.changeFilter("completed", props.id) }
    const removeTodolist = ()=>{props.removeTodolist(props.id)}
    const changeTodolist = (newTitle: string) => {props.changeTodolist(props.id, newTitle)}
    return (
        <div>
            <h3><EditableSpan value={props.title} onChange={changeTodolist}/><button onClick={removeTodolist}>x</button></h3>

            <AddItemForm addItem={addTask} />

            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => { props.removeTask(task.id, props.id) };
                    const onChangeTaskTitleHandler = (newTitle:string) => {props.changeTaskTitle(task.id, newTitle, props.id)}
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeStatus(task.id, e.currentTarget.checked, props.id) };
                    return <li key={task.id}><input type="checkbox"
                        checked={task.isDone}
                        onChange={onChangeStatusHandler} />
                        <EditableSpan value={task.title} onChange={onChangeTaskTitleHandler}/><button onClick={onClickHandler}>x</button></li>
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onClickAllFilter}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onClickActiveFilter}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onClickCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}