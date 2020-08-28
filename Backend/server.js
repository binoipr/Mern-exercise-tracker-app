var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  serverSelectionTimeoutMS: 5000,
});

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

const userRouter = require("../Backend/routes/users");
const exerciseRouter = require("../Backend/routes/exercises");

app.use("/users", userRouter);
app.use("/exercises", exerciseRouter);

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
