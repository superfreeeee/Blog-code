console.log('Hello World by @youxian/cli');

console.log('CustomElementRegistry', CustomElementRegistry);
if (CustomElementRegistry) {
  const createText = () => {
    // Create a class for the element
    class PopUpInfo extends HTMLElement {
      constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        var shadow = this.attachShadow({ mode: 'open' });

        // Create spans
        var wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');
        var icon = document.createElement('div');
        icon.setAttribute('class', 'icon');
        icon.setAttribute('tabindex', 0);
        var info = document.createElement('div');
        info.setAttribute('class', 'info');

        // Take attribute content and put it inside the info span
        var text = this.getAttribute('text');
        info.textContent = text;

        // Insert icon
        var imgUrl;
        if (this.hasAttribute('img')) {
          imgUrl = this.getAttribute('img');
        } else {
          imgUrl = 'img/default.png';
        }
        var img = document.createElement('img');
        img.src = imgUrl;
        icon.appendChild(img);

        // Create some CSS to apply to the shadow dom
        var style = document.createElement('style');

        style.textContent = `
        .wrapper {
          position: relative;
          display: inline-block;
        }
        .icon {
          height: 100%;
        }
        .info {
          position: absolute;
          bottom: 20px;
          right: -10px;
          display: inline-block;
          width: 200px;
          padding: 10px;
          border: 1px solid black;
          border-radius: 10px;
          transform: translateX(100%);
          transition: 0.6s all;
          background: white;
          opacity: 0;
          font-size: 0.8rem;
          z-index: 3;
        }
        img {
          width: 2rem
        }
        .icon:hover + .info,
        .icon:focus + .info {
          opacity: 1;
        }
        `;

        // attach the created elements to the shadow dom

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(icon);
        wrapper.appendChild(info);
      }

      connectedCallback() {
        console.log(`[onMount] call connectedCallback`);
      }

      disconnectedCallback() {
        console.log(`[onDestroy] call disconnectedCallback`);
      }

      adoptedCallback() {
        console.log(`[onMove] call adoptedCallback`);
      }

      attributeChangedCallback(...props) {
        console.log(`[onUpdate] call attributeChangedCallback`, props);
      }
    }

    // Define the new element
    customElements.define('popup-info', PopUpInfo);
  };

  createText();

  const lifecycleTest = () => {
    // Create a class for the element
    class Square extends HTMLElement {
      // Specify observed attributes so that
      // attributeChangedCallback will work
      static get observedAttributes() {
        return ['c', 'l'];
      }

      constructor() {
        // Always call super first in constructor
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const div = document.createElement('div');
        const style = document.createElement('style');
        shadow.appendChild(style);
        shadow.appendChild(div);
      }

      connectedCallback() {
        console.log('Custom square element added to page.');
        updateStyle(this);
      }

      disconnectedCallback() {
        console.log('Custom square element removed from page.');
      }

      adoptedCallback() {
        console.log('Custom square element moved to new page.');
      }

      attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
        console.log(name, oldValue, newValue);
        updateStyle(this);
      }
    }

    customElements.define('custom-square', Square);

    function updateStyle(elem) {
      const shadow = elem.shadowRoot;
      shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      background-color: ${elem.getAttribute('c')};
    }
  `;
    }

    const add = document.querySelector('.add');
    const update = document.querySelector('.update');
    const remove = document.querySelector('.remove');
    let square;

    update.disabled = true;
    remove.disabled = true;

    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    add.onclick = function () {
      // Create a custom square element
      square = document.createElement('custom-square');
      square.setAttribute('l', '100');
      square.setAttribute('c', 'red');
      insertAfter(
        square,
        document.querySelectorAll('h1')[1].nextElementSibling
      );

      update.disabled = false;
      remove.disabled = false;
      add.disabled = true;
    };

    update.onclick = function () {
      // Randomly update square's attributes
      square.setAttribute('l', random(50, 200));
      square.setAttribute(
        'c',
        `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
      );
    };

    remove.onclick = function () {
      // Remove the square
      square.remove();

      update.disabled = true;
      remove.disabled = true;
      add.disabled = false;
    };
  };

  lifecycleTest();

  const templateAndSlotTest = () => {
    class ElementDetails extends HTMLElement {
      constructor() {
        super();

        const template = document.getElementById(
          'element-details-template'
        ).content;

        const shadowRoot = this.attachShadow({ mode: 'closed' }).appendChild(
          template.cloneNode(true)
        );
        this._root = shadowRoot;
      }
    }
    customElements.define('element-details', ElementDetails);
  };

  templateAndSlotTest();
}

function insertAfter(element, targetNode) {
  const parent = targetNode.parentNode;
  if (parent.lastChild === targetNode) {
    parent.appendChild(element);
  } else {
    parent.insertBefore(element, targetNode.nextSibling);
  }
}
