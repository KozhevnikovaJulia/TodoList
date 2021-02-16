import {tasksReducer, TaskobjType} from "./TasksReducer"
import {todolistsReducer, TodolistBLLType, addTodolistAC} from "./TodolistsReducer"

test('ids should be equals', () => {
    const startTasksState: TaskobjType= {};
    const startTodolistsState: Array<TodolistBLLType> = [];
 
    const action = addTodolistAC({todolist:{id: "todolistId1", title: "newTodolistTitle", addedDate: "", order: 0}});
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
 })


 export type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
 }