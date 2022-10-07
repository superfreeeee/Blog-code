import {
  ETodoActionType,
  ETodoStatus,
  ITodoAction,
  ITodoItem,
  ITodoState,
} from '@/types/todo';

const initialState: ITodoState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
  ],
  filters: {
    status: ETodoStatus.All,
    colors: [],
  },
};

const nextTodoId = (todos: ITodoItem[]) => {
  let nextId = 0;
  todos.forEach(({ id }) => {
    if (id >= nextId) {
      nextId = id + 1;
    }
  });
  return nextId;
};

export default function appReducer(
  state: ITodoState = initialState,
  action: ITodoAction
): ITodoState {
  switch (action.type) {
    case ETodoActionType.TodoAdded: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nextTodoId(state.todos),
            text: action.payload,
            completed: false,
          },
        ],
      };
    }

    case ETodoActionType.TodoToggled: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload) {
            return todo;
          }

          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      };
    }

    case ETodoActionType.StatusFilterChanged: {
      return {
        // Copy the whole state
        ...state,
        // Overwrite the filters value
        filters: {
          // copy the other filter fields
          ...state.filters,
          // And replace the status field with the new value
          status: action.payload,
        },
      };
    }

    default:
      return state;
  }
}
