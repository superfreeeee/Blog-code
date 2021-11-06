import React, { ChangeEvent, DragEvent, SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import InputFile from '@components/InputFile';
import classNames from 'classnames';

const DropArea = styled.div`
  width: 300px;
  height: 300px;
  margin: 40px;
  border-radius: 12px;
  border: 2px dashed skyblue;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
  transition: box-shadow 0.2s ease-in;

  &:hover,
  &.hover {
    box-shadow: 0 0 25px #b9e3f4;
  }

  &::before {
    content: '+';
    font-size: 50px;
    font-weight: 300;
    font-family: sans-serif;
    line-height: 300px;
    color: skyblue;
  }
`;

const useDragArea = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>(null);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  }, []);

  const resetFile = useCallback(() => {
    setFile(null);
  }, []);

  const [hover, setHover] = useState(false);

  const DragAreaEl = useMemo(() => {
    const preventDefault = (e: SyntheticEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    const selectFile = () => {
      inputRef.current.click();
    };

    const dragEnter = (e: DragEvent) => {
      preventDefault(e);

      !hover && setHover(true);
    };

    const dragLeave = (e: DragEvent) => {
      preventDefault(e);

      hover && setHover(false);
    };

    const dropFile = (e: DragEvent) => {
      hover && setHover(false);
      preventDefault(e);

      const files = e.dataTransfer.files;

      console.log('files', files);

      const file = files[0];
      if (file) {
        setFile(file);
      }
    };

    return (
      <>
        <InputFile ref={inputRef} onChange={onChange} />
        <DropArea
          className={classNames({ hover })}
          onClick={selectFile}
          onDragEnter={dragEnter}
          onDragOver={preventDefault}
          onDragLeave={dragLeave}
          onDrop={dropFile}
        />
      </>
    );
  }, [hover]);

  return {
    file,
    DragAreaEl,
    resetFile,
  };
};

export default useDragArea;
