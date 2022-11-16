const express = require("express");
const Token = require("../models/tokenModel");
const router = express.Router();

//get all the tokens
router.get("/", async (req, res) => {
  try {
    const tokens = await Token.find();
    res.status(200).send({
      status: "200",
      Data: tokens,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get one token with id
router.get("/:id", getToken, async (req, res) => {
  const token = res.token;
  try {
    res.status(200).send({
      status: "200",
      Data: token,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//add a token
router.post("/", async (req, res) => {
  const token = new Token({
    user_id: req.body.user_id,
  });
  try {
    const newToken = await token.save();
    res.status(200).send({
      status: "200",
      Data: newToken,
      message: "token saved successfully.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//modify token details with id
router.put("/:id", getToken, async (req, res) => {
  const token = res.token;
  const { user_id, expire_date, is_valid } = req.body;

  if (user_id) {
    token.user_id = user_id;
  }
  if (expire_date) {
    token.expire_date = expire_date;
  }
  if (is_valid) {
    token.is_valid = is_valid;
  }

  try {
    await token.save();
    res.status(200).send({
      status: "200",
      Data: token,
      message: "token updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete token with id
router.delete("/:id", getToken, async (req, res) => {
  const token = res.token;
  try {
    await token.delete();
    res.status(200).send({
      status: "200",
      Data: token,
      message: "token deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//middleware for getting tokens
async function getToken(req, res, next) {
  const { id } = req.params;
  let token;
  try {
    token = await Token.findById(id);
  } catch (error) {
    res.status(404).json({ message: "Token does not exist." });
  }
  res.token = token;
  next();
}

module.exports = router;
