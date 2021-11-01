interface Listener {
  destroy(): void;
}

declare function delegate(): Listener;
declare function delegate(selector: string, type: string, callback: (e: Event) => void, useCapture: boolean): Listener;
declare function delegate(
  element: string | Element | Element[] | NodeList,
  selector: string,
  type: string,
  callback: (e: Event) => void,
  useCapture: boolean
): Listener;
