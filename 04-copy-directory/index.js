const fs = require('node:fs');
const path = require('node:path');

const pathForFolderElement = path.join(__dirname, 'files');
const pathForFolderCopy = path.join(__dirname, 'files-copy');

async function copyFolder() {
  await fs.promises.rm(pathForFolderCopy, { force: true, recursive: true });
  await fs.promises.mkdir(pathForFolderCopy, { recursive: true });

  const currentFiles = await fs.promises.readdir(
    pathForFolderElement,
    { withFileTypes: true },
    () => {},
  );

  currentFiles.forEach((el) => {
    const oldFile = path.join(pathForFolderElement, el.name);
    const newFile = path.join(pathForFolderCopy, el.name);
    fs.promises.copyFile(oldFile, newFile);
  });
}
copyFolder();
