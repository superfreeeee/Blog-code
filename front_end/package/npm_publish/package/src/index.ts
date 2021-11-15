const tryParse = (text: string): any => {
  try {
    const data = JSON.parse(text);
    return data;
  } catch (e) {
    console.log('[tryParse] fail', e);
    return null;
  }
};

const tryStringify = (value: any): string => {
  try {
    const text = JSON.stringify(value);
    return text;
  } catch (e) {
    console.log('[tryStringify] fail', e);
    return null;
  }
};

export { tryParse, tryStringify };
