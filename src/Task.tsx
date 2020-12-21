import React, {ChangeEvent, useCallback} from "react";
import { EditableSpan } from "./EditableSpan";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import {TaskType, TaskStatuses} from "../src/api/todolist-api";

export type TaskPropsType = {
    removeTask:(taskId:string, todolistID:string)=>void
    changeStatus:(taskID:string, status:TaskStatuses, todolistID:string)=> void
    changeTaskTitle:(taskID:string, newTitle:string, todolistID:string)=> void
    task: TaskType 
    todolistId: string
}

export const Task = React.memo ((props:TaskPropsType) => { 
    const onClickHandler = useCallback (() => { props.removeTask(props.task.id, props.todolistId) }, [props.removeTask,props.task.id, props.todolistId ])
    const onChangeTaskTitleHandler = useCallback ((newTitle: string) => { props.changeTaskTitle(props.task.id, newTitle, props.todolistId) }, [props.changeTaskTitle, props.task.id, props.todolistId])
   
    const onChangeStatusHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => { 
        let newStatusValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId) }, [props.changeStatus, props.todolistId, props.task.id ]);
    return <div key={props.task.id}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            onChange={onChangeStatusHandler}
            defaultChecked
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }} />

        <EditableSpan value={props.task.title} onChange={onChangeTaskTitleHandler} />
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <DeleteIcon />
        </IconButton></div>
})