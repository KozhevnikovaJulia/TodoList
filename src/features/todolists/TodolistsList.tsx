import React, {useCallback, useEffect} from "react"
import {TodoList} from "../todolist/TodoList"
import {AddItemForm} from "../../components/addItemForm/AddItemForm"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import PaperBackground from "../../images/3.jpg"
import {changeTodolistTitleTC, addTodolistTC,removeTodolistTC, fetchTodolistsTC , TodolistBLLType, FilterValuesType, TaskobjType, changeTodolistFilterAC} from "../../features/todolist/TodolistsReducer"
import {updateTaskTC, addTaskTC, removeTaskTC} from "../../features/todolist/TasksReducer"
import {useSelector, useDispatch} from "react-redux"
import {AppRootStateType} from "../../app/Store"
import {TaskStatuses} from "../../api/todolist-api"

type TodolistsListPropsType = {
    demo?: boolean
}

export function TodolistsList({demo = false}: TodolistsListPropsType) {
    const todolists = useSelector<AppRootStateType, Array<TodolistBLLType>>(state => state.todolists)
    const tasks  = useSelector<AppRootStateType, TaskobjType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo){
            return
        }
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
        const thunk = updateTaskTC (taskID, {status}, todolistID)
        dispatch(thunk)         
    }, [])
    const changeTaskTitle = useCallback ((taskID: string, newTitle: string, todolistID: string) => {
        const thunk = updateTaskTC (taskID, {title: newTitle}, todolistID)
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
    return  <> 
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
                            <TodoList 
                            todolist={tl}
                            // title={tl.title}
                            //     id={tl.id}
                                key={tl.id}
                                tasks={tasksForTodoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                // filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTodolist={changeTodolist}
                                demo={demo} />
                        </Paper>
                    </Grid>
                })}
            </Grid>
         </>
}
