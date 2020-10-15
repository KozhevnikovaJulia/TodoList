import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { FilterValusType } from "./App";

type TodoListPropsType = {
    title:string
    tasks:Array<TasksProps>
    removeTask:(taskId:string)=>void
    changeFilter:(value: FilterValusType)=>void
    addTask:(title:string)=>void
    changeStatus:(taskID:string, isDone:boolean)=> void
    filter:FilterValusType
}
type TasksProps = {
    id: string,
    title: string,
    isDone:boolean
}

export function TodoList(props:TodoListPropsType) {
    let [title, setTitle] = useState(" ")
    let [error, setError] = useState<string | null>(null)

    const addTaskTitle = () => { if (title.trim() !== ""){ props.addTask(title); setTitle(" ") }
                                 else { setError("Title is required!") }}
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value)};
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { setError(null);
                                                                       if (e.key === "Enter") {addTaskTitle()}};
    const onClickAllFilter = () =>{props.changeFilter("all") };
    const onClickActiveFilter = () =>{props.changeFilter("active") };
    const onClickCompletedFilter = () =>{props.changeFilter("completed") }

    return (
        <div >
            <div>
                <h3>{props.title}</h3>
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
                        const onClickHandler = () =>{props.removeTask(task.id) };
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{props.changeStatus(task.id, e.currentTarget.checked)};
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