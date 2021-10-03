export enum ETimeUnit {
  SECOND,
  MILLISECOND,
}

const fillTime = (num: number, width: number = 2) => {
  const numStr = '' + num;
  return numStr.length >= width
    ? numStr
    : '0'.repeat(width - numStr.length) + numStr;
};

export const formatTime = (
  time: number,
  unit: ETimeUnit = ETimeUnit.MILLISECOND,
  showMs: boolean = false
) => {
  if (unit === ETimeUnit.SECOND) {
    time *= 1000;
  }

  time = Math.floor(time);

  const ms = time % 1000;
  const sec = Math.floor(time / 1000) % 60;
  const min = Math.floor(time / 60000) % 60;
  const hour = Math.floor(time / 3600000);

  const timeStr =
    hour > 0
      ? `${fillTime(hour)}:${fillTime(min)}:${fillTime(sec)}`
      : `${fillTime(min)}:${fillTime(sec)}`;
  return showMs ? `${timeStr}${fillTime(ms, 3)}` : timeStr;
};
