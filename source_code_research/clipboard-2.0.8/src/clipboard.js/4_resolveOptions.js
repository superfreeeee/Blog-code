class Clipboard extends Emitter {
  // ...

  resolveOptions(options = {}) {
    // 操作
    this.action =
      typeof options.action === 'function'
        ? options.action
        : this.defaultAction;
    // 目标
    this.target =
      typeof options.target === 'function'
        ? options.target
        : this.defaultTarget;
    // 文本
    this.text =
      typeof options.text === 'function' ? options.text : this.defaultText;
    // 容器
    this.container =
      typeof options.container === 'object' ? options.container : document.body;
  }

  // ...
}

export default Clipboard;
