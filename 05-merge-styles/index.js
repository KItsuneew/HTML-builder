const fs = require('node:fs');
const path = require('node:path');
const pathForStyle = path.join(__dirname, 'styles');
const pathForBundle = path.join(__dirname, 'project-dist/bundle.css');
const arrTemp = [];

function createrBundles(arr) {
  fs.promises
    .writeFile(pathForBundle, arr.join('\n'))
    .then((_) => {
      console.log('success');
    })
    .catch((err) => {
      console.log(err);
    });
}

fs.promises.readdir(pathForStyle, { withFileTypes: true }).then((data) => {
  data.forEach((el) => {
    const pathElement = path.join(pathForStyle, el.name);
    if (el.isFile() && path.extname(el.name) === '.css') {
      fs.promises.readFile(pathElement, 'utf-8').then((dt) => {
        arrTemp.push(dt);
        createrBundles(arrTemp);
        console.log(arrTemp);
      });
    }
  });
});
