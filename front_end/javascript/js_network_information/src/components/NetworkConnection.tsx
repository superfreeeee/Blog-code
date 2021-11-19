import React, { useEffect, useState } from 'react';

interface NetworkState {
  since?: Date;
  online?: boolean;
  type?: string;
  effectiveType?: string;
  downlink?: number;
  downlinkMax?: number;
  rtt?: number;
  saveData?: boolean;
}

const getConnection = () => {
  const nav = window.navigator;
  if (!nav) return null;
  // @ts-ignore
  return nav.connection || nav.mozConnection || nav.webkitConnection;
};

const getNetworkState = (): NetworkState => {
  const connection = getConnection();
  if (!connection) {
    return {
      since: new Date(),
      online: navigator.onLine,
    };
  }
  const state: NetworkState = {
    since: new Date(),
    online: navigator.onLine,
    type: connection.type,
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    downlinkMax: connection.downlinkMax,
    rtt: connection.rtt,
    saveData: connection.saveData,
  };

  console.table(state);

  return state;
};

const NetworkConnection = () => {
  const [state, setState] = useState<NetworkState>({});

  useEffect(() => {
    // init state
    setState(getNetworkState());

    const onStateChange = () => {
      setState(getNetworkState());
    };

    const connection = getConnection();

    window.addEventListener('online', onStateChange);
    window.addEventListener('offline', onStateChange);
    connection?.addEventListener('change', onStateChange);
    return () => {
      window.removeEventListener('online', onStateChange);
      window.removeEventListener('offline', onStateChange);
      connection?.removeEventListener('change', onStateChange);
    };
  }, []);

  return (
    <div>
      <h1>Network Connection testing</h1>
      {Reflect.ownKeys(state).map((key: string) => {
        const value = state[key];

        return (
          <div key={key}>
            {key}: {String(value)}
          </div>
        );
      })}
    </div>
  );
};

export default NetworkConnection;
