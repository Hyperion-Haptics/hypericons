const svgtofont = require("svgtofont");
const path = require("path");

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
  }
}).then(() => {
  console.log('done!');
});;