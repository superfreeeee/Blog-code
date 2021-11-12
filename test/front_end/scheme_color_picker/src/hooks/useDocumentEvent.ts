import { useRef } from 'react';

const useDocumentEvent = (name: string, listener: EventListener) => {
  const prevListener = useRef<EventListener>(null);

  if (prevListener.current !== listener) {
    console.log('current listener', listener);
    document.removeEventListener(name, prevListener.current);
    document.addEventListener(name, listener);
    prevListener.current = listener;
  }
};

export default useDocumentEvent;
