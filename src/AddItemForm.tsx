import React, {ChangeEvent, KeyboardEvent, useState} from "react";

 type AddItemPropsType = {
    addItem:(title:string)=>void
}

export function AddItemForm (props:AddItemPropsType) {
    let [title, setTitle] = useState(" ")
    let [error, setError] = useState<string | null>(null)

    const addItemTitle = () => { if (title.trim() !== ""){ props.addItem(title); setTitle(" ") }
                                 else { setError("Title is required!") }}
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value)};
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { setError(null);
                                                                       if (e.key === "Enter") {addItemTitle()}};
   
    return (
        
                <div>
                    <input className={error? "error": ""}
                        value={title}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}/>
                    <button onClick={addItemTitle}>+</button>
                    {error && <div className="error-message">{error}</div>}
                </div>
                
    )
}