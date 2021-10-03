import styles from './index.module.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';
import AudioPlayer from '@layouts/AudioPlayer';

const App: React.FC<{}> = () => {
  useDocumentTitle('ReactTemplate');

  const [audioSrc, setAudioSrc] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams.get('n'));
    setAudioSrc(`http://localhost:8080/audio/${searchParams.get('n')}`);
  }, []);

  return (
    <div className={classNames(styles.app)}>
      <h1>React Template</h1>
      <AudioPlayer audioSrc={audioSrc} autoPlay />
    </div>
  );
};

export default App;
