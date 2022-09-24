export const tryParse = (s: string) => {
  try {
    return JSON.parse(s);
  } catch (e) {
    console.error(e);
    return s;
  }
};
