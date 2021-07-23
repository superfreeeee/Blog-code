import React, { ChangeEvent } from 'react'
import JSZip from 'jszip'
import { uploadREQ } from './Single'
import { group } from '../utils/msg'

const ZIP = (
  files: File[],
  options: JSZip.JSZipGeneratorOptions = {
    type: 'blob',
    compression: 'DEFLATE',
  }
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const zip = new JSZip()
    files.forEach(file => {
      const path = (file as any).webkitRelativePath
      zip.file(path, file)
    })
    zip.generateAsync(options).then((bolb: Blob) => {
      resolve(bolb)
    })
  })
}

const Zip = () => {
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files)

    // @ts-ignore
    const dirName = files[0].webkitRelativePath.split('/')[0]
    const zipName = `${dirName}.zip`
    const zipFile = await ZIP(files)

    const formData = new FormData()
    formData.append('file', zipFile, zipName)

    const url = 'http://localhost:3001/upload/single'
    uploadREQ({
      url,
      body: formData,
    }).then(async res => {
      const result = await res.json()
      group(`[response] ${url}`, () => {
        console.log(result)
      })
    })
  }

  return (
    <div>
      <h1>文件上传 - 4: 压缩文件上传</h1>
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

export default Zip
