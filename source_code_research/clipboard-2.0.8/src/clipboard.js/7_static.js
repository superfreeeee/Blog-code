class Clipboard extends Emitter {
  // ...

  static copy(target, options = { container: document.body }) {
    return ClipboardActionCopy(target, options);
  }

  static cut(target) {
    return ClipboardActionCut(target);
  }

  // ...
}

export default Clipboard;
