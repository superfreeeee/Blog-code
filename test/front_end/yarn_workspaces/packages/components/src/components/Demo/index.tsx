import React from 'react';

import { useMount } from '@youxian/test-hooks';

const Demo = () => {
  useMount(() => {
    console.log('Hello World by useMount from @youxian/test-hooks');
  });

  return (
    <div>
      <h1>Demo Component</h1>
      <div>export from packages/components</div>
    </div>
  );
};

export default Demo;
