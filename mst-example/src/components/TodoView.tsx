import React, { FC } from 'react'
import { observer } from 'mobx-react'
import { TodoType } from '../models/Todo'
import { AppType } from '../models/Todos'
import Todos from './Todos'
import { useMst } from '../models'

export type TodoProps = {
  todo: TodoType
}

export type AppProps = {
  store: AppType
}

interface Props {}

const Todo: FC<TodoProps> = ({ todo }: TodoProps) => (
  <div>
    <input type="checkbox" checked={todo.done} onChange={e => todo.toggle()} />
    <input
      type="text"
      value={todo.name}
      onChange={e => todo.setName(e.target.value)}
      //onBlur={e => todo.setName(e.target.value)}
    />
  </div>
)

const TodoView = observer(Todo)

const AppView: FC<Props> = () => {
  const mst = useMst()
  const todos = mst.todos

  return (
    <div>
      <button onClick={e => todos.addToDo('New task')}>Add task</button>
      <p>Pending: {todos.pendingCount}, completed: {todos.completedCount}</p>
      <Todos todos={todos.todos} />
      {
        todos.todos.map((todo, key) => (
          <TodoView key={key} todo={todo} />
        ))
      }

    </div>
  )
}

export default observer(AppView)
