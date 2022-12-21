//iterate through every svg file in the icons folder and remove the color of #000026 from it, writing back to the file in a "new icons" fodler
var fs = require("fs");
var path = require("path");
var files = fs.readdirSync("./icons");
var newFiles = fs.readdirSync("./newIcons");
//iterate through every svg file in the icons folder and remove style tag setting the fill color of #000026 from it, writing back to the original file
files.forEach(function (file) {
	var filePath = path.join("./icons", file);
	var fileContents = fs.readFileSync(filePath, "utf8");
	var newFileContents = fileContents.replace(/fill="#000026"/g, "");
	fs.writeFileSync(filePath, newFileContents);
});
files.forEach(function (file) {
	var filePath = path.join("./icons", file);
	var newFilePath = path.join("./newIcons", file);
	var fileContents = fs.readFileSync(filePath, "utf8");
	var newFileContents = fileContents.replace(/style="fill: #000026"/g, "");
	fs.writeFileSync(newFilePath, newFileContents);
});
