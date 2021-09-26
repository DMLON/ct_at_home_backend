import os

files = os.listdir()

for file in files:
    if '.py' in file or 'test' in file: continue
    print(file.split("."))
    name, ext = file.split(".")
    
    with open(name+".test.js","w") as file:
        file.write(f"import {name} from './{name}';")
