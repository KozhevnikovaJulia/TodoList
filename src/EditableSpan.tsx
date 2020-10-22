import React, {ChangeEvent, KeyboardEvent, useState} from "react";

 type EditableSpanPropsType = {
    value:string
    onChange:(newTitle: string)=> void
}

export function EditableSpan (props:EditableSpanPropsType) {
    let [editMode, seteditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.value)

    const activateEditMode = ()=>{seteditMode(true)
                                  setTitle(props.value)}
    const disactivateEditMode = ()=>{seteditMode(false)
                                    props.onChange(title) }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value)};
    
    return ( editMode ? <input onChange={onChangeHandler} autoFocus onBlur={disactivateEditMode} value={title}/>
                      : <span onDoubleClick={ activateEditMode }>{props.value}</span> 
                    
    )
}
