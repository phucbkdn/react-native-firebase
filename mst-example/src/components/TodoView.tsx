import React, { FC } from 'react'
import { observer } from 'mobx-react'
import { TodoType } from '../models/Todo'
import { AppType } from '../models'

export type TodoProps = {
  todo: TodoType
}

export type AppProps = {
  store: AppType
}

const Todo: FC<TodoProps> = ({ todo }: TodoProps) => (
  <div>
    <input type="checkbox" checked={todo.done} onChange={e => todo.toggle()} />
    <input
      type="text"
      value={todo.name}
      onBlur={e => todo.setName(e.target.value)}
    />
  </div>
)

const TodoView = observer(Todo)

const AppView: FC<AppProps> = ({ store }: AppProps) => (
  <div>
    <button onClick={e => store.addToDo('New task')}>Add task</button>
    {
      store.todos.map((todo, key) => (
        <TodoView key={key} todo={todo} />
      ))
    }
  </div>
)

export default observer(AppView)
