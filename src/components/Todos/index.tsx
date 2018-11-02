import * as React from 'react';
import { SFC } from 'react';

import TodoList from './TodoList';
import TodoForm from './TodoForm';

const Todos: SFC<{}> = (props) => (
  <div>
    <TodoForm />
    <TodoList />
  </div>
)

export default Todos;