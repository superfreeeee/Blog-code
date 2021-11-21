import styles from './index.module.scss';

import React, { FC } from 'react';
import classNames from 'classnames';

// @ts-ignore
import html from './assets/index.html';
// @ts-ignore
import markdown from './assets/index.md';
import './assets/drake.css'

console.log(html);
console.log(markdown);

const App: FC = () => {
  return (
    <div className={classNames(styles.appRoot)}>
      <h1>Application Front-end</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
      <div dangerouslySetInnerHTML={{ __html: markdown }}></div>
    </div>
  );
};

export default App;
