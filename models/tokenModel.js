const mongoose = require("mongoose");
const crypto = require("crypto");

const tokenSchema = new mongoose.model({
  access_token: {
    type: String,
    required: true,
    default: crypto.randomUUID,
  },
  create_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expire_date: {
    type: String,
    required: true,
    default: Date.now,
  },
  is_valid: {
    type: Boolean,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
