type KeyOf<T> = keyof T;
type ValueOf<T> = T[keyof T];

const obj = {
  name: 'superfree',
  age: 22,
  skills: ['react'],
};

type ObjKeys = KeyOf<typeof obj>;
// type ObjKeys = "name" | "age" | "skills"
type ObjValues = ValueOf<typeof obj>;
// type ObjValues = string | number | string[]
