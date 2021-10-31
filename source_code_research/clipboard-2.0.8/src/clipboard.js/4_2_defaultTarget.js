class Clipboard extends Emitter {
  // ...

  defaultTarget(trigger) {
    const selector = getAttributeValue('target', trigger);

    if (selector) {
      return document.querySelector(selector);
    }
  }

  // ...
}

export default Clipboard;
