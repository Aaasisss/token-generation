require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//initiate connection
mongoose.connect(process.env.MONGO_URI);

//acknowledge connection
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to database"));

const app = express();

//make it json compatible
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

//get users route
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

//get tokens route
const tokensRouter = require("./routes/tokens");
app.use("/tokens", tokensRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
