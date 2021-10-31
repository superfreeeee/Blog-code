function getAttributeValue(suffix, element) {
  const attribute = `data-clipboard-${suffix}`;

  if (!element.hasAttribute(attribute)) {
    return;
  }

  return element.getAttribute(attribute);
}

class Clipboard extends Emitter {
  // ...

  defaultAction(trigger) {
    return getAttributeValue('action', trigger);
  }

  // ...
}

export default Clipboard;
