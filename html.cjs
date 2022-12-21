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
		htmlIcons += `<div id="${manifest.icons[key].class
			.replace("hi-", "")
			.replace("-", " ")}" onclick="copyString('${
			manifest.icons[key].class
		}')" class="icon"><i class="${
			manifest.icons[key].class
		}"></i><span>${manifest.icons[key].class.replace(
			"hi-",
			""
		)}</span></div>\n`;
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
            <input oninput="search(event)" id="search" type="text" placeholder="Search">
        </div>
        <div class="color">
            <input oninput="baseColor(event)" id="base" type="color" value="#162A48">
        </div>
        <div class="color">
            <input oninput="accentColor(event)" id="accent" type="color" value="#868a9c">
        </div>
    </header>
    <div id="icons">

        ${htmlIcons}

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
