interface ITodoItem2 {
  title: string;
  description: string;
  completed: boolean;
}

type ITodoItemPreview = Pick<ITodoItem2, 'title' | 'description'>;

const preview: ITodoItemPreview = {
  title: 'title',
  description: 'description',
};
// type ITodoItemPreview = {
//   title: string;
//   description: string;
// }
