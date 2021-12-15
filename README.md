# CT@AT Home - Backend

This repository has the backend part of a future e-commerce website that sells 3D printed products from Computerized tomography segmentations

This backend can be seen working on this glitch site // Not working currently on latest push

https://cthomeproductos.glitch.me/productos

Run with nodemon.json config to ignore local updates to products.json database

`nodemon --config nodemon.json`

## Init

Create the typescript init file with `npx tsc --init`

Set on the .env file the following settings

PORT=xxxx

HOST= url:port  // HOST of the database (For mongo only)

USER=mongodbuser

PASSWORD=mongodbPassword

DATABASE=databseName

Change between firebase and mongodb in the services/index.ts file uncommenting the line that is needed.

### Firebase

Use correct credentials for firebase changing the firebaseCredentials.js file in databse/configs/firebaseCredentials.js

### MongoDB

For mongo run mongorestore on backend folder

**Tests**

Login with user 123@123.1234 pass 123

**Deployed on heroku in**

https://ctathome.herokuapp.com/
