const express = require('express');
const { default: Container } = require('./contenedor');

const app = express();
const db = Container()
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`HTTP Server listening on port ${server.address().port}`);
})
