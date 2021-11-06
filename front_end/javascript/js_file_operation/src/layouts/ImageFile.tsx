import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import Section from '@components/Section';
import InputFile from '@components/InputFile';
import Button from '@components/Button';

const ImageFile = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>(null);
  const [imgSrc, setImgSrc] = useState<string>('');

  const selectFile = () => {
    inputRef.current?.click();
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        const dataUrl = e.target.result as string;
        console.log(`dataUrl: ${dataUrl.substring(0, 50)}`);
        setImgSrc(dataUrl);
      });
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <Section>
      <h1>Image File</h1>
      <InputFile ref={inputRef} accept={'image/*'} onChange={onFileChange} />
      <Button onClick={selectFile}>选择图片</Button>
      <div style={{ margin: '20px' }}>{imgSrc ? <img src={imgSrc} width={200} /> : '点击选择图片'}</div>
    </Section>
  );
};

export default ImageFile;
