const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

//get all user
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({
      status_code: "200",
      data: users,
      message: "success",
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

//get one user
router.get("/:id", getUser, async (req, res) => {
  res.status(200).send({
    status_code: "200",
    data: res.user,
    message: "success",
  });
});

//post user
router.post("/", async (req, res) => {
  const user = new User({
    _id: req.body.user_id,
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const new_user = await user.save();
    res.status(201).send({
      status_code: "201",
      data: new_user,
      message: "Successfully added new user.",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//put user
router.put("/:id", getUser, async (req, res) => {
  const { name, email } = req.body;

  if (name) {
    res.user.name = name;
  }
  if (email) {
    res.user.email = email;
  }

  try {
    const modifiedUser = await res.user.save();
    res.status(200).send({
      status_code: "200",
      data: modifiedUser,
      message: "Successfully updated user.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete user
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.status(200).send({
      status_code: "200",
      data: res.user,
      message: "Successfully deleted user.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//middleware to get user information
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User doesnot exist." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
