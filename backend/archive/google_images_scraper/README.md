# Google Images scrapper - Database Generator

## Description
This script will scrape images from google images and create a json file containing a random price and path to the image

## Usage and Installation
To use this image scrapper:

`pip install Google-Images-Search`

Visit https://console.developers.google.com and create a project.

Visit https://console.developers.google.com/apis/library/customsearch.googleapis.com and enable "Custom Search API" for your project.

Visit https://console.developers.google.com/apis/credentials and generate API key credentials for your project.

Visit https://cse.google.com/cse/all and in the web form where you create/edit your custom search engine enable "Image search" option and for "Sites to search" option select "Search the entire web but emphasize included sites".
- As search sites use "*.com"

Create files api_key and programmable_search_key containing each key

Add words to the word list in the scrape.py list and run

## Issues
If using python from windows store install:

`pip install windows-curses`





