import React from 'react';
import styled from 'styled-components';

const Thing = styled.div`
  color: blue;

  .something {
    border: 1px solid; // an element labeled ".something" inside <Thing>
    display: block;
  }
`;

const Sample9 = () => {
  return (
    <Thing>
      <label htmlFor="foo-button" className="something">
        Mystery button
      </label>
      <button id="foo-button">What do I do?</button>
    </Thing>
  );
};

export default Sample9;
