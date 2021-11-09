import React, { useCallback, useEffect, useRef, useState } from 'react';

type PlainFunction = () => void;

type FullScreenHookRes<T extends HTMLElement> = [
  React.RefObject<T>,
  {
    requestFullScreen: PlainFunction;
    exitFullScreen: PlainFunction;
    toggleFullScreen: PlainFunction;
    isFullScreen: boolean;
  }
];

const useFullScreen = <T extends HTMLElement = HTMLBodyElement>(): FullScreenHookRes<T> => {
  const elementRef = useRef<T>(null);
  const [isFullScreen, setIsFullScreen] = useState(!!document.fullscreenElement);

  useEffect(() => {
    document.body.addEventListener('fullscreenchange', () => {
      setIsFullScreen(!!document.fullscreenElement);
    });
    return () => {
      isFullScreen && document.exitFullscreen();
    };
  }, []);

  const requestFullScreen = useCallback(() => {
    (elementRef.current || (elementRef.current = document.body as T)).requestFullscreen();
  }, []);

  const exitFullScreen = useCallback(() => {
    document.fullscreenElement && document.exitFullscreen();
  }, []);

  const toggleFullScreen = useCallback(() => {
    document.fullscreenElement ? exitFullScreen() : requestFullScreen();
  }, []);

  return [elementRef, { requestFullScreen, exitFullScreen, toggleFullScreen, isFullScreen }];
};

export default useFullScreen;
