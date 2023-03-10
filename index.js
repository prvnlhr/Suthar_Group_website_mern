require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookiesParser = require("cookie-parser");
const path = require("path");
const app = express();

app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 9000;


mongoose.set('strictQuery', false);

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database :: MongoDB Cloud"))
  .catch((err) => console.log(err.message));
https: app.use(
  cors({
    origin: ["https://suthargroup.onrender.com", "http://localhost:3000", "http://192.168.158.208:3000"],
    credentials: true,
  })
);

app.use("/", require("./routes/index"));



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html", "client", "build", "index.html"));
  });
}


app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Server running on PORT :: ${PORT}`);
  }
});
