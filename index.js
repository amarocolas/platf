const path = require('path');
const express = require('express');

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, function () {
    console.log("Server is running on "+ port +" port");
});