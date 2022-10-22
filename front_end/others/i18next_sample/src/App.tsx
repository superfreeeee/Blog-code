import React, { FC } from 'react';
import styles from './App.module.scss';
import { changeLanguage, i18n, useTrans } from './locales';

const App: FC = () => {
  const t = useTrans();

  return (
    <div className={styles.container}>
      <h1>React App</h1>
      <div>Project build by @youxian/cli</div>
      <h2>{t('greeting')}</h2>
      <div>
        <button onClick={() => changeLanguage('zh')}>中文</button>
        <button onClick={() => changeLanguage('en')}>英文</button>
      </div>
    </div>
  );
};

export default App;
