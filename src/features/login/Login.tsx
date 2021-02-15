import React from "react"
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid } from "@material-ui/core"
import { useFormik } from "formik"
import {useDispatch, useSelector} from "react-redux"
import { loginTC } from "./authReducer"
import {AppRootStateType} from "../../app/Store"
import { Redirect } from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
 }
 

export const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
  
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = "Required"
            }
            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
            formik.resetForm()
            const thunk = loginTC(values)
            dispatch(thunk)
        },
    })

    if (isLoggedIn) {
        return <Redirect  to = {"/"}/>
      }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                     <a href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}>here
                     </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: Kozhevnikova1501@yandex.ru</p>
                        <p>Password: SocialNetworkTS</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? <div style={{color:"red"}}> {formik.errors.email} </div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? <div style={{color:"red"}}> {formik.errors.password} </div> : null}
                        <FormControlLabel
                            name="rememeberMe"
                            checked={formik.values.rememberMe}
                            onChange={formik.handleChange}
                            label={'Remember me'}
                            control={<Checkbox />}
                        />
                   <Button type={'submit'} variant={'contained'}>Login</Button>
               </FormGroup>
           </FormControl>
           </form>           
       </Grid>
   </Grid>
}
