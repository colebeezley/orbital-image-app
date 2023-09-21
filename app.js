const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const session = require("express-session");
const passport = require("passport");

const app = express();

const authRouter = require(__dirname + "/src/routers/authRouter.js");
const profileRouter = require(__dirname + "/src/routers/profileRouter.js");

app.use(morgan("tiny"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
  })
);

require("./src/config/passport.js")(app);

app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.get("/", async (req, res) => {
  const response1 = await axios("https://dog.ceo/api/breeds/image/random");
  // const response2 = await axios("https://dog.ceo/api/breeds/image/random");
  // const response3 = await axios("https://dog.ceo/api/breeds/image/random");
  // const response4 = await axios("https://dog.ceo/api/breeds/image/random");
  res.render("index", {
    img1: response1.data.message,
    img2: response1.data.message,
    img3: response1.data.message,
    img4: response1.data.message,
  });
});

app.listen(3000, () => {
  console.log("listening on http://127.0.0.1:3000");
});
