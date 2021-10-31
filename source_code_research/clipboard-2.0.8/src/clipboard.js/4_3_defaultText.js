class Clipboard extends Emitter {
  // ...

  defaultText(trigger) {
    return getAttributeValue('text', trigger);
  }

  // ...
}

export default Clipboard;
