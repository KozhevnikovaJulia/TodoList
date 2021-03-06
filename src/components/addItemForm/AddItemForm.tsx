import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'

 export type AddItemPropsType = {    
    addItem:(title:string)=>void
    disabled?: boolean
}

export const AddItemForm = React.memo( ({addItem, disabled = false}:AddItemPropsType) => {
    console.log("AddItem")
    let [title, setTitle] = useState(" ")
    let [error, setError] = useState<boolean>(false)

    const addItemTitle = () => { if (title.trim() !== ""){ addItem(title); setTitle(" ") }
                                 else { setError(true) }}
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value)};
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {if(error!==false) {setError(false)};
                                                                       if (e.key === "Enter") {addItemTitle()}};
   
    return (
        <div>
            <TextField error={error} variant="outlined" id="outlined-error-helper-text" 
             label={error ? "Error" : "Input text"} helperText={error ? "Title is required!" : ""}
                value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} disabled={disabled}/>
            <Button variant="contained" size="small" onClick={addItemTitle} style={{height:"55px"}} disabled={disabled}>ADD</Button>
        </div>
                
    )
})