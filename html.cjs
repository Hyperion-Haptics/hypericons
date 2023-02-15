function generateHTML() {
	console.log("Generating HTML");
	const manifest = require("./fonts/manifest.json");
	const fs = require("fs");
	const path = require("path");

	const html = fs.readFileSync("./index.html", "utf8");

	/*
    manifest.icons is an object with keys and class
        <i class="hi-pencil"></i>
    */
	let htmlIcons = "";
	for (const key in manifest.icons) {
		htmlIcons += `<button id="${manifest.icons[key].class
			.replace("hi-", "")
			.replace("-", " ")}" onclick="selectIcon('${
			manifest.icons[key].class
		}')" class="icon"><i class="${
			manifest.icons[key].class
		}"></i><span class='icontitle'>${manifest.icons[key].class.replace(
			"hi-",
			""
		)}</span></button>\n`;
	}
	let htmlContent = `

    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./fonts/hypericons.css">
    <link rel="stylesheet" href="./main.css">
    <script src="./web.js">


    </script>

</head>

<body>
<header>
    <div class="search">
        <input oninput="search(event)" id="search" type="text" placeholder="Search for an icon">
    </div>
    <div class="color" style="background: var(--base)">
        <input oninput="baseColor(event)" id="base" type="color" value="#162A48">
    </div>
    <div class="color" style="background: var(--accent)">
        <input oninput="accentColor(event)" id="accent" type="color" value="#868a9c">
    </div>
</header>
<div id="main">
    <div id="icons">

        ${htmlIcons}

        </div>
        <div id="iconmodal">
            <button id="closemodal" onclick="closeModal()">
                <i class="hi-x"></i>
            </button>
            <div id="currentIcon">
            </div>
            <div id="iconName"></div>
            <div>
                <button id="downloadBtn"><i class="hi-import-mono"></i>Download SVG</button>
                <button id="copyBtn"><i class="hi-copy-mono"></i>Copy</button>
            </div>
        </div>
    </div>
</body>

</html>
    `;
	fs.writeFileSync("./index.html", htmlContent);
}
module.exports = generateHTML;

String.prototype.capitalize = function () {
	var s = this.split(" ")
		.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
	return s;
};
