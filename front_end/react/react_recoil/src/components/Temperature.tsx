import React from 'react';
import { useRecoilState } from 'recoil';

import { fahrenheitState } from '@/state/selectors';
import { celsiusState } from '@/state/states';
import styled from 'styled-components';

const TemperatureWrapper = styled.div`
  text-align: center;

  label {
    width: 70px;
  }

  input {
    width: 50px;
  }
`;

const Temperature = () => {
  const [celsius, setCelsius] = useRecoilState(celsiusState);
  const [fahrenheit, setFahrenheit] = useRecoilState(fahrenheitState);

  const onCelsiusChange = (e) => {
    const val = Number(e.target.value);
    console.log(`new celsius ${val}`);
    setCelsius(val);
  };
  const onFahrenheitChange = (e) => {
    const val = Number(e.target.value);
    console.log(`new fahrenheit ${val}`);
    setFahrenheit(val);
  };

  return (
    <TemperatureWrapper>
      <h2>Selector - Temparature</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <label>
          <div>celsius</div>
          <input type="text" value={celsius} onChange={onCelsiusChange} />
        </label>{' '}
        ={' '}
        <label>
          <div>fahrenheit</div>
          <input type="text" value={fahrenheit} onChange={onFahrenheitChange} />
        </label>
      </div>
    </TemperatureWrapper>
  );
};

export default Temperature;
