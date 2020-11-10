import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { FilterValuesType } from "./App";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';

type TodoListPropsType = {
    id:string
    title:string
    tasks:Array<TasksType>
    removeTask:(taskId:string, todolistID:string)=>void
    changeFilter:(value: FilterValuesType, todolistID:string)=>void
    addTask:(title:string, todolistID:string)=>void
    changeStatus:(taskID:string, isDone:boolean, todolistID:string)=> void
    changeTaskTitle:(taskID:string, newTitle:string, todolistID:string)=> void
    filter:FilterValuesType
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
            <h3><EditableSpan value={props.title} onChange={changeTodolist}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            
            {/* <button onClick={removeTodolist}>x</button> */}

            <AddItemForm addItem={addTask} />

            <div>
                {props.tasks.map(task => {
                    const onClickHandler = () => { props.removeTask(task.id, props.id) };
                    const onChangeTaskTitleHandler = (newTitle:string) => {props.changeTaskTitle(task.id, newTitle, props.id)}
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeStatus(task.id, e.currentTarget.checked, props.id) };
                    return <div key={task.id}>
                        <Checkbox
                            checked={task.isDone}
                            onChange={onChangeStatusHandler}
                            defaultChecked
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }} />

                        <EditableSpan value={task.title} onChange={onChangeTaskTitleHandler} />
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton></div>
                })}
            </div>
            <div>
                <Button  variant={props.filter === "all" ? "contained" : "outlined"} onClick={onClickAllFilter}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"} onClick={onClickActiveFilter}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"} onClick={onClickCompletedFilter}>Completed</Button>
            </div>
        </div>
    )
}