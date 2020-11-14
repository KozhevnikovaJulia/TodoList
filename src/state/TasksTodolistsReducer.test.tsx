import {tasksReducer, TaskobjType} from './TasksReducer';
import {todolistsReducer, TodolistType, addTodolistAC} from "./TodolistsReducer"

test('ids should be equals', () => {
    const startTasksState: TaskobjType= {};
    const startTodolistsState: Array<TodolistType> = [];
 
    const action = addTodolistAC("new todolist");
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
 });
 