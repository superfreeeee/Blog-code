console.log('Hello World - powered by @youxian/cli');

const custom = document.querySelector('.custom');
const disabled = document.querySelector('.disabled');

const customMenu = document.querySelector('.custom-context-menu-template');

const openCustomContextMenu = ({ left, top }) => {
  const node = customMenu.content.cloneNode(true);

  const ul = node.firstElementChild;
  ul.style.left = `${left}px`;
  ul.style.top = `${top}px`;

  document.body.appendChild(node);

  let removed = false;
  const close = () => {
    if (!removed) {
      document.body.removeChild(ul);
      removed = true;
    }
  };

  return { ul, close };
};

custom.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  const { clientX, clientY } = e;
  const { ul, close } = openCustomContextMenu({ left: clientX, top: clientY });

  const onClickOutside = (e) => {
    let node = e.target;
    let isOutside = true;
    while (node !== document.body) {
      if (node === ul) {
        isOutside = false;
        break;
      }
      node = node.parentNode;
    }

    if (isOutside) {
      close();
      document.removeEventListener('mousedown', onClickOutside);
    }
  };
  document.addEventListener('mousedown', onClickOutside);
});
disabled.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
disabled.addEventListener('mousedown', (e) => {
  if (e.button === 2) {
    console.log(`open contextmenu`);
  }
});
