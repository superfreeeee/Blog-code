import React, { FC, useMemo, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Sample2, Sample1, Sample3, Sample4, Sample5 } from '@components';

const AppRoot = styled.div``;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

const App: FC = () => {
  const [page, setPage] = useState(0);

  const pages = useMemo(() => [<Sample1 />, <Sample2 />, <Sample3 />, <Sample4 />, <Sample5 />], []);

  const Content = useMemo(() => {
    return pages[page];
  }, [pages, page]);

  return (
    <AppRoot>
      <GlobalStyle />
      <h1>React Loadable Usage</h1>
      <div>
        {pages.map((_, i) => (
          <button key={i} onClick={() => setPage(i)}>
            Sample{i + 1}
          </button>
        ))}
      </div>
      {Content}
    </AppRoot>
  );
};

export default App;
