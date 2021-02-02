import React, { useState } from 'react'
import { Button, Card, Input } from 'antd'
import 'antd/dist/antd.css'
import axios from '../request/index'

const defaultHost = 'http://116.62.186.245:8999'
const localHost = 'http://localhost:8999'

function Demo() {
  const [host, setHost] = useState(defaultHost)
  const [path, setPath] = useState('')
  const [result, setResult] = useState()

  const onHostChange = (e) => {
    // console.log('host change')
    setHost(e.target.value)
  }

  const onPathChange = (e) => {
    setPath(e.target.value)
  }

  const show = () => {
    console.log(`host: ${host}`)
    console.log(`path: ${path}`)
    console.log(`Request URL: ${host + path}`)
  }

  const request = () => {
    const url = host + path
    axios.get(url).then((res) => {
      console.log(res.data)
      setResult(String(res.data.content))
    })
  }

  return (
    <div className="box">
      <Card title="Demo" style={{ minWidth: 300 }}>
        <Input
          size="large"
          placeholder="host"
          value={host}
          onChange={onHostChange}
        ></Input>
        <Button onClick={() => {setHost(defaultHost)}}>Defualt</Button>
        <Button onClick={() => {setHost(localHost)}}>Local</Button>
        <Input size="large" placeholder="path" onChange={onPathChange}></Input>
        <Button onClick={show}>Console</Button>
        <Button onClick={request}>Request</Button>
        <h3>Result: {result}</h3>
      </Card>
    </div>
  )
}

export default Demo
