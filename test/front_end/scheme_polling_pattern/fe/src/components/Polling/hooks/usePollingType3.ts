import useUnMount from '@hooks/useUnMount';
import { useCallback, useRef } from 'react';
import { IPollingResponse } from '@api/interface';
import useMount from '@hooks/useMount';
import { polling } from '@api';

interface IPollingEngineFn {
  (pageNo: number, pageSize: number): Promise<IPollingResponse>;
}

interface IPollingEngineCallback {
  (res: IPollingResponse): void;
}

class PollingEngine {
  private readonly _startPageNo: number;
  private _pageNo: number;
  private readonly _pageSize: number;
  private readonly _pollingFn: IPollingEngineFn;

  constructor(startPageNo: number, pageSize: number, fn: IPollingEngineFn) {
    this._startPageNo = startPageNo;
    this._pageSize = pageSize;
    this._pollingFn = fn;
  }

  private callbackList: Set<IPollingEngineCallback> = new Set();

  onDataRecieve(callback: IPollingEngineCallback): () => void {
    this.callbackList.add(callback);

    let cleared = false;
    return () => {
      if (cleared) {
        return;
      }

      this.callbackList.delete(callback);
      cleared = true;
    };
  }

  private _pasued: boolean = false;
  private _hasFinish: boolean = false;

  private async doPolling() {
    // check pause
    if (this._pasued) {
      console.log('[PollingEngine.doPolling] paused and return');
      this._pasued = false;
      return;
    }

    // polling
    const res = await this._pollingFn(this._pageNo, this._pageSize);

    // notify
    this.notify(res);

    // do next
    if (res.pagination.hasFinish) {
      this._hasFinish = true;
    } else {
      this._pageNo++;
      setTimeout(() => {
        this.doPolling();
      }, 1000);
    }
  }

  private notify(res: IPollingResponse) {
    this.callbackList.forEach((callback) => {
      callback(res);
    });
  }

  private _isPolling: boolean = false;

  start(): void {
    if (this._isPolling) {
      console.log(`[doPollingType3] isPolling, return immediately`);
      return;
    }
    this._isPolling = true;

    this._pageNo = this._startPageNo;
    this.doPolling();
  }

  pause(): void {
    if (this._isPolling) {
      this._pasued = true;
      this._isPolling = false;
    }
  }

  continue(): void {
    if (this._isPolling) {
      console.log(`[doPollingType3] isPolling, return immediately`);
      return;
    }
    this._isPolling = true;

    this.doPolling();
  }

  hasFinish(): boolean {
    return this._hasFinish;
  }
}

const usePollingType3 = () => {
  const pollingEngineRef = useRef<PollingEngine>(null);

  useMount(() => {
    const startPageNo = 1;
    const pageSize = 10;

    pollingEngineRef.current = new PollingEngine(startPageNo, pageSize, polling);

    pollingEngineRef.current.onDataRecieve((res) => {
      console.log(`[doPollingType3] recieve data`, res.data);
    });
  });

  const doPollingType3 = useCallback(() => {
    pollingEngineRef.current.start();
  }, []);

  const cancelPolling = useCallback(() => {
    pollingEngineRef.current.pause();
  }, []);

  useUnMount(cancelPolling);

  return [doPollingType3, cancelPolling];
};

export default usePollingType3;
