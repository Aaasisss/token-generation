const express = require("express");
const Token = require("../models/tokenModel");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcrypt");

//get all the tokens
router.get("/", async (req, res) => {
  try {
    const tokens = await Token.find();
    res.status(200).send({
      status: "200",
      data: tokens,
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
      data: token,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//add a token
router.post("/", async (req, res) => {
  const token_name = req.body.token_name;
  const user_id = req.body.user_id;

  let randomUUid = crypto.randomUUID();

  const user_id_15_char = user_id.slice(0, 15);
  const date = String(Date.now());

  //create a token by combining user_id, data and randomUUID
  const raw_token = `${user_id_15_char}.${date}.${randomUUid}`;

  bcrypt.hash(raw_token, 10, async function (err, hashed_token) {
    if (err) {
      res.status(500).json({ message: err.message });
    }

    // create token object to store in DB
    const token = new Token({
      token_name: token_name,
      user_id: user_id,
      access_token: hashed_token,
    });

    try {
      //save the token to DB
      const new_token = await token.save();

      //replace hashed token value to raw_token to send back to user
      new_token.access_token = raw_token;

      res.status(200).send({
        status: "200",
        data: new_token,
        message: "token saved successfully.",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
});

//modify token details with id
router.put("/:id", getToken, async (req, res) => {
  const token = res.token;
  const { token_name, user_id, expire_date, is_valid } = req.body;

  if (token_name) {
    token.token_name = token_name;
  }
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
      data: token,
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
      data: token,
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
