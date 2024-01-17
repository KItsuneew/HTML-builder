const path = require('node:path');
const fs = require('node:fs');
const pth = path.join(__dirname, './text.txt');
const readStream = fs.createReadStream(pth, 'utf-8');
readStream.on('data', (ch) => {
  console.log(ch.toString());
});
