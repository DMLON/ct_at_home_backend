#! C:\Users\damia\AppData\Local\Microsoft\WindowsApps\python3.7.exe
import os
from pathlib import Path

CURRENT_FOLDER = Path(__file__).parent
from google_images_search import GoogleImagesSearch

with open(CURRENT_FOLDER / "api_key","r") as file:
    api_key = file.read()

with open(CURRENT_FOLDER / "programmable_search_key","r") as file:
    cx_key = file.read()

gis = GoogleImagesSearch(api_key, cx_key)


words = ["banana","calculator casio", "human skull", "monitor", "dog golden", "iphone x12", "femur", "bottle", "orthopedic cervical collar", "kitten", "apple fruit", "crowbar"]
products = []
import random
for idx,word in enumerate(words):
    _search_params = {
        'q': word,
        'num': 1,
        'fileType': 'jpg|png',
        'imgSize': 'MEDIUM'
    }

    # this will only search for images:
    gis.search(search_params=_search_params,path_to_dir=str(CURRENT_FOLDER / "images"),custom_image_name=word)
    products.append({"title": word,
        "price": random.randint(50,5000),
        "thumbnail": f"images/{word}.jpg",
        "id": idx+1})

import json
with open(CURRENT_FOLDER / 'products.json',"w+") as file:
    json.dump(products,file,indent=4)
