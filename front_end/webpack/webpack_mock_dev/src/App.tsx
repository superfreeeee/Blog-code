import styles from './index.module.scss';

import React, { useState } from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';
import { apiRequest, API_ROUTE } from '@api';
import config from '@api/config';

const useApi = () => {
  const [useMock, setUseMock] = useState(config.mock.use);

  const toggleUseMock = () => {
    setUseMock(!useMock);
    config.mock.use = !useMock;
  };

  const apiLog = (testName: string, p: Promise<any>) => {
    p.then((res) => {
      console.log(`[api ${testName} success]`, res.body);
    }).catch((err) => {
      console.log(`[api ${testName} error]`, err);
    });
  };

  const test1 = () => {
    apiLog(API_ROUTE.TEST1, apiRequest(API_ROUTE.TEST1));
  };

  const test2 = () => {
    apiLog(API_ROUTE.TEST2, apiRequest(API_ROUTE.TEST2));
  };

  const test3 = () => {
    apiLog(API_ROUTE.TEST3, apiRequest(API_ROUTE.TEST3, { from: 'test3' }));
  };

  return {
    useMock,
    toggleUseMock,
    test1,
    test2,
    test3,
  };
};

const App: React.FC<{}> = () => {
  useDocumentTitle('Webpack Mock');

  const { useMock, toggleUseMock, test1, test2, test3 } = useApi();

  return (
    <div className={classNames(styles.app)}>
      <h1>Webpack Development in Mock mode</h1>
      <div>
        <h3 style={{ margin: '1em 0' }}>use mock: {`${useMock}`}</h3>
      </div>
      <div className={styles.btns}>
        <button onClick={toggleUseMock}>toggle mock</button>
        <button onClick={test1}>Test1</button>
        <button onClick={test2}>Test2</button>
        <button onClick={test3}>Test3</button>
      </div>
    </div>
  );
};

export default App;
