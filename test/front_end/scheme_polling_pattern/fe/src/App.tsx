import styles from './index.module.scss';

import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';
import { greeting } from '@api';
import Polling from '@components/Polling';

const App: React.FC<{}> = () => {
  useDocumentTitle('ReactTemplate');

  const doGreeting = useCallback(async () => {
    const res = await greeting();
    console.log('[doGreeting] res', res);
  }, []);

  const [showPolling, setShowPolling] = useState(true);

  return (
    <div className={classNames(styles.app)}>
      <div>
        <h3>Greeting 测试</h3>
        <button onClick={doGreeting}>greeting</button>
      </div>
      {showPolling ? (
        <>
          <button onClick={() => setShowPolling(false)}>destroy Polling Element</button>
          <Polling />
        </>
      ) : (
        <button onClick={() => setShowPolling(true)}>show Polling Element</button>
      )}
    </div>
  );
};

export default App;
