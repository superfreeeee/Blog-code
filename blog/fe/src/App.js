import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Demo from './views/Demo'
import FileUpload from './views/FileUpload';
import OriginFileUpload from './views/OriginFileUpload';
import axios from './request/index'
import { Button } from 'antd';

const defaultHost = 'http://116.62.186.245:8999'
const localHost = 'http://localhost:8999'

function App() {
  const [host, setHost] = useState(axios.defaults.baseURL)

  const setDefaults = (host) => {
    axios.defaults.baseURL = host
    setHost(host)
  }

  return (
    <div className="App">
      <h1>App.js</h1>
      <h2>Host: {host}</h2>
      <div>
        <Button onClick={() => {setDefaults(defaultHost)}}>Defualt</Button>
        <Button onClick={() => {setDefaults(localHost)}}>Local</Button>
      </div>
      <Demo></Demo>
      <FileUpload></FileUpload>
      <OriginFileUpload></OriginFileUpload>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
