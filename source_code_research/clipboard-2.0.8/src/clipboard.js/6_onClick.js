class Clipboard extends Emitter {
  // ...

  onClick(e) {
    const trigger = e.delegateTarget || e.currentTarget;
    const selectedText = ClipboardActionDefault({
      action: this.action(trigger),
      container: this.container,
      target: this.target(trigger),
      text: this.text(trigger),
    });

    // Fires an event based on the copy operation result.
    this.emit(selectedText ? 'success' : 'error', {
      action: this.action,
      text: selectedText,
      trigger,
      clearSelection() {
        if (trigger) {
          trigger.focus();
        }
        document.activeElement.blur();
        window.getSelection().removeAllRanges();
      },
    });
  }

  // ...
}

export default Clipboard;
