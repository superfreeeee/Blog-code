import { Card } from 'antd'
import React, { useState } from 'react'
import axios from '../request/index'

function OriginFileUpload() {

  const [file, setFile] = useState()

  const handlerProps = {
    onChange(e) {
      console.log('onChange')
      // console.log(e)
      // console.log(e.target.file)
      console.log(e.target.files[0])
      // console.log(e.target.fileList)
      // console.log()
      const f = e.target.files[0]
      setFile(f)
    },
    
  }

  const submit = (e) => {
    console.log(e)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('file', file)
    axios.post('/note/upload', formData).then(res => {
      console.log(res.data)
    })
  }

  return (
    <div className="box">
      <Card title="File Upload - Origin" style={{ minWidth: 300 }}>
        <h3>abc</h3>
        <input type="file" {...handlerProps}></input>
        <button onClick={submit}>submit</button>
      </Card>
    </div>
  )
}

export default OriginFileUpload