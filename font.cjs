const SVGIcons2SVGFontStream = require("svgicons2svgfont");
const fs = require("fs");
const path = require("path");
var svg2ttf = require("svg2ttf");
var ttf2woff = require("ttf2woff");
var ttf2woff2 = require("ttf2woff2");
var ttf2eot = require("ttf2eot");

const fontStream = new SVGIcons2SVGFontStream({
	fontName: "Hypericons",
	normalize: true,
	fontHeight: 1000,
	fixedWidth: true,
	preserveAspectRatio: true,
});
function decimalToHex(d) {
	var hex = Number(d).toString(16);
	hex = "0000".substr(0, 4 - hex.length) + hex;
	return hex;
}

String.prototype.replaceArray = function (find, replace) {
	var replaceString = this;
	for (var i = 0; i < find.length; i++) {
		replaceString = replaceString.replace(find[i], replace[i] || replace);
	}
	return replaceString;
};

let startUnicode = 0xea01;
let srcPath = path.resolve(process.cwd(), "icons");
let destPath = path.resolve(process.cwd(), "fonts");
let tempPath = path.resolve(process.cwd(), "TEMP");

let manifest = {
	fontName: "Hypericons",
	prefix: "hi-",
	icons: {},
};

fontStream
	.pipe(fs.createWriteStream("fonts/hypericons.svg"))
	.on("finish", function () {
		console.log("Font successfully created!");
	})
	.on("error", function (err) {
		console.log(err);
	});

function writeFontStream(svgPath) {
	// file name
	let _name = path.basename(svgPath, ".svg");
	const glyph = fs.createReadStream(svgPath);
	var unicode = startUnicode++;
	glyph.metadata = {
		unicode: [String.fromCharCode(unicode)],
		name: _name,
	};
	fontStream.write(glyph);
	return unicode;
}

//if temp path exists, delete it. then create it
if (fs.existsSync(tempPath)) {
	fs.rmSync(tempPath, {
		recursive: true,
	});
}
fs.mkdirSync(tempPath);

fs.readdirSync(srcPath).forEach((file) => {
	let filePath = path.join(srcPath, file);
	let fileContents = fs.readFileSync(filePath, "utf8").replace(/\n/g, "");
	//get every path in the svg file that has a blue fill
	let paths = fileContents.match(
		/<(path|rect|circle|ellipse|line|polyline|polygon).*?\/>/g
	);
	let noStylePaths = paths.filter((path) => !path.includes("style"));
	let bluePaths = paths.filter((path) => path.includes("style"));
	if (bluePaths.length > 0) {
		//create a new svg file with only the blue paths by removing the nostylepaths from the original file
		console.log(path.basename(file, ".svg"));
		let accentPathFile = fileContents.replaceArray(noStylePaths, "");
		//write accent path file to temp folder with suffix -accent
		fs.writeFileSync(
			path.join(tempPath, `${path.basename(file, ".svg")}-accent.svg`),
			accentPathFile
		);

		//create a new svg file with only the nostyle paths
		let noStylePathFile = fileContents.replaceArray(bluePaths, "");
		//write nostyle path file to temp folder suffix -base
		fs.writeFileSync(
			path.join(tempPath, `${path.basename(file, ".svg")}-base.svg`),
			noStylePathFile
		);

		//write the base path file to font stream
		var baseUnicode = writeFontStream(
			path.join(tempPath, `${path.basename(file, ".svg")}-base.svg`)
		);
		//write the accent path file to font stream
		var accentUnicode = writeFontStream(
			path.join(tempPath, `${path.basename(file, ".svg")}-accent.svg`)
		);

		//add the base and accent unicode to the manifest
		manifest.icons[path.basename(file, ".svg")] = {
			class: manifest.prefix + path.basename(file, ".svg"),
			base: "\\" + decimalToHex(baseUnicode),
			accent: "\\" + decimalToHex(accentUnicode),
		};
	} else {
		//create a new svg file with only the blue paths by removing the nostylepaths from the original file
		console.log(path.basename(file, ".svg"));
		//create a new svg file with only the nostyle paths
		let noStylePathFile = fileContents;
		//write nostyle path file to temp folder suffix -base
		fs.writeFileSync(
			path.join(tempPath, `${path.basename(file, ".svg")}-base.svg`),
			noStylePathFile
		);

		//write the base path file to font stream
		var baseUnicode = writeFontStream(
			path.join(tempPath, `${path.basename(file, ".svg")}-base.svg`)
		);

		//add the base and accent unicode to the manifest
		manifest.icons[path.basename(file, ".svg")] = {
			class: manifest.prefix + path.basename(file, ".svg"),
			base: "\\" + decimalToHex(baseUnicode),
		};
	}
});

setTimeout(() => {
	fontStream.end();
	fs.writeFileSync("fonts/manifest.json", JSON.stringify(manifest, null, 2));
	//delete temp folder
	fs.rmSync(tempPath, { recursive: true });
	//run "generate html" in html.cjs
	var generateHTML = require("./html.cjs");
	generateHTML();
}, 1000);

setTimeout(() => {
	//svg font to ttf
	var ttf = svg2ttf(fs.readFileSync("fonts/hypericons.svg", "utf8"), {});
	fs.writeFileSync("fonts/hypericons.ttf", Buffer.from(ttf.buffer));

	//ttf to woff
	var woff = ttf2woff(new Uint8Array(ttf.buffer), {});
	fs.writeFileSync("fonts/hypericons.woff", Buffer.from(woff.buffer));

	//ttf to woff2
	var woff2 = ttf2woff2(new Uint8Array(ttf.buffer), {});
	fs.writeFileSync("fonts/hypericons.woff2", Buffer.from(woff2.buffer));

	//ttf to eot
	var eot = ttf2eot(new Uint8Array(ttf.buffer), {});
	fs.writeFileSync("fonts/hypericons.eot", Buffer.from(eot.buffer));

	//generate css file
	var utcTimestamp = new Date().getTime();
	let css = `@font-face {
		font-family: "Hypericons";
		src: url('Hypericons.eot?t=${utcTimestamp}');
		/* IE9*/
		src: url('Hypericons.eot?t=${utcTimestamp}#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url("Hypericons.woff2?t=${utcTimestamp}") format("woff2"),
			url("Hypericons.woff?t=${utcTimestamp}") format("woff"),
			url('Hypericons.ttf?t=${utcTimestamp}') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
			url('Hypericons.svg?t=${utcTimestamp}#Hypericons') format('svg');
		/* iOS 4.1- */
	}
	
	[class^="hi-"],
	[class*=" hi-"] {
		position: relative;
		display: inline-block;
		font-family: 'Hypericons' !important;
		font-size: 24px;
		width: 1em;
		height: 1em;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	[class^="hi-"]:before,
	[class*=" hi-"]:before,
	[class^="hi-"]:after,
	[class*=" hi-"]:after {
		width: 1em;
		height: 1em;
		position: absolute;
		left: 0;
	}
	
[class^="hi-"]:before,
[class*=" hi-"]:before {
    color: var(--hi-accent, inherit);
}

[class^="hi-"]:after,
[class*=" hi-"]:after {
    color: var(--hi-base, inherit);
}`;

	for (const [key, value] of Object.entries(manifest.icons)) {
		css += `
	.${value.class}:after {content: "${value.base}";}`;
		if (value.accent) {
			css += `
		.${value.class}:before {content: "${value.accent}";}`;
		}
	}

	fs.writeFileSync("fonts/hypericons.css", css);
}, 2000);
