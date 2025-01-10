// Web application server
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { databaseBridge } = require("./database");
const app = express();

app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Server host and port
const port = process.env.PORT;
const host = process.env.HOST;

// Log statement to confirm server operation
app.listen(port, () => {
  console.log(`trial listening on ${host}:${port}`);
});

// GET routes
app.get("/", async (req, res) => {
  const message = await databaseBridge("handshake");
  res.status(200).send(message);
});

// const fs = require("fs");
// const path = require("path");

// app.get("/professional", (req, res) => {
//   const filePath = path.join(__dirname, "database/user.json");
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Error reading file");
//     }
//     const jsonData = JSON.parse(data);
//     res.json(jsonData[0]);
//   });
// });

app.get("/professional", async (req, res) => {
  const message = await databaseBridge("request");
  res.status(200).send(message);
});
