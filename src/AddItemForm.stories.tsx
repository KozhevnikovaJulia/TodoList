import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { AddItemForm, AddItemPropsType } from './AddItemForm';
import {action} from "@storybook/addon-actions"


export default {
  title: 'Todolist/AddItemForm component',
  component: AddItemForm,
} as Meta;
const callBack = action("Button inside form clicked")
export const AddItemFormBaseExample = () =>
 <AddItemForm  addItem={callBack}/>;


