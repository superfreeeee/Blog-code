import React from 'react';
import styled from 'styled-components';

import DeleteButton from '@components/DeleteButton';
import Section from '@components/Section';
import useDragArea from '@hooks/useDragArea';

const Container = Section;

const FileInfo = styled.p``;

const DragFile = () => {
  const { file, DragAreaEl, resetFile } = useDragArea();

  return (
    <Container>
      <h1>Drag File</h1>
      {DragAreaEl}
      <FileInfo>
        <span style={{ display: 'inline-block', marginRight: '8px' }}>
          {file ? `selected file: ${file.name}` : '点击 or 拖动文件'}
        </span>
        {file && <DeleteButton onClick={resetFile}>X</DeleteButton>}
      </FileInfo>
    </Container>
  );
};

export default DragFile;
