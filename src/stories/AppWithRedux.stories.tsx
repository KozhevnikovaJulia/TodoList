import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import App from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator"

export default {
  title: 'Todolist/AppWithRedux component',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
} as Meta;

export const AppWithReduxBaseExample = () =>
 <App />


