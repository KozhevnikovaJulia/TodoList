import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import TextField from "@material-ui/core/TextField"

 export type EditableSpanPropsType = {
    value:string
    onChange:(newTitle: string)=> void
}

export const EditableSpan = React.memo ((props:EditableSpanPropsType) => {
    let [editMode, seteditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.value)

    const activateEditMode = ()=>{seteditMode(true)
                                  setTitle(props.value)}
    const disactivateEditMode = ()=>{seteditMode(false)
                                    props.onChange(title) }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value)};
    
    return ( editMode ? <TextField  id="outlined-size-small" defaultValue="Small"  variant="outlined" size="small"
                         onChange={onChangeHandler} autoFocus onBlur={disactivateEditMode} value={title}/>    
                      : <span onDoubleClick={ activateEditMode }>{props.value}</span>                     
    )
})
