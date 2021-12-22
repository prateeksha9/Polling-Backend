const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const db = require("./config/mongoose");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "authentication",
    // TODO change the secret before deployment in production mode
    // secret: env.session_cookies_key,
    secret: `${process.env.secretsession}`,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(express.urlencoded());

app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static("./assets"));

app.use("/", require("./routes"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  // console.log("gidbuhsbvufdhbvuffbsevyue", process.env);
  console.log(`Server is running on port: ${port}`);
});
