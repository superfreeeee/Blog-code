const box = document.querySelector('.block');

let left = Number.parseInt(getComputedStyle(box).left);

const renderBox = () => {
  left += 30;
  if (left >= 1600) {
    left = 0;
  }
  box.style.left = `${left}px`;
};

const renderByInterval = (delay = 10) => {
  setInterval(renderBox, delay);
};

const renderByRAF = () => {
  let raf;
  let lastTime = performance.now();
  const delay = 150;

  // 首次渲染
  requestAnimationFrame((t) => {
    lastTime = t;
    console.log('first render', t);
    renderBox();
  });

  // 后续渲染
  let render = (currentTime) => {
    // 首次渲染后延迟
    if (currentTime - lastTime > delay) {
      console.log('render', currentTime);
      renderBox();

      render = (time) => {
        console.log('render', time);
        // 后续渲染
        renderBox();
        raf = requestAnimationFrame(render);
      };
    }
    raf = requestAnimationFrame(render);
  };
  raf = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(raf);
  };
};

// renderByInterval();
// renderByRAF();

let cancelFn = null;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && !cancelFn) {
    cancelFn = renderByRAF();
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight' && cancelFn) {
    cancelFn();
    cancelFn = null;
  }
});
