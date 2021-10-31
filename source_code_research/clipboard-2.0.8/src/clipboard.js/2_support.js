class Clipboard extends Emitter {
  // ...

  static isSupported(action = ['copy', 'cut']) {
    const actions = typeof action === 'string' ? [action] : action;
    let support = !!document.queryCommandSupported;

    actions.forEach((action) => {
      support = support && !!document.queryCommandSupported(action);
    });

    return support;
  }

  // ...
}

export default Clipboard;
