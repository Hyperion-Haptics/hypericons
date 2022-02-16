const svgtofont = require("svgtofont");
const path = require("path");
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