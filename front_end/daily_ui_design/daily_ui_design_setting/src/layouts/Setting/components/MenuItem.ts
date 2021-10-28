import styled from 'styled-components';

const MenuItem = styled.div`
  width: 185px;
  height: 50px;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;

  & + & {
    margin-top: 5px;
  }

  &.selected,
  &:hover {
    background-color: #fff;
  }
`;

export default MenuItem;
