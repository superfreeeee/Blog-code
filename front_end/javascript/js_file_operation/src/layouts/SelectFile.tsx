import React from 'react';
import styled from 'styled-components';

import DeleteButton from '@components/DeleteButton';
import Section from '@components/Section';
import useFileSelector from '@hooks/useFileSelector';

const Container = styled(Section)`
  width: unset;
  max-width: 750px;

  table td,
  table th {
    width: 150px;
    padding: 0 14px;
    text-align: center;
    white-space: nowrap;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

const formatSize = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  size = Math.floor(size);

  for (const unit of units) {
    if (size < 1000) {
      return `${size.toFixed(0)}${unit}`;
    }
    size /= 1000;
  }
  return `${(size * 1000).toFixed(0)}${units[units.length - 1]}`;
};

const SelectFile = () => {
  const { files, FileSelectorEl, removeFile } = useFileSelector();

  return (
    <Container>
      <h2>Input File</h2>
      {FileSelectorEl}
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>文件名</th>
              <th>文件大小</th>
              <th>最后修改时间</th>
            </tr>
          </thead>
          <tbody>
            {files.map(({ name, size, lastModified }, i) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{formatSize(size)}</td>
                <td>{new Date(lastModified).toLocaleString()}</td>
                <td>
                  <DeleteButton onClick={() => removeFile(i)}>X</DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </Container>
  );
};

export default SelectFile;
