import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--border_color);

  span {
    font-size: 26px;
    font-weight: 700;
  }
`;

export default Header;
