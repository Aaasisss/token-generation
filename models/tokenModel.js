const mongoose = require("mongoose");

//initialize both dates
const date = new Date();
const extendedDate = new Date();

//get current day of the current month
const currentDate = extendedDate.getDate();
const extendDay = 21;

//set extendedDate by adding extra days
extendedDate.setDate(currentDate + extendDay);

const tokenSchema = new mongoose.Schema({
  token_name: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    required: true,
    default: date,
  },
  expire_date: {
    type: Date,
    required: true,
    default: extendedDate,
  },
  is_valid: {
    type: Boolean,
    required: true,
    default: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
