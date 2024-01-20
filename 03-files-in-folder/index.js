const fs = require('node:fs');
const path = require('node:path');
const pathForFolder = path.join(__dirname, 'secret-folder');

fs.promises.readdir(pathForFolder, { withFileTypes: true }).then((data) => {
  data.forEach((el) => {
    const pathFiles = path.join(pathForFolder, el.name);
    if (el.isFile()) {
      const fileName = path.basename(el.name, path.extname(el.name));
      const fileExt = path.extname(el.name);
      let fileSize = 0;
      fs.promises.stat(pathFiles).then((stats) => {
        fileSize = stats.size / 1024;
        console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
      });
    }
  });
});
