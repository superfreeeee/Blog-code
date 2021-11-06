import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';

import Button from '@components/Button';
import InputFile from '@components/InputFile';

const uniqueFiles = (files: File[]): File[] => {
  const fileMap: { [name: string]: File } = {};
  files.forEach((file) => {
    if (!fileMap[file.name]) [(fileMap[file.name] = file)];
  });

  return Object.values(fileMap);
};

interface FileSelectorOptions {
  multiple?: boolean;
}

const useFileSelector = (
  onFilesChange?: (files: File[]) => void,
  options: FileSelectorOptions = { multiple: true }
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (options.multiple) {
        const fileList = e.target.files;
        let newFiles = Array.from({ length: fileList.length }, (_, i) => fileList.item(i));
        newFiles = uniqueFiles([...files, ...newFiles]);
        setFiles(newFiles);
        onFilesChange && onFilesChange(newFiles);
      } else {
        const file = e.target.files[0];
        if (file) {
          setFiles([file]);
        }
      }
    },
    [files, onFilesChange, options]
  );

  const removeFile = useCallback(
    (index: number) => {
      setFiles([...files.slice(0, index), ...files.slice(index + 1, files.length)]);
    },
    [files]
  );

  const FileSelectorEl = useMemo(() => {
    const selectFile = () => {
      inputRef.current.click();
    };

    return (
      <div>
        <InputFile ref={inputRef} onChange={onChange} multiple={options.multiple} />
        <Button onClick={selectFile}>选择文件</Button>
      </div>
    );
  }, [onChange, options]);

  return {
    files,
    FileSelectorEl,
    removeFile,
  };
};

export default useFileSelector;
