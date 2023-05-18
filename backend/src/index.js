const express = require("express");
const cors = require('cors')
const authController = require("./controllers/auth.controller")


const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/auth", authController);

module.exports = app;


