import {appReducer, setStatusAC, setErrorAC, InitialStateType} from "../../src/app/appReducer"

let startState: InitialStateType

beforeEach(() => {
     startState = {
        status: "idle",
        error: null
     }
})

test('correct status set state', () => {
   const action = setStatusAC("loading");
   const endState = appReducer(startState, action)

   expect(endState.status).toBe("loading")
})
test('correct error set state', () => {
    const action = setErrorAC("error");
    const endState = appReducer(startState, action)
 
    expect(endState.error).toBe("error")
 })
