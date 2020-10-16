import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { FilterValusType } from "./App";

type TodoListPropsType = {
    id:string
    title:string
    tasks:Array<TasksType>
    removeTask:(taskId:string, todolistID:string)=>void
    changeFilter:(value: FilterValusType, todolistID:string)=>void
    addTask:(title:string, todolistID:string)=>void
    changeStatus:(taskID:string, isDone:boolean, todolistID:string)=> void
    filter:FilterValusType
    removeTodolist: (todolistID:string)=> void
}
export type TasksType = {
    id: string,
    title: string,
    isDone:boolean
}

export function TodoList(props:TodoListPropsType) {
    let [title, setTitle] = useState(" ")
    let [error, setError] = useState<string | null>(null)

    const addTaskTitle = () => { if (title.trim() !== ""){ props.addTask(title, props.id); setTitle(" ") }
                                 else { setError("Title is required!") }}
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value)};
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { setError(null);
                                                                       if (e.key === "Enter") {addTaskTitle()}};
    const onClickAllFilter = () =>{props.changeFilter("all", props.id) };
    const onClickActiveFilter = () =>{props.changeFilter("active", props.id) };
    const onClickCompletedFilter = () =>{props.changeFilter("completed", props.id) }
    const removeTodolist = ()=>{props.removeTodolist(props.id)}
    return (
        <div >
            <div>
                <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
                <div>
                    <input className={error? "error": ""}
                        value={title}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}/>
                    <button onClick={addTaskTitle}>+</button>
                    {error && <div className="error-message">{error}</div>}
                </div>
                <ul>
                    {props.tasks.map(task => {
                        const onClickHandler = () =>{props.removeTask(task.id, props.id) };
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{props.changeStatus(task.id, e.currentTarget.checked, props.id)};
                        return <li key={task.id}><input type="checkbox"
                                                        checked={task.isDone}
                                                        onChange={onChangeHandler}/>
                        <span>{task.title}</span><button onClick={onClickHandler}>x</button></li>})}
                </ul>
                <div>
                    <button className={props.filter === "all"? "active-filter" : ""}onClick={onClickAllFilter}>All</button>
                    <button className={props.filter === "active"? "active-filter" : ""}onClick={onClickActiveFilter}>Active</button>
                    <button className={props.filter === "completed"? "active-filter" : ""}onClick={onClickCompletedFilter}>Completed</button>
                </div>
            </div>
        </div>
    )
}