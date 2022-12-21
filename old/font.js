const svgtofont = require("svgtofont");
const path = require("path");
svgtofont({
	src: path.resolve(process.cwd(), "icons"), // svg path
	dist: path.resolve(process.cwd(), "fonts"), // output path
	fontName: "Hypericons", // font name
	classNamePrefix: "hi",
	css: true, // Create CSS files.
	startUnicode: 0xea01, // unicode start number
	website: null,
	generateInfoData: true,
	svgicons2svgfont: {
		fontHeight: 1000,
		normalize: true,
	},
}).then(() => {
	console.log("done!");
});
