require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mongo = require("mongoose");
const fs = require("fs");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  res.render(path.join(__dirname, "public", "views", "index.ejs"));
});

app.get("/projects", async (req, res) => {
  res.render(path.join(__dirname, "public", "views", "projects.ejs"));
});

fs.readdirSync("./routes").forEach((route) => {
  const router = require(`./routes/${route}`);

  route = route.replace(".js", "");
  app.use(`/projects/${route}/`, router);
  console.log(`Project Route Loaded: ${route}`);
});

mongo
  .connect(process.env.mongo, {
    useNewUrlParser: true,
  })
  .then(console.log("Connected to DB!!"));

app.listen(process.env.port, () => console.log("App is now ready!!"));
