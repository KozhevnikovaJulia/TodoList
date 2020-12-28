import React from "react"
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
import {useSelector} from "react-redux"
import {AppRootStateType} from "../app/Store"
import {RequestStatusType} from "../../src/app/appReducer"

 function App() {
    const status  = useSelector<AppRootStateType, RequestStatusType >(state => state.app.status)
    return (
        <div className="App">
          <ErrorSnackBar/>
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
                {status === "loading" && <LinearProgress />}
            </AppBar>

            <Container fixed>
            <TodolistsList/>            
            </Container>

        </div>
    )
}
export default App;

