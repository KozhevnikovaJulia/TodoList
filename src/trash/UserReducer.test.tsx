import {userReducer} from "./UserReducer"

test("userRecuser should increment only age", () => {
const startState = {age: 20, childrenCount: 2, name: "Julia" }
const endState = userReducer (startState, {type: "INCREMENT-AGE"})
expect (endState.age).toBe (21)
expect (endState.childrenCount).toBe (2)
})

test("userRecuser should increment only childrenCount", () => {
    const startState = { age: 20, childrenCount: 2, name: "Julia" }
    const endState = userReducer(startState, { type: "INCREMENT-CHILDRENCOUNT" })
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test("userRecuser should change userName", () => {
    const newName = "Serg"
    const startState = { age: 20, childrenCount: 2, name: "Julia" }
    const endState = userReducer(startState, { type: "CHANGE-NAME", newName: newName })
    expect(endState.name).toBe("Serg")
 
})