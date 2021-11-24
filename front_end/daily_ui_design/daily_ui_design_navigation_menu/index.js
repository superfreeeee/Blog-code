const menu = document.querySelector('.menu');

const items = [
  'home-outline',
  'person-outline',
  'settings-outline',
  'mail-outline',
  'key-outline',
  'videocam-outline',
  'game-controller-outline',
  'camera-outline',
];

items.forEach((type, i) => {
  const li = document.createElement('li');
  li.style = `--i: ${i}`;
  li.innerHTML = `<a><ion-icon name="${type}"></ion-icon></a>`;

  menu.appendChild(li);
});

const toggle = document.querySelector('.toggle');

let disable = false;

toggle.addEventListener('click', () => {
  // menu.classList.toggle('active');
  if (!disable) {
    disable = true;
    menu.classList.toggle('active');
    setTimeout(() => {
      disable = false;
    }, 1300);
  }
});
