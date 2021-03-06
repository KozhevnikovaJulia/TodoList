import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { EditableSpan, EditableSpanPropsType  } from '../components/editableSpan/EditableSpan';
import {action} from "@storybook/addon-actions"


export default {
  title: 'Todolist/EditableSpan component',
  component: EditableSpan,
} as Meta;
const callBack = action("Value changed")
export const EditableSpanBaseExample = () =>
 <EditableSpan  value={"start value"} onChange={callBack}/>;

 export const EditableSpanDisabledExample = () =>
 <EditableSpan  value={"start value"} onChange={callBack} disabled={true}/>;

