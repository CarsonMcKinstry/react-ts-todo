import * as React from 'react';
import { PureComponent } from 'react';

interface Todo {
  label: string;
  done: boolean;
}

interface State {
  inputValue: string;
  todos: Todo[];
}

class Todos extends PureComponent<{}, State> {

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
      <>
        <form onSubmit={this.createTodo}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </form>
        <ul>
          { this.state.todos.map((todo: Todo, i) => (
            <li
              key={`todo-${i}`}
            >
              <label htmlFor={`todo-${i}`}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => this.toggleTodo(i)}
                  id={`todo-${i}`}
                />
                { todo.label }
              </label>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Todos;