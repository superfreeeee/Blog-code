import React, { ChangeEvent } from 'react'
import { group } from '../utils/msg'
import { uploadFiles } from './Multiple'

const Directory = () => {
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files)

    const url = 'http://localhost:3001/upload/multiple'
    uploadFiles({
      url,
      files,
      prefix: '3_directory',
      fromDir: true,
    }).then(async res => {
      const result = await res.json()
      group(`[response] ${url}`, () => {
        console.log(result)
      })
    })
  }

  return (
    <div>
      <h1>文件上传 - 3: 按目录上传</h1>
      <input
        id="input-files"
        type="file"
        // @ts-ignore
        webkitdirectory="true"
        onChange={onFileChange}
      />
    </div>
  )
}

export default Directory
