type NameOrId<T extends number | string> = T extends number ? number : string;

function createLabel<T extends number | string>(nameOrId: T): NameOrId<T> {
  throw 'unimplemented';
}

const name = createLabel('superfree');
const id = createLabel(123);
