import React, {useReducer} from "react";
import './App.css';
import {TodoList} from "./TodoList";
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
import PaperBackground from "./images/3.jpg";
import {FilterValuesType, todolistsReducer, addTodolistAC, changeTodolistFilterAC, removeTodolistAC, changeTodolistTitleAC  } from "./state/TodolistsReducer"
import { tasksReducer, addTaskAC,  changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/TasksReducer"
import {TaskStatuses, TaskPriorities} from "../src/api/todolist-api";

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, dispatchTodolists] = useReducer (todolistsReducer, [
        {id: todolistId1, title:"What to learn", filter:"all", addedDate: "", order: 0},
        {id: todolistId2, title:"What to buy", filter:"all", addedDate: "", order: 0}
    ]  )
    let [taskobjs, dispatchTaskobjs] = useReducer (tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "Learn JS",  status: TaskStatuses.Completed, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: todolistId1,
            order: 0, addedDate: ""},
            {id: v1(), title: "Learn CSS",  status: TaskStatuses.Completed, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: todolistId1,
            order: 0, addedDate: ""},
            {id: v1(), title: "Learn React",  status: TaskStatuses.New, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: todolistId1,
            order: 0, addedDate: ""},
            {id: v1(), title: "Learn ReactAPI",  status: TaskStatuses.New, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: todolistId1,
            order: 0, addedDate: ""},
            {id: v1(), title: "Learn GraphQL",  status: TaskStatuses.New, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: todolistId1,
            order: 0, addedDate: ""}],
        [todolistId2]: [
            {id: v1(), title: "Buy bread",  status: TaskStatuses.Completed, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: todolistId2,
            order: 0, addedDate: ""},
            {id: v1(), title: "Buy milk",  status: TaskStatuses.Completed, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: todolistId2,
            order: 0, addedDate: ""}
        ]}
       )

    function addTask(title: string, todolistID: string) {
        let action = addTaskAC ({id: v1(), title: title, status: TaskStatuses.Completed, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: todolistID,
        order: 0, addedDate: ""
    })
        dispatchTaskobjs(action)
    }
    function addTodolist(title: string) {
        let action = addTodolistAC({
            id: v1(), title: title, addedDate: "", order: 0
        })
        dispatchTodolists(action)
        dispatchTaskobjs(action)
    }
    function changeStatus(taskID: string, status: TaskStatuses, todolistID: string) {
        let action = changeTaskStatusAC(taskID, status, todolistID)
        dispatchTaskobjs(action)
    }
    function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
        let action = changeTaskTitleAC (taskID, newTitle, todolistID)
        dispatchTaskobjs(action)
    }

    function removeTask(id: string, todolistID: string) {
        let action = removeTaskAC (id, todolistID)
        dispatchTaskobjs(action)
    }

    function changeFilter (value: FilterValuesType, TodolistID:string) {
        let action = changeTodolistFilterAC (value, TodolistID)
        dispatchTodolists(action)
        }
    
    function removeTodolist (todolistID: string) {        
        let action = removeTodolistAC  (todolistID)
        dispatchTodolists(action)
    }
    function changeTodolist (todolistID: string, newTitle: string) {
        let action = changeTodolistTitleAC (todolistID, newTitle)
        dispatchTodolists(action)        
    }

    return (
        <div className="App">
            <AppBar position="static" style={{backgroundColor:  "rgb(185, 180, 180)" }}>
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
                        tasksForTodoList = allTodolistTasks.filter(task => task.status === TaskStatuses.New)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = allTodolistTasks.filter(task => {
                            return task.status === TaskStatuses.Completed
                        })
                    }
                    return <Grid item >
                        <Paper elevation={3} style={{padding: "15px",
                                                     backgroundImage: `url(${PaperBackground})`,                                                    
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
