import React, { FC } from 'react';
import styled from 'styled-components';

const Link: FC<{ className?: string }> = ({ className, children }) => <a className={className}>{children}</a>;

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

export default function Sample6() {
  return (
    <div>
      <Link>Unstyled, boring Link</Link>
      <br />
      <StyledLink>Styled, exciting Link</StyledLink>
    </div>
  );
}
