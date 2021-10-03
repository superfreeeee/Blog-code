import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type TAudioControl = {
  state: {
    duration: number;
    playing: boolean;
    currentTime: number;
    volume: number;
    muted: boolean;
    speedRate: number;
    seekingRef: MutableRefObject<boolean>;
  };
  action: {
    play: () => void;
    pause: () => void;
    seek: (targetTime: number) => void;
    updateCurrentTime: (time: number) => void;
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

  // 拖拽状态
  const seekingRef = useRef(false);

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
      if (!seekingRef.current) {
        setPlaying(false);
      }
    };
    // 时间更新
    const onTimeUpdate = () => {
      if (!seekingRef.current) {
        setCurrentTime(getCurrentTime(audio.currentTime));
      }
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

  return useMemo(
    () => ({
      state: {
        duration,
        playing,
        currentTime,
        volume,
        muted,
        speedRate,
        seekingRef,
      },
      action: {
        play,
        pause,
        seek,
        updateCurrentTime: setCurrentTime,
        updateVolume,
        updateSpeedRate,
      },
    }),
    [
      duration,
      playing,
      currentTime,
      volume,
      muted,
      speedRate,
      seekingRef,
      play,
      pause,
      seek,
      updateVolume,
      updateSpeedRate,
    ]
  );
};

export default useAudioControl;
