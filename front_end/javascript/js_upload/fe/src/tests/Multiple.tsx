import React, { ChangeEvent } from 'react'
import { group } from '../utils/msg'
import { uploadREQ } from './Single'

interface UploadFilesProps {
  url: string
  files: File[]
  prefix: string
  fromDir?: boolean
}

export const uploadFiles = ({
  url,
  files,
  prefix,
  fromDir = false,
}: UploadFilesProps) => {
  const formData = new FormData()

  files.forEach(file => {
    const fileName = fromDir
      ? // @ts-ignore
        file.webkitRelativePath.replace(/\//g, `@${prefix}_`)
      : `${prefix}_${file.name}`

    formData.append('files', file, fileName)
  })

  console.log('upload files:', formData.getAll('files'))

  return uploadREQ({ url, body: formData })
}

const Multiple = () => {
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files)

    const url = 'http://localhost:3001/upload/multiple'
    uploadFiles({
      url,
      files,
      prefix: '2_multiple',
    }).then(async res => {
      const result = await res.json()
      group(`[response] ${url}`, () => {
        console.log(result)
      })
    })
  }

  return (
    <div>
      <h1>文件上传 - 2: 多文件上传</h1>
      <input
        id="input-files"
        type="file"
        multiple
        onChange={onFileChange}
      />
    </div>
  )
}

export default Multiple
