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
import {changeTodolistTitleTC, addTodolistTC,removeTodolistTC, fetchTodolistsTC , TodolistBLLType, FilterValuesType, addTodolistAC, changeTodolistFilterAC, removeTodolistAC, changeTodolistTitleAC  } from "./state/TodolistsReducer"
import {changeTaskTitleTC, changeTaskStatusTC, addTaskTC, removeTaskTC, addTaskAC,  changeTaskStatusAC, changeTaskTitleAC} from "./state/TasksReducer"
import {useSelector, useDispatch} from "react-redux";
import { AppRootStateType } from "./store/Store";
import {TaskType, TaskStatuses} from "./api/todolist-api";

type TaskobjType = {
    [key: string]: Array<TaskType>
}
 function App() {
    const todolists = useSelector<AppRootStateType, Array<TodolistBLLType>>(state => state.todolists)
    const tasks  = useSelector<AppRootStateType, TaskobjType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])  
 
    const addTask = useCallback ((todolistID: string, title: string) => {
        const thunk = addTaskTC(todolistID, title)
        dispatch(thunk)
    }, [])
    const addTodolist = useCallback ((title: string) => {
        const thunk = addTodolistTC (title)
        dispatch(thunk)    
    }, [dispatch])
    const changeStatus = useCallback ((taskID: string, status: TaskStatuses, todolistID: string) => {
        const thunk = changeTaskStatusTC (taskID, status, todolistID)
        dispatch(thunk)         
    }, [])
    const changeTaskTitle = useCallback ((taskID: string, newTitle: string, todolistID: string) => {
        const thunk = changeTaskTitleTC (taskID, newTitle, todolistID)
        dispatch(thunk) 
    }, [])
    const removeTask = useCallback ((id: string, todolistID: string) =>{
        const thunk = removeTaskTC (id, todolistID)
        dispatch(thunk)
    }, [])
    const changeFilter = useCallback ((value: FilterValuesType, TodolistID:string) => {
        let action = changeTodolistFilterAC (value, TodolistID)
        dispatch(action)
        }, [dispatch])    
    const removeTodolist = useCallback((todolistID: string) => { 
        const thunk = removeTodolistTC (todolistID)
        dispatch(thunk) 
    }, [])
    const changeTodolist = useCallback ((todolistID: string, newTitle: string) => {        
        const thunk = changeTodolistTitleTC (todolistID, newTitle)
        dispatch(thunk)     
    }, [])

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
