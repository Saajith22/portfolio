require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  res.render(path.join(__dirname, "public", "views", "index.ejs"));
});

app.listen(process.env.port, () => console.log("App is now ready!!"));
