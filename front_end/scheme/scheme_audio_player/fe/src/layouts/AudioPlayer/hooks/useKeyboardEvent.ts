import { useEffect, useRef } from 'react';

import { TAudioControl } from './useAudioControl';

enum EKeyCode {
  SPACE = 'Space',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_DOWN = 'ArrowDown',
  ARROW_UP = 'ArrowUp',
}

const useKeyboardEvent = (audioControl: TAudioControl) => {
  const audioControlRef = useRef<TAudioControl>(audioControl);

  useEffect(() => {
    audioControlRef.current = audioControl;
  }, [audioControl]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const handlerMap: { [code in EKeyCode]: () => void } = {
        [EKeyCode.SPACE]: () => {
          const {
            state: { playing },
            action: { play, pause },
          } = audioControlRef.current;

          playing ? pause() : play();
        },
        [EKeyCode.ARROW_LEFT]() {
          const {
            state: { currentTime },
            action: { seek },
          } = audioControlRef.current;

          seek(Math.max(0, currentTime - 15));
        },
        [EKeyCode.ARROW_RIGHT]() {
          const {
            state: { currentTime, duration },
            action: { seek },
          } = audioControlRef.current;

          seek(Math.min(duration, currentTime + 15));
        },
        [EKeyCode.ARROW_DOWN]() {
          const {
            state: { volume },
            action: { updateVolume },
          } = audioControlRef.current;

          updateVolume(Math.max(0, (volume - 5) / 100));
        },
        [EKeyCode.ARROW_UP]() {
          const {
            state: { volume },
            action: { updateVolume },
          } = audioControlRef.current;

          updateVolume(Math.min(1, (volume + 5) / 100));
        },
      };
      handlerMap[e.code]?.();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);
};

export default useKeyboardEvent;
