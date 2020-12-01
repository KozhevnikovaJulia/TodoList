import React, {ChangeEvent, useCallback, KeyboardEvent, useState} from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { FilterValuesType } from "./App";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import {TasksType} from "./TodoList";

export type TaskPropsType = {
    removeTask:(taskId:string, todolistID:string)=>void
    changeStatus:(taskID:string, isDone:boolean, todolistID:string)=> void
    changeTaskTitle:(taskID:string, newTitle:string, todolistID:string)=> void
    task: TasksType 
    todolistId: string
}

export const Task = React.memo ((props:TaskPropsType) => { 
    const onClickHandler = useCallback (() => { props.removeTask(props.task.id, props.todolistId) }, [props.removeTask,props.task.id, props.todolistId ])
    const onChangeTaskTitleHandler = useCallback ((newTitle: string) => { props.changeTaskTitle(props.task.id, newTitle, props.todolistId) }, [props.changeTaskTitle, props.task.id, props.todolistId])
    const onChangeStatusHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => { props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId) }, [props.changeStatus, props.todolistId, props.task.id ]);
    return <div key={props.task.id}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeStatusHandler}
            defaultChecked
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }} />

        <EditableSpan value={props.task.title} onChange={onChangeTaskTitleHandler} />
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon />
        </IconButton></div>
})