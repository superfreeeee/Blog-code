interface IPerson {
  name: string;
  age: number;
}

type EmployeeNames = 'superfree' | 'crystal' | 'andy';

const employees: Record<EmployeeNames, IPerson> = {
  superfree: { name: 'superfree', age: 22 },
  crystal: { name: 'crystal', age: 21 },
  andy: { name: 'andy', age: 22 },
};

employees.andy;
