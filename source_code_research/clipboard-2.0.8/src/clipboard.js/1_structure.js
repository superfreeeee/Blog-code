import Emitter from 'tiny-emitter';
import listen from 'good-listener';
import ClipboardActionDefault from './actions/default';
import ClipboardActionCut from './actions/cut';
import ClipboardActionCopy from './actions/copy';

function getAttributeValue(suffix, element) {/* ... */}

class Clipboard extends Emitter {
  constructor(trigger, options) {/* ... */}
  resolveOptions(options = {}) {/* ... */}
  listenClick(trigger) {/* ... */}
  onClick(e) {/* ... */}
  defaultAction(trigger) {/* ... */}
  defaultTarget(trigger) {/* ... */}
  static copy(target, options = { container: document.body }) {/* ... */}
  static cut(target) {/* ... */}
  static isSupported(action = ['copy', 'cut']) {/* ... */}
  defaultText(trigger) {/* ... */}
  destroy() {/* ... */}
}

export default Clipboard;
