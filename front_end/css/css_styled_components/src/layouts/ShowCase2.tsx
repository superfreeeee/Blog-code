import React, { FC } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// 2.1 组件样式覆盖
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

// 2.2 修饰函数组件
const Link: FC<{ className?: string }> = ({ className, children }) => <a className={className}>{children}</a>;

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

const ShowCase2 = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <Button>Normal Button</Button>
        <TomatoButton>Tomato Button</TomatoButton>
      </div>
      <div>
        <Link>Unstyled, boring Link</Link> <StyledLink>Styled, exciting Link</StyledLink>
      </div>
    </div>
  );
};

export default ShowCase2;
