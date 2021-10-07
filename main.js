const express = require("express");
const { scopePerRequest, loadControllers } = require('awilix-express');

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.json());

// get container
const container = require('./src/container');

// register container
app.use(scopePerRequest(container));
app.use(loadControllers('src/controller/*.js', { cwd: __dirname }));

// start server
app.listen(app.get("port"), () => {
    console.log("Server running on port: ", app.get("port"));
});