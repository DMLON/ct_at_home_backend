# CT@AT Home - Backend

This repository has the backend part of a future e-commerce website that sells 3D printed products from Computerized tomography segmentations

Run with nodemon.json config to ignore local updates to products.json database

`nodemon --config nodemon.json`

Currently this proyect was made using MongoDB as the persistance for session, as well as main database, using mongoose as driver. The project contains endpoints for login, signup using passport local, CRUD for products, CRUD for carts and purchase option with an email and phone alert using nodemailer and twillio respectively. It also contains a Websocket server embedded in /api/messages using express-ws with a test site on that route.

Frontend proyect currently incomplete.

## Init

Create the typescript init file with `npx tsc --init`

Set on the .env file the following settings

PORT=xxxx

MONGODB_URI= // MongoDB URL
SECRET= // Cookies secret
NODE_ENV=development or production

ADMIN_PHONE= // Admin phone
ADMIN_EMAIL= // Admin email
ADMIN_EMAIL_PASS= // admin email password

TWILIO_AUTH_TOKEN=
TWILIO_ACCOUNT_SID=
TWILIO_PHONE=

SESSION_AGE_SECONDS= 0 // time for session to expire

### MongoDB

For mongo run mongorestore on backend folder

**Tests**

Login with user 123@123.1234 pass 123

## Heroku Deploy API

Currently the API is hosted in heroku with it's endpoints at https://ctathome.herokuapp.com/
