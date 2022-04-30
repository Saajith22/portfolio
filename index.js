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

/*const data = {
  "one": ["5IGOuGUaVx"],
  "three": ["kFYAyUXBIE"],
  "four": ["BzxMjluRmL", "xrLZyewuGZ", "CJnedPPxyl"],
  "five": ["xvBE6IeGOn", "TWPzSEZFum"],
  "six": ["YJIWFHLinF", "ZHYRBRTwnw"],
};

let keys = Object.keys(data);
const final = keys.map((k) => {
  let codes = data[k];
  let str = "";
  for (const code of codes) {
    let random = Math.floor(Math.random() * code.length);
    str += code[random];
  }

  return str;
});

console.log(final.join(""));*/

mongo
  .connect(process.env.mongo, {
    useNewUrlParser: true,
  })
  .then(console.log("Connected to DB!!"));

app.listen(process.env.port, () => console.log("App is now ready!!"));
