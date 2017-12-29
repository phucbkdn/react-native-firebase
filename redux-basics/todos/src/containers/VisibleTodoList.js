import { connect } from 'react-redux';
import { toggleTodo } from '../actions/Actions';
import TodoList from '../components/TodoList';
import { VisibilityFilters } from '../constants/constants';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.complete);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.complete);
    default: break;
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;