import React from 'react'
import { Button, Card, Form, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import axios from '../request/index'

function FileUpload() {
  const props = {
    name: 'file',
    customRequest(e) {
      console.log(e)
    },
    showUploadList: {
      showRemoveIcon: true
    }
  }

  const normFile = (e) => {
    const file = e.file
    file.status = 'done'
    return e && e.fileList
  }

  return (
    <div className="box">
      <Card title="File Upload" style={{ minWidth: 300 }}>
        <Form
          name="basic-form"
          onFinish={(e) => {
            console.log(e)
            const formData = new FormData()
            const file = e['upload-file'][0].originFileObj
            formData.append('file', file)
            console.log(formData)
            console.log(file)

            axios.post('/note/upload', formData).then((res) => {
              console.log(res.data)
            })
          }}
        >
          <Form.Item
            name="upload-file"
            lable="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...props}>
              <Button icon={<PlusOutlined />}>Add</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default FileUpload
