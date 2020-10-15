import React, {useState} from "react";
import './App.css';
import {TodoList} from "./TodoList";
import { v1 } from "uuid";

export type FilterValusType = "all" | "completed" | "active";


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "Learn JS", isDone:true},
        {id: v1(), title: "Learn CSS", isDone:true},
        {id: v1(), title: "Learn React", isDone:false},
        {id: v1(), title: "Learn ReactAPI", isDone:false},
        {id: v1(), title: "Learn GraphQL", isDone:false}
    ] )

    function addTask(title:string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks];
        setTasks(newTasks)
    }
    function changeStatus (taskID:string, isDone:boolean) {
        let task = tasks.find(t=>t.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    function removeTask(id: string) {
        let filtredTasks = tasks.filter(task => task.id != id);
        setTasks(filtredTasks)
    }
    let [filter, setFilter] = useState<FilterValusType> ("all");

    let tasksForTodoList = tasks;

    if (filter === "active") {
        tasksForTodoList = tasks.filter(task => !task.isDone )
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(task => {
            return task.isDone
        } )
    }

    function changeFilter (value: FilterValusType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <TodoList title= {"What to learn"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}/>

        </div>
    )

}

export default App;
