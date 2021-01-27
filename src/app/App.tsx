import React, {useEffect}  from "react"
import "./App.css"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Container from "@material-ui/core/Container"
import LinearProgress from "@material-ui/core/LinearProgress"
import {TodolistsList} from "../features/todolists/TodolistsList"
import {ErrorSnackBar} from "../../src/components/errorSnackBar/ErrorSnackBur"
import {AppRootStateType} from "../app/Store"
import {RequestStatusType} from "../../src/app/appReducer"
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom"
import {Login} from "../features/login/Login"
import {useSelector, useDispatch} from "react-redux"
import {initializeAppTC} from "../app/appReducer"
import CircularProgress from "@material-ui/core/CircularProgress"
import {logoutTC} from "../features/login/authReducer"

type AppPropsType = {
    demo?: boolean
}

 function App({demo=false}: AppPropsType) {
    const status  = useSelector<AppRootStateType, RequestStatusType >(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean >(state => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {       
            dispatch(initializeAppTC())        
    }, [])  

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress style={{position:"fixed", top: "50%"}}/>
        </div>
     }
     const logoutOnClick = ()=>{
        dispatch(logoutTC())   
     }
     
     return (
         <BrowserRouter>
             <div className="App">
                 <ErrorSnackBar />
                 <AppBar position="static" style={{ backgroundColor: "rgb(185, 180, 180)" }}>
                     <Toolbar className={"toolBur"}>
                         <div className={"iconBlock"}>
                             <IconButton edge="start" color="inherit" aria-label="menu">
                                 <MenuIcon />
                             </IconButton>
                             <Typography variant="h6" style={{marginTop:"8px"}}>
                                 TODOLIST
                             </Typography>
                         </div>
                         <Button color="inherit" type={'submit'} variant={'contained'} onClick={logoutOnClick}>Logout</Button>
                     </Toolbar>
                     {status === "loading" && <LinearProgress />}
                 </AppBar>

                <Container fixed>
                    <Switch>
                    <Route exact path={"/"} render={() => <TodolistsList demo={demo} />} />
                    <Route path={"/login"} render={() => <Login />} />
                    <Route path={ "/404" } render={ () => <h1>404: PAGE NOT FOUND</h1> }/>
                    <Redirect from= {"*"} to= {"/404"}> </Redirect>
                    </Switch>
                </Container>

        </div>
        </BrowserRouter>
    )
}
export default App;

