import {appReducer, setStatusAC, setErrorAC, InitialStateType} from "../../src/app/appReducer"

let startState: InitialStateType

beforeEach(() => {
     startState = {
      isInitialized:false,
        status: "idle",
        error: null
     }
})

test('correct status set state', () => {
   const action = setStatusAC({status:"loading"});
   const endState = appReducer(startState, action)

   expect(endState.status).toBe("loading")
})
test('correct error set state', () => {
    const action = setErrorAC({error:"error"});
    const endState = appReducer(startState, action)
 
    expect(endState.error).toBe("error")
 })
