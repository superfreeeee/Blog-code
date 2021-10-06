import styles from './index.module.scss';

import React, { FC } from 'react';
import classNames from 'classnames';

import styled from 'styled-components';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const f = (...props) => {
  console.log(`outside props`, props);
  console.log(props[0]);
  console.log(props[1]);
  console.log(props[1] === f);
};

const res = f`A${(props) => {
  console.log(`inside props`, props);
  return 'B';
}}C`;

console.log(`res`, res);

const App: FC = () => {
  return (
    <div className={classNames(styles.appRoot)}>
      <h1>Application Front-end</h1>
      <Title>A Title</Title>
      <Button>A Button</Button>
      <Button primary>A Button</Button>
    </div>
  );
};

export default App;
