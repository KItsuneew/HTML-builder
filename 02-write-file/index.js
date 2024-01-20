const fs = require('node:fs');
const path = require('node:path');
const { stdin, stdout } = require('node:process');
const pathForFile = path.join(__dirname, 'text.txt');
const otp = fs.createWriteStream(pathForFile);

stdout.write('Hello \n');
stdin.on('data', (ch) => {
  if (ch.toString().includes('exit')) {
    process.exit();
  }
  otp.write(ch);
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Good luck and productive learning'));
