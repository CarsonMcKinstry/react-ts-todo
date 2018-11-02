import * as React from 'react';
import { memo, SFC } from 'react';

import { withTodoContext, TodoState, TodoMethods} from './TodoContext';

interface Props extends TodoState, TodoMethods {

}

const TodoForm: SFC<Props> = (props) => (
  <form onSubmit={props.createTodo}>
    <input
      type="text"
      value={props.inputValue}
      onChange={props.handleChange}
    />
  </form>
);

export default withTodoContext(memo(TodoForm));