import styled from 'styled-components';

const Selection = styled.div`
  display: flex;
  align-items: center;
  height: 26px;
  white-space: nowrap;

  &.left {
    flex: 1;
  }

  & + & {
    margin-top: 15px;
  }

  input[type='radio'] {
    position: absolute;
    opacity: 0;
  }

  label {
    line-height: 28px;
  }

  label::before {
    content: '';
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 5px;
    border: 1px solid #b4b4b4;
    border-radius: 50%;
    box-shadow: inset 0 0 0 4px #fff;
    vertical-align: top;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  input[type='radio']:checked + label::before {
    border-color: #000;
    background-color: #000;
  }

  span {
    margin-left: 5px;
    font-size: 18px;
  }
`;

export default Selection;
