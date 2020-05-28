const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("express-flash");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const { json } = require("body-parser");
app.use(json());
app.use(flash());

mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((err) => console.log(err));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./models/user");
require("./models/post");
require("./models/comment");

require("./services/passport");
require("./services/cache");

require("./routes/authRoutes")(app);
require("./routes/postRoutes")(app);
require("./routes/commentRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Listen to 4000"));
