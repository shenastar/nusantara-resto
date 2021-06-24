const swRegister = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('../sw.js');
    });
  } else {
    console.log('gagal sw');
  }
};

export default swRegister;
