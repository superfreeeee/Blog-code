export const logGroup = (tag: string, cb: Function) => {
  console.group(tag);
  cb();
  console.groupEnd();
};
