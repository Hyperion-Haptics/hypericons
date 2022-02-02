import json

with open('hypericons.json') as f:
   data = json.load(f)

f = open("./fonts/hypericons.css", "w")
h = open("test2.html", "w")
css = """@font-face {
    font-family: 'Hypericons';
    src:
        url('Hypericons.woff') format('woff'),
        url('Hypericons.ttf') format('truetype'),
        /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        url('Hypericons.svg') format('svg');
    /* iOS 4.1- */
    font-display: swap;
}

[class^='hi-'], [class*='hi-'] {
    font-family: 'Hypericons' !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}"""

html = """<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="./fonts/hypericons.css">
        <style>*{
            font-size: 20px;
        }
        </style>
    </head>
    <body>"""

for x in data["glyphs"]:
    print(data["glyphs"][x].replace("icons/", "").replace(".svg", ""))
    css = css + "\n.hi-" + data["glyphs"][x].replace("icons/", "").replace(".svg", "") + ":before { content: '\\" + x.replace("0x", '') + "';}"
    html = html + "\n<i class='" + "hi-" +data["glyphs"][x].replace("icons/", "").replace(".svg", "") + "'></i>"

html = html + """
    </body>
</html>"""
f.write(css)
f.close()
h.write(html)
h.close()