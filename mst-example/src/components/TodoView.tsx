import React, { FC } from 'react'
import { observer } from 'mobx-react'
import { values } from 'mobx'
import { TodoType } from '../models/Todo'

export type TodoProps = {
  todo: TodoType
}

export interface AppProps {
  store: {
    addTodo: Function,
    todos: Array<TodoProps>
  }
}

export const TodoView: FC<TodoProps> = ({
  todo
}: TodoProps) => {
  return observer(() => (
    <div>
      <input type="checkbox" checked={todo.done} onChange={e => todo.toggle()} />
      <input
        type="text"
        value={todo.name}
        onChange={e => todo.setName(e.target.value)}
      />
    </div>
  ))
}

export const AppView: FC<AppProps> = ({
  store
}: AppProps) => {
  return observer(() => (
    <div>
      <button onClick={e => store.addTodo('New task')}>Add task</button>
      {
        values(store.todos).map(todo => (
          <TodoView todo={todo} />
        ))
      }
    </div>
  ))
}
