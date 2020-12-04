import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Task, TaskPropsType } from './Task';
import {action} from "@storybook/addon-actions"


export default {
  title: 'Todolist/Task component',
  component: Task,
} as Meta;
const removeTaskCallBack = action("Remove button inside Task clicked")
const changeStatusCallBack = action("Status change inside Task")
const changeTaskTitleCallBack = action("Title changed inside Task")

export const TaskBaseExample = () =>
<>
 <Task   removeTask={removeTaskCallBack} 
         changeStatus={changeStatusCallBack}
         changeTaskTitle={changeTaskTitleCallBack}
         task={{ id: "1", title: "title1", isDone:true}}
         todolistId={"todolistId1"}/>

 <Task   removeTask={removeTaskCallBack} 
         changeStatus={changeStatusCallBack}
         changeTaskTitle={changeTaskTitleCallBack}
         task={{ id: "1", title: "title2", isDone:false}}
         todolistId={"todolistId2"}/>
</>

