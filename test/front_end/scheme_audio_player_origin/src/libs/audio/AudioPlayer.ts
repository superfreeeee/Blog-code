export interface IAudioPlayerOptions {
  autoplay?: boolean;
  controls?: boolean;
}

const defaultOptions: IAudioPlayerOptions = {
  autoplay: false,
  controls: false,
};

export default class AudioPlayer {
  private container: HTMLElement;
  private audio: HTMLAudioElement;

  constructor(opts: IAudioPlayerOptions = {}, container: HTMLElement = document.body) {
    this.container = container;
    this.audio = document.createElement('audio');

    this.container.appendChild(this.audio);
    this.handleOptions(this.audio, opts);
  }

  private handleOptions(audio: HTMLAudioElement, opts?: IAudioPlayerOptions) {
    opts = {
      ...defaultOptions,
      ...opts,
    };

    for (const prop of Reflect.ownKeys(opts)) {
      audio[prop] = opts[prop];
    }
  }

  private _canPlay: boolean = false;

  load(audioSrc: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const onCanPlay = () => {
        this._canPlay = true;
        resolve(true);
        clearListener();
      };
      const onError = () => {
        this._canPlay = false;
        resolve(false);
        clearListener();
      };
      this.audio.addEventListener('canplay', onCanPlay);
      this.audio.addEventListener('error', onError);
      const clearListener = () => {
        this.audio.removeEventListener('canplay', onCanPlay);
        this.audio.removeEventListener('error', onError);
      };

      this.audio.src = audioSrc;
    });
  }

  canPlay(): boolean {
    return this._canPlay;
  }
}
