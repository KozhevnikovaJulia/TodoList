
let INCREMENT_AGE = "INCREMENT-AGE"
let INCREMENT_CHILDRENCOUNT = "INCREMENT-CHILDRENCOUNT"
let CHANGE_NAME = "CHANGE-NAME"

type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

export let userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case INCREMENT_AGE:
            let newState = { ...state }
            newState.age = state.age + 1
            return newState;
        case INCREMENT_CHILDRENCOUNT:
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            };
            case CHANGE_NAME:
                   return {
                    ...state,
                    name: action.newName
                }
    
        default:
            throw new Error("I do not andastand this action.type!")
    }
}
