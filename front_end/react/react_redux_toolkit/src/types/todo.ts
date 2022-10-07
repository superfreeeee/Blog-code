export interface ITodoItem {
  id: number;
  text: string;
  completed: boolean;
  color?: string;
}

export enum ETodoStatus {
  All = 'All',
  Active = 'Active',
}

export type ITodosSliceState = Array<ITodoItem>;

export interface IFiltersSliceState {
  status: ETodoStatus;
  colors: string[];
}

export interface ITodoState {
  todos: Array<ITodoItem>;
  filters: {
    status: ETodoStatus;
    colors: string[];
  };
}

export enum ETodoActionType {
  TodoAdded = 'todos/todoAdded',
  TodoToggled = 'todos/todoToggled',
  TodoLoaded = 'todos/todoLoaded',
  ColorSelected = 'todos/colorSelected',
  TodoDeleted = 'todos/todoDeleted',
  AllCompleted = 'todos/allCompleted',
  CompletedCleared = 'todos/completedCleared',
  StatusFilterChanged = 'filters/statusFilterChanged',
  ColorFilterChanged = 'filters/colorFilterChanged',
}

export interface ITodoAction {
  type: ETodoActionType;
  payload: any;
}

export interface IRootState {
  todos: ITodosSliceState;
  filters: IFiltersSliceState;
}
