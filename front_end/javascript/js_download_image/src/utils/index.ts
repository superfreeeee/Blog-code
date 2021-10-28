export const downloadImgByFetch = (imgSrc: string, name: string) => {
  fetch(imgSrc)
    .then((res) => res.blob())
    .then((blob) => {
      const dataUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = name;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
};

export const downloadImgByImage = (imgSrc: string, name: string) => {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.onload = function () {
    // draw on canvas
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(image, 0, 0, image.width, image.height);

    // create dataUrl
    const dataUrl = canvas.toDataURL('image/png');

    const a = document.createElement('a');
    a.download = name;
    a.href = dataUrl;

    const event = new MouseEvent('click');
    a.dispatchEvent(event);
  };
  image.src = imgSrc;
};
