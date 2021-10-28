import styled from 'styled-components';

const Result = styled.div`
  padding: 25px;
  border-radius: 20px;
  border: 1px solid var(--border_color2);
  font-size: 16px;

  div + div {
    margin-top: 8px;
  }
`;

export default Result;
