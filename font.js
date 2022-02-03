const svgtofont = require("svgtofont");
const path = require("path");
const { scale } = require('scale-that-svg')

const fs = require('fs');
const directoryPath = path.join(__dirname, 'icons');
fs.readdir(directoryPath, function (err, files) {
  //listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    fs.readFile("./icons/" + file, 'utf8', (err, data) => {
      scale(data, { scale: 100 }).then((scaled) => {
        fs.writeFile("./icons/" + file, scaled, err => {
          if (err) {
            console.error(err)
            return
          }
          //file written successfully
        })
      })
    })
  })
  setTimeout(() => {
    svgtofont({
      src: path.resolve(process.cwd(), "icons"), // svg path
      dist: path.resolve(process.cwd(), "fonts"), // output path
      fontName: "Hypericons", // font name
      classNamePrefix: "hi",
      css: true, // Create CSS files.
      startUnicode: 0xea01, // unicode start number
      // website = null, no demo html files
      website: {
        title: "Hypericons",
        logo: path.resolve(process.cwd(), "svg", "git.svg"),
        version: "0",
      }
    }).then(() => {
      console.log('done!');
    });
  }, 100);
})