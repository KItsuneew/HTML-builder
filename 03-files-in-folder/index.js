const fs = require('node:fs');
const path = require('node:path');
const pathForFolder = path.join(__dirname, './secret-folder');
fs.readdir(pathForFolder, { withFileTypes: true }, function (err, arg) {
  if (err) throw err;

  arg.forEach((el) => {
    fs.stat(__filename, (_, stats) => {
      if (el.isFile()) {
        console.log(
          `${path.basename(el.name, path.extname(el.name))} - ${path.extname(
            el.name,
          )} - ${stats.size}kb`,
        );
      }
    });
  });
});
