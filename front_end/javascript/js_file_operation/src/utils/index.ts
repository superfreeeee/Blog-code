type ReadType = 'DataURL' | 'ArrayBuffer' | 'Text' | 'BinaryString';

export const readFile = (file: File, type: ReadType): Promise<any> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.addEventListener('error', () => {
      reject(reader.result);
    });
    reader[`readAs${type}`](file);
  });
