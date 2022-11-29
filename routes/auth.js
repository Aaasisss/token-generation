const express = require("express");
const Token = require("../models/tokenModel");
const User = require("../models/userModel");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post(
  "/token_validation",
  findUserByEmail,
  findTokensByUserId,
  compareToken,
  async (req, res) => {
    //comes from compareToken middlware
    const is_token_valid = res.is_token_valid;

    if (is_token_valid) {
      res.status(200).send({ status: 200, message: "success" });
    } else {
      res.status(401).send({ status: 401, message: "auth failed" });
    }
  }
);

async function findUserByEmail(req, res, next) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.user = user;
    } else {
      return res
        .status(404)
        .send({ status: 404, message: "user does not exist." });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }

  next();
}

async function findTokensByUserId(req, res, next) {
  //comes from findUserByEmail middleware
  const user = res.user;

  try {
    //returns an array of tokens
    //if there are no tokens, it returns an empty array
    const tokens = await Token.find({ user_id: user._id });

    if (tokens.length > 0) {
      res.tokens = tokens;
    } else {
      return res.status(404).send({ status: 404, message: "no tokens found" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }

  next();
}

async function compareToken(req, res, next) {
  const { token } = req.body;

  //comes from findTokensByUserId middleware
  const tokens = res.tokens;

  tokens.map(async ({ access_token }) => {
    const match = bcrypt.compareSync(token, access_token);

    if (match) {
      res.is_token_valid = true;
    }
  });

  next();
}

module.exports = router;
