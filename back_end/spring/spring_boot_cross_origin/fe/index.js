console.log('>>> index.js loaded');

fetch('http://localhost:8080/superfree')
  .then((res) => res.text())
  .then((res) => {
    console.log(`res: ${res}`);
  });
