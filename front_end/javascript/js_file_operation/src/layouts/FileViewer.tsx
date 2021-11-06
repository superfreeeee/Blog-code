import React, { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { useForceUpdate, useUnMount } from '@youxian/utils';

import useFileSelector from '@hooks/useFileSelector';
import Section from '@components/Section';
import { readFile } from '@utils';

const VideoViewer: FC<{ file: File }> = ({ file }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [objectUrl, setObjectUrl] = useState('');

  const pauseAndClean = () => {
    videoRef.current?.pause();
    window.URL.revokeObjectURL(objectUrl);
  };

  useEffect(() => {
    pauseAndClean();

    if (file) {
      const newUrl = window.URL.createObjectURL(file);
      setObjectUrl(newUrl);
    }
  }, [file]);

  useUnMount(() => {
    pauseAndClean();
  });

  return <video src={objectUrl} ref={videoRef} autoPlay controls />;
};

const FileViewer = () => {
  const forceUpdate = useForceUpdate();
  const { files, FileSelectorEl } = useFileSelector(null, { multiple: false });

  const file = useMemo(() => files[0], [files]);

  const viewerRef = useRef<ReactElement>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    console.log('file', file);
    const type = file.type;
    const imageType = /^image\//;
    const videoType = /^video\//;

    readFile(file, 'ArrayBuffer').then((res) => console.log('ArrayBuffer:', res));
    readFile(file, 'BinaryString').then((res) => console.log('BinaryString:', res));
    readFile(file, 'DataURL').then((res) => console.log('DataURL:', res));
    readFile(file, 'Text').then((res) => console.log('Text:', res));

    if (imageType.test(type)) {
      console.log('get image');

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        viewerRef.current = <img src={reader.result as string} style={{ maxWidth: '100%' }} />;
        forceUpdate();
      });
      reader.readAsDataURL(file);
    } else if (videoType.test(type)) {
      console.log('get video');

      viewerRef.current = <VideoViewer file={file} />;
      forceUpdate();
    } else {
      console.log('get others');
      const link = document.createElement('a');

      const objectUrl = window.URL.createObjectURL(file);
      link.href = objectUrl;
      link.target = '_blank';
      link.click();
    }
  }, [file]);

  return (
    <Section>
      <h1>File Viewer</h1>
      {FileSelectorEl}
      <div>{viewerRef.current}</div>
    </Section>
  );
};

export default FileViewer;
