import React, {useState} from "react";
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string
    filter:FilterValuesType
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
    function addTodolist(title:string) {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter:"all"}
        setTodolists([newTodolist,...todolists])
        setTaskobjs ({ [newTodolistId ]: [ ], ...taskobjs})
    }
    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        let tasks = taskobjs[todolistID]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTaskobjs({ ...taskobjs })
        }
    }
    function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
        let tasks = taskobjs[todolistID]
        let task = tasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTaskobjs({ ...taskobjs })
        }
    }

    function removeTask(id: string, todolistID: string) {
        let tasks = taskobjs[todolistID]
        let filtredTasks = tasks.filter(task => task.id != id);
        taskobjs[todolistID] = filtredTasks
        setTaskobjs ({...taskobjs})
    }

    function changeFilter (value: FilterValuesType, TodolistID:string) {
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
    function changeTodolist (todolistID: string, newTitle: string) {
        let todolist = todolists.find(tl=> tl.id === todolistID)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static" style={{backgroundColor:  "rgb(185, 180, 180)" }}>
                     {/* "rgb(150, 144, 144)" */}
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
            <Grid container style={{padding: "25px"}}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={3}>
                {todolists.map(tl => {
                    let allTodolistTasks = taskobjs[tl.id]
                    let tasksForTodoList = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodoList = allTodolistTasks.filter(task => !task.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = allTodolistTasks.filter(task => {
                            return task.isDone
                        })
                    }
                    return <Grid item >
                        <Paper elevation={3} style={{padding: "15px",
                                                     backgroundImage: "url(https://images.pexels.com/photos/5725894/pexels-photo-5725894.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
                                                     backgroundSize: "100% auto"}}>
                            <TodoList title={tl.title}
                                id={tl.id}
                                key={tl.id}
                                tasks={tasksForTodoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTodolist={changeTodolist} />
                        </Paper>
                    </Grid>
                })}
            </Grid>
            </Container>

        </div>
    )

}

export default App;
