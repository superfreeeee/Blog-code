import React, { FC, useRef } from 'react';

import { useMount } from '@youxian/utils';
import AudioPlayer from '@libs/audio/AudioPlayer';

interface AudioPlayerProps {}

const AudioPlayerController: FC<AudioPlayerProps> = () => {
  const audioPlayerContainerRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<AudioPlayer>(null);

  useMount(async () => {
    const audio = (audioPlayerRef.current = new AudioPlayer(
      { autoplay: true, controls: true },
      audioPlayerContainerRef.current
    ));
    console.log(audio);

    const success = await audio.load('http://localhost:8080/audio/test2.mp3');
    console.log(`load success: ${success}`);
    console.log(`audio.canPlay: ${audio.canPlay()}`);
    if (!success) {
      const success = await audio.load('http://localhost:8080/audio/test1.mp3');
      console.log(`load success: ${success}`);
      console.log(`audio.canPlay: ${audio.canPlay()}`);
    }
  });

  return (
    <div ref={audioPlayerContainerRef}>
      <h1>AudioPlayer</h1>
    </div>
  );
};

export default AudioPlayerController;
