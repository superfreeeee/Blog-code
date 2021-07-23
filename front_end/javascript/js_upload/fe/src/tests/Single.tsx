import React, { ChangeEvent, useState } from 'react'
import { group } from '../utils/msg'

interface UploadProps {
  url: string
  body: FormData
}

export const uploadREQ = ({ url, body }: UploadProps) => {
  return fetch(url, {
    method: 'POST',
    body,
  })
}

const Single = () => {
  const [filePath, setFilePath] = useState('')

  const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('selected file:', e.target.files[0])
  }

  const upload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.addEventListener('change', e => {
      const file = (e.target as HTMLInputElement).files[0]
      console.log('selected file:', file)

      const formData = new FormData()
      formData.append('file', file, `1_single_${file.name}`)

      const url = 'http://localhost:3001/upload/single'

      uploadREQ({ url, body: formData }).then(async res => {
        const result = await res.json()
        group(`[response] ${url}`, () => {
          console.log(result)
        })
        setFilePath(result.url)
      })
    })
    input.click()
  }

  return (
    <div>
      <h1>文件上传 - 1: 单文件上传</h1>
      <input
        id="input-file"
        type="file"
        onChange={onInputFileChange}
      />
      <input
        id="input-file2"
        type="file"
        accept=".png,.jpg"
        onChange={onInputFileChange}
      />
      <button id="btn-file3" onClick={upload}>
        Click to upload
      </button>
      <h4>
        file path:{' '}
        <a target="_blank" href={filePath}>
          {filePath}
        </a>
      </h4>
    </div>
  )
}

export default Single
