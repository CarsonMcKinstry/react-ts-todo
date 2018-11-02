import * as React from 'react';
import { memo, SFC } from 'react';
import Todo, { TodoInterface } from './Todo';

import { withTodoContext, TodoState, TodoMethods } from './TodoContext';

interface Props extends TodoState, TodoMethods {

}

const TodoList:SFC<Props> = (props) => {
  return (
    <ul>
    { 
      props.todos.map((todo: TodoInterface, i) => (
        <Todo
          key={`todo-${i}`}
          {...todo}
          index={i}
          toggleTodo={() => props.toggleTodo(i)}
        />
      ))
    }
  </ul>
  )
}

export default withTodoContext(memo(TodoList));