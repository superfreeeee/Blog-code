import styled from 'styled-components';

interface ButtonProps {
  primary?: boolean;
}

const Button = styled.span<ButtonProps>`
  display: inline-block;
  width: 110px;
  height: 50px;
  padding: 15px 25px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? 'var(--font_color)' : 'transparent')};
  color: ${(props) => (props.primary ? '#fff' : '#000')};

  & + & {
    margin-left: 10px;
  }
`;

export default Button;
