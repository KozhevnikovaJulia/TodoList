import {tasksReducer, TaskobjType} from "./TasksReducer"
import {todolistsReducer, TodolistBLLType, addTodolistAC} from "./TodolistsReducer"

test('ids should be equals', () => {
    const startTasksState: TaskobjType= {};
    const startTodolistsState: Array<TodolistBLLType> = [];
 
    const action = addTodolistAC({id: "todolistId1", title: "newTodolistTitle", addedDate: "", order: 0});
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
 })
