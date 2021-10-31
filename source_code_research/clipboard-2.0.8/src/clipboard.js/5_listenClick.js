class Clipboard extends Emitter {
  // ...

  listenClick(trigger) {
    this.listener = listen(trigger, 'click', (e) => this.onClick(e));
  }

  destroy() {
    this.listener.destroy();
  }

  // ...
}

export default Clipboard;
