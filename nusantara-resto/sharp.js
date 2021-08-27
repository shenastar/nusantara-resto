/* eslint-disable import/no-extraneous-dependencies */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'dist/images');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target)
  .forEach((image) => {
    // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.png
    sharp(`${target}/${image}`)
      .resize(800)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
        .slice(0, -1)
        .join('.')}-large.png`));

    // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.png
    sharp(`${target}/${image}`)
      .resize(480)
      .toFile(path.resolve(__dirname, `${destination}/${image.split('.')
        .slice(0, -1)
        .join('.')}-small.png`));

    sharp(`${target}/${image}`)
      .resize(1800)
      .toFile(
        path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-main.png`),
      );
  });
