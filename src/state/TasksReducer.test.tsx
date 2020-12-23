import { setTasksAC, tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './TasksReducer';
import {setTodolistsAC, addTodolistAC, removeTodolistAC } from './TodolistsReducer';
import {TaskType, TaskStatuses, TaskPriorities} from "../../src/api/todolist-api";

type TaskobjType = {
    [key: string]: Array<TaskType>
}
let startState: TaskobjType

beforeEach(() => {
     startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
            order: 0, addedDate: "" },
            { id: "2", title: "JS", status: TaskStatuses.Completed, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
            order: 0, addedDate: "" },
            { id: "3", title: "React", status: TaskStatuses.New, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
            order: 0, addedDate: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
            order: 0, addedDate: ""},
            { id: "2", title: "milk", status: TaskStatuses.Completed, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
            order: 0, addedDate: "" },
            { id: "3", title: "tea", status: TaskStatuses.New, description: "",
            priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
            order: 0, addedDate: ""}
        ]
     };
})


test('correct task should be deleted from correct array', () => {
   const action = removeTaskAC("2", "todolistId2");
   const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
   "todolistId1": [
       { id: "1", title: "CSS", status: TaskStatuses.New, description: "",
       priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
       order: 0, addedDate: ""},
       { id: "2", title: "JS", status: TaskStatuses.Completed, description: "",
       priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
       order: 0, addedDate: "" },
       { id: "3", title: "React", status: TaskStatuses.New, description: "",
       priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
       order: 0, addedDate: ""}
   ],
   "todolistId2": [
       { id: "1", title: "bread", status: TaskStatuses.New, description: "",
       priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
       order: 0, addedDate: "" },
       { id: "3", title: "tea", status: TaskStatuses.New, description: "",
       priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
       order: 0, addedDate: "" }
   ]
});

});

test('correct task should be added to correct array', () => {
    const action = addTaskAC({id: "1", title: "juce", status: TaskStatuses.New, description: "",
    priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
    order: 0, addedDate: ""})
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
 })
 
 test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
  });
 
  test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC ("2", "water", "todolistId2" );
   
    const endState = tasksReducer(startState, action)
 
   expect(endState).toEqual({
    "todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
        order: 0, addedDate: "" },
        { id: "2", title: "JS", status: TaskStatuses.Completed, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
        order: 0, addedDate: "" },
        { id: "3", title: "React", status: TaskStatuses.New, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId1",
        order: 0, addedDate: "" }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
        order: 0, addedDate: "" },
        { id: "2", title: "water", status: TaskStatuses.Completed, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
        order: 0, addedDate: "" },
        { id: "3", title: "tea", status: TaskStatuses.New, description: "",
        priority: TaskPriorities.Hi, startDate: "", deadline: "", todoListId: "todolistId2",
        order: 0, addedDate: "" }
    ]
 });
 
 });

 test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("new todolist"); 
 
    const endState = tasksReducer(startState, action)
 
 
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
 
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
 });
 
 test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");
 
    const endState = tasksReducer(startState, action)
 
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
 });

 test('empty array should be after we set todolists', () => { 
    const action = setTodolistsAC([
        {id: "1", title: "What to learn", filter: "all",  addedDate: "", order: 0},
        {id: "2", title: "What to buy", filter: "all",  addedDate: "", order: 0}
    ]);
 
    const endTasksState = tasksReducer({}, action)
 
    const keys = Object.keys(endTasksState);
 
    expect(keys.length).toBe(2);
    expect(endTasksState["1"]).toStrictEqual([]); 
 });
 
 test('tasks should be set to state', () => { 
     const action = setTasksAC (startState["todilistId1"], "todolistId1")
    
    const endTasksState = tasksReducer({
              "todolistId1": [],
              "todolistId2": []
    }, action)
  
    expect(endTasksState["todolistId2"].length).toBe(0); 
    expect(endTasksState["todolistId1"].length).toBe(3); 
 });
