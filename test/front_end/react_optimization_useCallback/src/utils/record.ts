const funcsMap = new Map<string, Function[]>();

export const rec = (tag: string = 'default', fn: Function) => {
  if (!funcsMap.has(tag)) {
    funcsMap.set(tag, []);
  }
  const funcs = funcsMap.get(tag);
  if (funcs.includes(fn)) {
    console.log(`[${tag}] fn exists`);
  } else {
    funcs.push(fn);
    console.log(`[${tag}] funcs:`, funcs);
  }
};
