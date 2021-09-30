import styles from './index.module.scss';

import React from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';
import AudioPlayer from '@layouts/AudioPlayer';

const App: React.FC<{}> = () => {
  useDocumentTitle('ReactTemplate');

  return (
    <div className={classNames(styles.app)}>
      <h1>React Template</h1>
      <AudioPlayer audioSrc={'http://localhost:8080/audio/test1.mp3'} />
    </div>
  );
};

export default App;
