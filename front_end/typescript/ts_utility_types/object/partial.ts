interface ITodoItem {
  id: number;
  title: string;
  content: string;
  completed?: boolean;
}

function updateTodo(todo: ITodoItem, update: Partial<ITodoItem>) {
  return { ...todo, ...update };
}
// Partial<ITodoItem> = {
//   id?: number;
//   title?: string;
//   content?: string;
//   completed?: boolean;
// }

const todo: ITodoItem = {
  id: 1,
  title: 'Sample',
  content: 'description in content',
};

updateTodo(todo, {
  completed: true,
});
