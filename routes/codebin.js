const express = require("express");
const router = express.Router();
const path = require("path");
const bins = require("../models/bins.js");

const projectName = "CodeBin";

router.get("/", async (req, res) => {
  if (req.query.error) {
    res.render(
      path.join(__dirname, "..", "public", "views", "code-bin", "error.ejs"),
      {
        projectName,
        error: req.query.error,
      }
    );
    return;
  }

  let { title, description, code } = req.query;
  if (!title) title = "No-Title";
  if (!description) description = "No-Description";

  if (title && description && code) {
    let id = await addBin(title, description, code);
    return res.redirect(`/projects/codebin/${id}`);
  }

  res.render(
    path.join(__dirname, "..", "public", "views", "code-bin", "codebin.ejs"),
    {
      projectName,
    }
  );
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  if (id.length > 5) return;

  const data = await bins.findOne({ ID: "owner" });
  if (!data) return res.redirect("/?error=invalid_code");

  const findChat = data.Bins.find((bin) => bin.id == id);
  if (!findChat) return res.redirect("/?error=invalid_code");

  const { title, description, code } = findChat;

  res.render(
    path.join(__dirname, "..", "public", "views", "code-bin", "bin.ejs"),
    {
      projectName,
      title,
      description,
      code,
    }
  );
});

async function addBin(title, description, code) {
  let id = createCode();

  const data = await bins.findOne({ ID: "owner" });
  if (!data) {
    const newData = await bins.create({
      ID: "owner",
      Bins: [{ title, description, code, id }],
    });

    newData.save();
  } else {
    data.Bins.push({ title, description, code, id });
    data.save();
  }
  return id;
}

function createCode() {
  let length = 5;
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = router;
