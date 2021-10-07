import React from 'react';
import styled, { keyframes } from 'styled-components';

// 5.1 动画片段
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// 5.2 带动画元素
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

const ShowCase5 = () => {
  return (
    <div style={{ height: '7em' }}>
      <Rotate>&lt; 💅🏾 &gt;</Rotate>
    </div>
  );
};

export default ShowCase5;
