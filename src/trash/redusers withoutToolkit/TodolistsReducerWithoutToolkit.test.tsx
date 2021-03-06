import {TodolistBLLType, FilterValuesType, setTodolistsAC, todolistsReducer, removeTodolistAC, 
   addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, changeTodolistEntityStatusAC} from "./TodolistsReducerWithoutToolkit"
import {v1} from "uuid"
import {RequestStatusType} from "../../app/appReducer"

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistBLLType> = []

beforeEach (() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {
   const endState = todolistsReducer(startState, removeTodolistAC (todolistId1))

   expect(endState.length).toBe(1)
   expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
     let newTodolistTitle = "New Todolist"
 
    const endState = todolistsReducer(startState, addTodolistAC (
       {id: todolistId2, title: newTodolistTitle, addedDate: "", order: 0}
       ))
 
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
 })

 test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist"
  
    const endState = todolistsReducer(startState, changeTodolistTitleAC (todolistId2, newTodolistTitle ))        
 
    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
 })
 
 test('correct filter of todolist should be changed', () => { 
    let newFilter: FilterValuesType = "completed"
   
    const endState = todolistsReducer(startState, changeTodolistFilterAC ( newFilter, todolistId2 ))         
 
    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
 })

 test('correct entityStatus of todolist should be changed', () => { 
   let newEntityStatus: RequestStatusType = "loading"
  
   const endState = todolistsReducer(startState, changeTodolistEntityStatusAC( newEntityStatus, todolistId2 ))         

   expect(endState[0].entityStatus).toBe("idle")
   expect(endState[1].entityStatus).toBe(newEntityStatus)
})

 test('todolists should be set to state', () => {   
   const endState = todolistsReducer([], setTodolistsAC (startState ))         

   expect(endState.length).toBe(2) 
})