import * as React from 'react';
import { createContext, PureComponent } from 'react';
import { TodoInterface } from './Todo';
import { Omit } from '../../omit';

export interface TodoState {
  inputValue: string;
  todos: TodoInterface[];
}

export interface TodoMethods {
  handleChange: React.FormEventHandler<HTMLInputElement>;
  createTodo: React.FormEventHandler<HTMLFormElement>;
  toggleTodo: (id: number) => void;
}

const { Provider, Consumer } = createContext({});

export class TodoContextProvider extends PureComponent<{}, TodoState> {
  state = {
    inputValue: '',
    todos: []
  }

  handleChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      inputValue: e.currentTarget.value
    });
  }

  createTodo: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (inputValue.trim().length < 1) return;
    const newTodo = {
      label: inputValue,
      done: false
    };
    this.setState(({ todos }) => ({
      inputValue: '',
      todos: [
        ...todos,
        newTodo
      ]
    }))
  }

  toggleTodo = (id: number) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo, i) => {
        if (i !== id) {
          return todo;
        }

        return {
          ...todo,
          done: !todo.done
        }
      })
    }));
  }

  render() {
    return (
      <Provider value={{
        ...this.state,
        handleChange: this.handleChange,
        createTodo: this.createTodo,
        toggleTodo: this.toggleTodo
      }}>
        { this.props.children }
      </Provider>
    )
  }
}

export function withTodoContext<
  P,
  R
>(
  Component: React.ComponentClass<P> | React.SFC<P>
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
      <Consumer>
        {ctx => <Component {...props} {...ctx}/>}
      </Consumer>
    )
  }
}