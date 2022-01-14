import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import { businessCardState } from '@/state/selectors';

const BusinessCard = () => {
  const businessCard = useRecoilValue(businessCardState);

  return <div>data: {JSON.stringify(businessCard)}</div>;
};

const AsyncSelector = () => {
  return (
    <div>
      <h2>Async Selector</h2>
      <Suspense fallback={<div>Loading business card ...</div>}>
        <BusinessCard />
      </Suspense>
    </div>
  );
};

export default AsyncSelector;
