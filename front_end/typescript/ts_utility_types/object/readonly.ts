interface IText {
  readonly id: number;
  text: string;
}

const t1: IText = { id: 0, text: 'superfree' };
// t1.id = 1;
t1.text += '123';

const t2: Readonly<IText> = t1;
// t1.id = 1;
// t2.text += '789';

// Readonly<IText> = {
//   readonly id: number;
//   readonly text: string;
// }
