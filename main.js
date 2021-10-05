const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.json());

// get container
const container = require('./src/container');
const router = require('./src/routes');

// enable routes
router(app, container);

// start server
app.listen(app.get("port"), () => {
    console.log("Server running on port: ", app.get("port"));
});