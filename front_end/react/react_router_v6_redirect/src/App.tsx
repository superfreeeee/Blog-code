import React, { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './components/Home';
import Login from './components/Login';

const AppRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }
`;

interface RedirectProps {
  to: string;
}

const Redirect: FC<RedirectProps> = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate(to, { replace: true });
    navigate(-1);
    console.error('Bad route');
  });

  return null;
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppRoot>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          <Route path="*" element={<Redirect to="/" />} />
        </Routes>
        <div>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{' '}
          <Link to="/other">Other</Link>
        </div>
      </AppRoot>
    </BrowserRouter>
  );
};

export default App;
