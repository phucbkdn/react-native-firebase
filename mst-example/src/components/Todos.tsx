import  React , { FC } from 'react'
import { observer } from 'mobx-react'
import { TodoType } from '../models/Todo'

export type TodoProps = {
  todos: Array<TodoType>
}

const Todos: FC<TodoProps> = ({ todos }) => {
  return (
    <>
    {
      todos.map((item: TodoType, key: number) => ( <p key={key} style={{color: item.done ? "red" : "black"}}>{item.name}</p>))
    }
  </>
  )
}

export default observer(Todos)
