import styles from './index.module.scss';

import React, { FC, MouseEvent, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import useInputEl from '@hooks/useInputEl';
import { ETimeUnit, formatTime } from '@utils/time';
import Icon, { EIconType } from '@components/Icon';
import Slider from '@components/Slider';

type TAudioControl = {
  state: {
    duration: number;
    playing: boolean;
    currentTime: number;
    volume: number;
    muted: boolean;
    speedRate: number;
  };
  action: {
    play: () => void;
    pause: () => void;
    seek: (targetTime: number) => void;
    updateVolume: (volume: number) => void;
    updateSpeedRate: (rate: number) => void;
  };
};

const useAudioControl = (audioRef: MutableRefObject<HTMLAudioElement>): TAudioControl => {
  // 音频时长
  const [duration, setDuration] = useState(0);
  // 播放状态
  const [playing, setPlaying] = useState(false);
  // 播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 音量
  const [volume, setVolume] = useState(0);
  // 静音
  const [muted, setMuted] = useState(false);
  // 播放倍速
  const [speedRate, setSpeedRate] = useState(1);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    const audio = audioRef.current;

    const getDuration = (originDuration: number) => (isNaN(originDuration) ? 0 : Math.floor(originDuration));
    const getCurrentTime = (originCurrentTime: number) =>
      isNaN(originCurrentTime) ? 0 : Math.floor(originCurrentTime);
    const getVolumeRate = (originVolume: number) => (isNaN(originVolume) ? 0 : Math.floor(originVolume * 100));

    // 初始化音量
    const { duration, currentTime, volume, muted, playbackRate } = audio;
    setDuration(getDuration(duration));
    setCurrentTime(getCurrentTime(currentTime));
    setVolume(getVolumeRate(volume));
    setMuted(muted);
    setSpeedRate(playbackRate);

    // 播放事件
    const onPlaying = () => {
      setPlaying(true);
    };
    // 暂停事件
    const onPause = () => {
      if (!audio.seeking) {
        setPlaying(false);
      }
    };
    // 时间更新
    const onTimeUpdate = () => {
      setCurrentTime(getCurrentTime(audio.currentTime));
    };
    // 音量更新
    const onVolumeChange = () => {
      const { volume, muted } = audio;
      setVolume(getVolumeRate(volume));
      setMuted(muted);
    };
    // 倍速改变
    const onRateChange = () => {
      setSpeedRate(audio.playbackRate);
    };
    // 时长改变
    const onDurationChange = () => {
      setDuration(getDuration(audio.duration));
    };

    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('volumechange', onVolumeChange);
    audio.addEventListener('ratechange', onRateChange);
    audio.addEventListener('durationchange', onDurationChange);
    return () => {
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('volumechange', onVolumeChange);
      audio.removeEventListener('ratechange', onRateChange);
      audio.removeEventListener('durationchange', onDurationChange);
    };
  }, []);

  // 播放
  const play = useCallback(() => {
    audioRef.current.play();
  }, [audioRef]);

  // 暂停
  const pause = useCallback(() => {
    audioRef.current.pause();
  }, [audioRef]);

  // 跳播
  const seek = useCallback(
    (targetTime: number) => {
      if (audioRef.current.fastSeek) {
        audioRef.current.fastSeek(targetTime);
      } else {
        audioRef.current.currentTime = targetTime;
      }
    },
    [audioRef]
  );

  // 修改音量
  const updateVolume = useCallback(
    (volume: number) => {
      audioRef.current.volume = volume;
    },
    [audioRef]
  );

  // 修改倍速
  const updateSpeedRate = useCallback(
    (speedRate: number) => {
      audioRef.current.playbackRate = speedRate;
    },
    [audioRef]
  );

  return {
    state: {
      duration,
      playing,
      currentTime,
      volume,
      muted,
      speedRate,
    },
    action: {
      play,
      pause,
      seek,
      updateVolume,
      updateSpeedRate,
    },
  };
};

const InputAndAction: FC<{ initValue: string; action: (value: string) => void }> = ({
  initValue,
  action,
  children,
}) => {
  const [value, element] = useInputEl(initValue);

  return (
    <div>
      {element}
      <button onClick={() => action(value)}>{children}</button>
    </div>
  );
};

interface IAudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: FC<IAudioPlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log(audioRef.current);
    if (!audioRef.current) {
      console.log('audioRef.current empty');
      return;
    }

    audioRef.current.src = audioSrc;
  }, [audioSrc]);

  const {
    state: { duration, playing, currentTime, volume, muted, speedRate },
    action: { play, pause, seek, updateVolume, updateSpeedRate },
  } = useAudioControl(audioRef);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarRectRef = useRef<DOMRect>(null);
  const jump = (e: MouseEvent<HTMLDivElement>) => {
    if (!progressBarRectRef.current) {
      progressBarRectRef.current = progressBarRef.current.getBoundingClientRect();
    }
    const clientX = e.clientX;
    const { x, width } = progressBarRectRef.current;
    const percent = (clientX - x) / width;
    seek(percent * duration);
  };

  return (
    <div>
      <h1>Audio Player</h1>
      <audio style={{ width: '600px' }} ref={audioRef} autoPlay controls>
        浏览器不支持哦
      </audio>
      <div>duration: {`${formatTime(duration, ETimeUnit.SECOND)}`}</div>
      <div>playing: {`${playing}`}</div>
      <div>curremtTime: {formatTime(currentTime, ETimeUnit.SECOND)}</div>
      <div>volume: {`${volume}%`}</div>
      <div>muted: {`${muted}`}</div>
      <div>speedRate: {`${speedRate}`}</div>
      <div>
        <button
          onClick={() => {
            console.log(audioRef.current.fastSeek);
            console.log(audioRef.current.seekable);
            console.log(audioRef.current.seekable.start(0));
            console.log(audioRef.current.seekable.end(0));
            console.log({ el: audioRef.current });
          }}
        >
          Show Detail
        </button>
      </div>
      <div>
        <button onClick={play}>Play</button>
      </div>
      <div>
        <button onClick={pause}>Pause</button>
      </div>
      <InputAndAction
        initValue={'100'}
        action={(newVolume) => {
          const volume = Number(newVolume);
          if (!isNaN(volume)) {
            updateVolume(volume / 100);
          }
        }}
      >
        UpdateVolume
      </InputAndAction>
      <InputAndAction
        initValue={'1'}
        action={(newRateSpeed) => {
          const speedRate = Number(newRateSpeed);
          if (!isNaN(speedRate)) {
            updateSpeedRate(speedRate);
          }
        }}
      >
        UpdateSpeedRate
      </InputAndAction>
      <InputAndAction
        initValue={'0'}
        action={(seekTime) => {
          const st = Number(seekTime);
          if (!isNaN(st)) {
            seek(st);
          }
        }}
      >
        FastSeek
      </InputAndAction>
      <div className={styles.audioPlayer} style={{ marginTop: '12px' }}>
        <Icon
          type={playing ? EIconType.Pause : EIconType.Play}
          className={styles.playPauseBtn}
          onClick={playing ? pause : play}
        />
        <div className={styles.progressBar} onClick={jump} ref={progressBarRef}>
          <Slider percent={(currentTime / duration) * 100} />
        </div>
        <span className={styles.right}>{`${formatTime(currentTime, ETimeUnit.SECOND)} / ${formatTime(
          duration,
          ETimeUnit.SECOND
        )}`}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
