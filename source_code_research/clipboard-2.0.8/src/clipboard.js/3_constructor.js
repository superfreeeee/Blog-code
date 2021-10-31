class Clipboard extends Emitter {
  // ...

  constructor(trigger, options) {
    super();

    this.resolveOptions(options);
    this.listenClick(trigger);
  }

  // ...
}

export default Clipboard;
