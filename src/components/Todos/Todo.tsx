import * as React from 'react';
import { memo, SFC } from 'react';

export interface TodoInterface {
  label: string;
  done: boolean;
}

interface Props extends TodoInterface {
  index: number;
  toggleTodo: (index: number) => void;
}

const Todo: SFC<Props> = (props) => (
  <li>
    <label htmlFor={`todo-${props.index}`}>
      <input
        type="checkbox"
        checked={props.done}
        onChange={() => props.toggleTodo(props.index)}
        id={`todo-${props.index}`}
      />
      { props.label }
    </label>
  </li>
);

function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.done === nextProps.done;
}

export default memo<Props>(Todo, areEqual);