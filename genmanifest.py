from os import listdir
import json
a_file = open("hypericons.json", "r")

json_object = json.load(a_file)

a_file.close()

print(json_object)

i = 57344

nextJson = {}

for x in listdir("./icons/"):
    nextJson[hex(i)] = "icons/" + x
    i += 1



json_object["glyphs"] = nextJson


a_file = open("hypericons.json", "w")

json.dump(json_object, a_file)

a_file.close()




print(hex(57344))