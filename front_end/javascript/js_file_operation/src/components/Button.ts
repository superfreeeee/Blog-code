import styled from 'styled-components';

const Button = styled.button`
  padding: 6px 14px;
  background-color: #fff;
  border: 1px solid #5a5a5a;
  border-radius: 6px;
  box-shadow: 0 5px 10px #e3e3e3;
  cursor: pointer;

  &:hover {
    box-shadow: 0 5px 10px #d3d3d3;
  }

  &:active {
    box-shadow: 0 5px 10px #dadada;
  }
`;

export default Button;
