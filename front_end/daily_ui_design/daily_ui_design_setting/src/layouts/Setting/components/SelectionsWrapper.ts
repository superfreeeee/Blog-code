import styled from 'styled-components';

const SelectionsWrapper = styled.div`
  margin-top: 40px;

  .showMore {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 40px;
    color: var(--font_color);
    font-size: 16px;
    font-weight: 600;

    span,
    i {
      cursor: pointer;
    }
  }
`;

export default SelectionsWrapper;
