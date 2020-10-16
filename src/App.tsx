import React, {useState} from "react";
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import { v1 } from "uuid";

export type FilterValusType = "all" | "completed" | "active";

type TodolistType = {
    id: string
    title: string
    filter:FilterValusType
}
type TaskobjType = {
    [key: string]: Array<TasksType>
}
function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState <TodolistType[]>([
        {id: todolistId1, title:"What to learn", filter:"all"},
        {id: todolistId2, title:"What to buy", filter:"all"}
    ]  )
    let [taskobjs, setTaskobjs] = useState<TaskobjType >({
        [todolistId1]: [
            {id: v1(), title: "Learn JS", isDone:true},
            {id: v1(), title: "Learn CSS", isDone:true},
            {id: v1(), title: "Learn React", isDone:false},
            {id: v1(), title: "Learn ReactAPI", isDone:false},
            {id: v1(), title: "Learn GraphQL", isDone:false}],
        [todolistId2]: [
            {id: v1(), title: "Buy bread", isDone:true},
            {id: v1(), title: "Buy milk", isDone:true}
        ]}
       )

    function addTask(title:string, todolistID:string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = taskobjs[todolistID]
        let newTasks = [task, ...tasks];
        taskobjs[todolistID]= newTasks
        setTaskobjs({...taskobjs})
    }
    function changeStatus (taskID:string, isDone:boolean, todolistID:string) {
        let tasks = taskobjs[todolistID]
        let task = tasks.find(t=>t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTaskobjs({...taskobjs})
        }
         }

    function removeTask(id: string, todolistID: string) {
        let tasks = taskobjs[todolistID]
        let filtredTasks = tasks.filter(task => task.id != id);
        taskobjs[todolistID] = filtredTasks
        setTaskobjs ({...taskobjs})
    }

    function changeFilter (value: FilterValusType, TodolistID:string) {
        let todolist = todolists.find(tl=> tl.id === TodolistID)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }
    function removeTodolist (todolistID: string) {
        let filtredTodolist = todolists.filter(tl=>tl.id != todolistID);
        setTodolists(filtredTodolist);
        delete taskobjs[todolistID];
        setTaskobjs({...taskobjs})
    }

    return (
        <div className="App">
            {todolists.map(tl =>  {
                let allTodolistTasks= taskobjs[tl.id]
                let tasksForTodoList = allTodolistTasks;

                if (tl.filter === "active") {
                    tasksForTodoList = allTodolistTasks.filter(task => !task.isDone )
                }
                if (tl.filter === "completed") {
                    tasksForTodoList = allTodolistTasks.filter(task => {
                        return task.isDone
                    } )
                }
            return <TodoList title= {tl.title}
                                            id={tl.id}
                                            key={tl.id}
                                           tasks={tasksForTodoList}
                                           removeTask={removeTask}
                                           changeFilter={changeFilter}
                                           addTask={addTask}
                                           changeStatus={changeStatus}
                                           filter={tl.filter}
                                           removeTodolist={removeTodolist}/>}) }


        </div>
    )

}

export default App;
