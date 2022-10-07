import { ETodoActionType, ITodosSliceState } from '@/types/todo';
import { AnyAction } from 'redux';

const initialState: ITodosSliceState = [];

function nextTodoId(todos: ITodosSliceState): number {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

export default function todosReducer(
  state: ITodosSliceState = initialState,
  action: AnyAction
): ITodosSliceState {
  switch (action.type) {
    case 'todos/todoAdded': {
      return [
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
        },
        ...state,
      ];
    }

    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    }

    case ETodoActionType.TodoLoaded: {
      return action.payload;
    }

    default:
      return state;
  }
}

export async function fetchTodos(dispatch, getState) {
  const todos = await fetch('/todos.json').then((res) => res.json());
  console.log('fetch todos', todos);

  dispatch({ type: ETodoActionType.TodoLoaded, payload: todos });
}
