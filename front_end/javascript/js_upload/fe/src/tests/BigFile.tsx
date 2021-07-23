import React, { ChangeEvent, useRef } from 'react';
import SparkMD5 from 'spark-md5';
import qs from 'qs';
import { group } from '../utils/msg';

// 并发请求池
const asyncPool = async (
  poolLimit: number,
  tasks: any[],
  iteratorFn: (task: any, tasks?: any[]) => Promise<any>
) => {
  const waiting = [];
  const executing = [];
  for (const task of tasks) {
    // 创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(task, tasks));
    waiting.push(p);

    // 任务数量超过池大小
    if (poolLimit <= tasks.length) {
      const e = p.then(() =>
        executing.splice(executing.indexOf(e), 1)
      );
      executing.push(e);

      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(waiting);
};

// 计算文件 md5
const calcFileMD5 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks = getChunks(file);
    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      spark.append(e.target.result as ArrayBuffer);
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        resolve(spark.end());
      }
    };

    fileReader.onerror = (e) => {
      reject(fileReader.error);
      fileReader.abort();
    };

    function loadNext() {
      const start = currentChunk * chunkSize,
        end = Math.min(file.size, start + chunkSize);
      fileReader.readAsArrayBuffer(file.slice(start, end));
    }
    loadNext();
  });
};

interface ICheckFileExistRes {
  code: number;
  data: {
    isExists: boolean;
    [key: string]: any;
  };
}

// 检查文件是否存在
const checkFileExist = (
  name: string,
  md5: string,
  chunks: number
): Promise<ICheckFileExistRes> => {
  const params = qs.stringify({
    n: name,
    m: md5,
    c: chunks,
  });
  const url = `http://localhost:3001/upload/checkExist?${params}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      group(`[response] ${url}`, () => {
        console.log(res);
      });
      return res;
    });
};

const chunkSize = 1024 * 1024; // 1MB

const getChunks = (file: File) => {
  return Math.ceil(file.size / chunkSize);
};

interface IUploadChunkProps {
  url: string;
  chunk: any;
  chunkId: number;
  chunks: number;
  fileName: string;
  fileMD5: string;
}

/**
 * 上传文件块
 * @param param0
 * @returns
 */
const uploadChunk = ({
  url,
  chunk,
  chunkId,
  chunks,
  fileName,
  fileMD5,
}: IUploadChunkProps) => {
  const formData = new FormData();
  formData.set('file', chunk, `${fileMD5}-${chunkId}`);
  formData.set('chunks', chunks + '');
  formData.set('name', fileName);
  formData.set('timestamp', Date.now().toString());

  return fetch(url, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
};

interface IUploadFileProps {
  file: File;
  fileMD5: string;
  chunkIds: string[];
  chunkSize?: number;
  poolLimit?: number;
}

/**
 * 大文件上传
 */
const uploadFile = ({
  file,
  fileMD5,
  chunkIds,
  chunkSize = 1 * 1024 * 1024, // 1MB
  poolLimit = 3,
}: IUploadFileProps) => {
  const chunks = getChunks(file);
  return asyncPool(
    poolLimit,
    // @ts-ignore
    [...new Array(chunks).keys()],
    (i: number) => {
      if (chunkIds.includes(i + '')) {
        return Promise.resolve();
      }
      const start = i * chunkSize;
      const end = i + 1 === chunks ? file.size : start + chunkSize;
      const chunk = file.slice(start, end);
      return uploadChunk({
        url: 'http://localhost:3001/upload/chunk',
        chunk,
        chunkId: i,
        chunks,
        fileName: file.name,
        fileMD5,
      });
    }
  );
};

const BigFile = () => {
  const inputRef = useRef<HTMLInputElement>();

  const upload = async () => {
    // 获取文件基本信息
    const file = inputRef.current.files[0];
    const fileMD5 = await calcFileMD5(file);
    console.log('select file:', file);
    console.log('fileMD5:', fileMD5);

    // 检查文件是否存在
    const res = await checkFileExist(
      file.name,
      fileMD5,
      getChunks(file)
    );
    console.log('res', res);

    // 重新上传文件
    if (res.code && res.data.isExists) {
      console.log(`file exist: ${res.data.url}`);
    } else {
      const result = await uploadFile({
        file,
        fileMD5,
        chunkIds: res.data.chunkIds as string[],
      });
      console.log('result', result);
    }
  };

  const clear = () => {
    inputRef.current.value = '';
  };

  return (
    <div>
      <h1>文件上传 - 5: 大文件上传</h1>
      <input id="input-files" type="file" ref={inputRef} />
      <button onClick={upload}>Upload</button>
      <button onClick={clear}>Clear</button>
    </div>
  );
};

export default BigFile;
