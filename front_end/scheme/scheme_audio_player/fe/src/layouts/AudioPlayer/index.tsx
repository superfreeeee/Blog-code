import styles from './index.module.scss';

import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { ETimeUnit, formatTime } from '@utils/time';
import Icon, { EIconType } from '@components/Icon';
import Slider from '@components/Slider';
import useAudioControl from './hooks/useAudioControl';
import useKeyboardEvent from './hooks/useKeyboardEvent';

interface IAudioPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
}

const AudioPlayer: FC<IAudioPlayerProps> = ({ audioSrc, autoPlay = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log(audioRef.current);
    if (!audioRef.current) {
      console.log('audioRef.current empty');
      return;
    }

    audioRef.current.src = audioSrc;
  }, [audioSrc]);

  const audioControl = useAudioControl(audioRef);
  const {
    state: { duration, playing, currentTime, volume, muted, speedRate, seekingRef },
    action: { play, pause, seek, updateCurrentTime, updateVolume, updateSpeedRate },
  } = audioControl;
  const realPercent = currentTime / duration;

  useKeyboardEvent(audioControl);

  // 跳播
  const onTimePercentUpdate = useCallback(
    (percent: number, dragging: boolean) => {
      const currentTime = percent * duration;
      seekingRef.current = dragging;
      dragging ? updateCurrentTime(currentTime) : seek(currentTime);
    },
    [seek, duration, updateCurrentTime, seek]
  );

  const onVolumePercentUpdate = useCallback(
    (percent: number) => {
      updateVolume(percent);
    },
    [updateVolume]
  );

  // 倍速控制
  const speedOptions = [
    { value: 0.5 },
    { label: '正常', value: 1 },
    { value: 1.25 },
    { value: 1.5 },
    { value: 1.75 },
    { value: 2 },
  ];
  const [currentSpeedIndex, setCurrentSpeedIndex] = useState(1);
  const switchSpeed = useCallback(() => {
    const nextOptionIndex = (currentSpeedIndex + 1) % speedOptions.length;
    setCurrentSpeedIndex(nextOptionIndex);
    const nextRate = speedOptions[nextOptionIndex].value;
    updateSpeedRate(nextRate);
  }, [currentSpeedIndex, speedOptions, updateSpeedRate]);

  return (
    <div>
      <div className={styles.audioPlayer} style={{ marginTop: '12px' }}>
        <audio style={{ width: '600px' }} ref={audioRef} autoPlay={autoPlay}></audio>
        <Icon
          type={playing ? EIconType.Pause : EIconType.Play}
          className={styles.playPauseBtn}
          onClick={playing ? pause : play}
        />
        <div className={styles.progressBar}>
          <Slider percent={realPercent} onPercentUpdate={onTimePercentUpdate} />
        </div>
        <div className={styles.right}>
          <span className={styles.time}>
            {`${formatTime(currentTime, ETimeUnit.SECOND)} / ${formatTime(duration, ETimeUnit.SECOND)}`}
          </span>
          <div className={styles.volumeControl}>
            <div className={styles.bar}>
              <Slider direction={'vertical'} percent={volume / 100} onPercentUpdate={onVolumePercentUpdate} />
            </div>
            <span>{`${volume}%`}</span>
          </div>
          <div className={styles.speedControl}>
            <div className={styles.speedOption} onClick={switchSpeed}>
              {(() => {
                const { label, value } = speedOptions[currentSpeedIndex];
                return label || `x${value}`;
              })()}
            </div>
            {speedOptions.map(({ label, value }, index) => (
              <div
                key={value}
                className={styles.speedOption}
                onClick={() => {
                  setCurrentSpeedIndex(index);
                  updateSpeedRate(value);
                }}
              >
                {label || `x${value}`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
