import React, {useCallback, useEffect} from "react";
import './App.css';
import {TodoList} from "./TodoList";
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
import {setTodolistsAC, addTodolistAC, changeTodolistFilterAC, removeTodolistAC, changeTodolistTitleAC  } from "./state/TodolistsReducer"
import {addTaskAC,  changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/TasksReducer"
import {useSelector, useDispatch} from "react-redux";
import { AppRootStateType } from "./store/Store";
import { TodolistAPI, TaskType, TaskStatuses, TaskPriorities } from "./api/todolist-api";
import {TodolistBLLType, FilterValuesType} from "../src/state/TodolistsReducer";

type TaskobjType = {
    [key: string]: Array<TaskType>
}
 function App() {
    const todolists = useSelector<AppRootStateType, Array<TodolistBLLType>>(state => state.todolists)
    const tasks  = useSelector<AppRootStateType, TaskobjType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        TodolistAPI.getTodolists()
        .then((res: any) => {
            const action =  setTodolistsAC(res.data)
            dispatch(action)})    
    }, [])  
 
    const addTask = useCallback ((title: string, todolistID: string) => {
        let action = addTaskAC(title, todolistID)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback ((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)      
    }, [dispatch])
    const changeStatus = useCallback ((taskID: string, status: TaskStatuses, todolistID: string) => {
        let action = changeTaskStatusAC(taskID, status, todolistID)
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback ((taskID: string, newTitle: string, todolistID: string) => {
        let action = changeTaskTitleAC (taskID, newTitle, todolistID)
        dispatch(action)
    }, [dispatch])
    const removeTask = useCallback ((id: string, todolistID: string) =>{
        let action = removeTaskAC (id, todolistID)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback ((value: FilterValuesType, TodolistID:string) => {
        let action = changeTodolistFilterAC (value, TodolistID)
        dispatch(action)
        }, [dispatch])    
    const removeTodolist = useCallback((todolistID: string) => {        
        let action = removeTodolistAC  (todolistID)
        dispatch(action)
    }, [dispatch])
    const changeTodolist = useCallback ((todolistID: string, newTitle: string) => {
        let action = changeTodolistTitleAC (todolistID, newTitle)
        dispatch(action)        
    }, [dispatch])

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
                    let allTodolistTasks = tasks[tl.id]
                    let tasksForTodoList = allTodolistTasks;

                    return <Grid item >
                        <Paper elevation={3} style={{padding: "15px",
                                                     backgroundImage: `url(${PaperBackground})`,                                                   
                                                     backgroundSize: "100% auto"}}
                                                     key={tl.id}>
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
