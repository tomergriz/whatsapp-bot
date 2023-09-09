require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const webhookController = require("./src/controllers/webhookController");
require("./config/db");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/webhook", webhookController.handleWebhook);

app.post("*", async (req, res) => {
    console.log("Received POST request:", req.body);
    res.status(200).send("OK*");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
