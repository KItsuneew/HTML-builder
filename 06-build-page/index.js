const fs = require('node:fs');
const path = require('node:path');

const pathForProject = path.join(__dirname, 'project-dist');

const pathForComp = path.join(__dirname, 'components');
const pathTemplateHtml = path.join(__dirname, 'template.html');
const pathHtmlFile = path.join(pathForProject, 'index.html');

const pathForAssetsFolder = path.join(__dirname, 'assets');
const pathForCopyAssetsFolder = path.join(pathForProject, 'assets');

const pathForCssFolder = path.join(__dirname, 'styles');
const pathForCssBundler = path.join(pathForProject, 'style.css');

const arrTemp = [];

function createFolderProject() {
  try {
    fs.promises.mkdir(pathForProject);
    newHtml();
    copyAssets(pathForAssetsFolder, pathForCopyAssetsFolder);
    mergeStyles();
  } catch (err) {
    console.log(err);
  }
}

function createrBundles(arr) {
  fs.promises.writeFile(pathForCssBundler, arr.join('\n')).then(() => {});
}

function mergeStyles() {
  fs.promises
    .readdir(pathForCssFolder, { withFileTypes: true })
    .then((data) => {
      data.forEach((el) => {
        const pathElement = path.join(pathForCssFolder, el.name);
        if (el.isFile() && path.extname(el.name) === '.css') {
          fs.promises.readFile(pathElement, 'utf-8').then((dt) => {
            arrTemp.push(dt);
            createrBundles(arrTemp);
          });
        }
      });
    });
}

async function copyAssets(pathForAssetsFolder, pathForCopyAssetsFolder) {
  await fs.promises.rm(pathForCopyAssetsFolder, {
    recursive: true,
    force: true,
  });
  await fs.promises.mkdir(pathForCopyAssetsFolder, { recursive: true });

  await fs.promises
    .readdir(pathForAssetsFolder, {
      withFileTypes: true,
    })
    .then((el) => {
      el.map((elem) => {
        const oldFile = path.join(pathForAssetsFolder, elem.name);
        const newFile = path.join(pathForCopyAssetsFolder, elem.name);
        if (elem.isDirectory()) {
          fs.promises.mkdir(path.join(newFile)).then(() => {
            copyAssets(oldFile, newFile);
          });
        } else {
          fs.promises.copyFile(oldFile, newFile);
        }
      });
    });
}
function newHtml() {
  fs.promises.readdir(pathForComp, { withFileTypes: true }).then((el) => {
    fs.promises.readFile(pathTemplateHtml, 'utf-8').then((namesComponent) => {
      el.map((file) => {
        const nameCompt = path.parse(file.name).name;
        const pathCompt = path.join(pathForComp, file.name);

        fs.promises.readFile(pathCompt, 'utf-8').then((filesReader) => {
          namesComponent = namesComponent.replaceAll(
            `{{${nameCompt}}}`,
            filesReader,
          );
          fs.promises.writeFile(pathHtmlFile, namesComponent);
        });
      });
    });
  });
}

createFolderProject();
