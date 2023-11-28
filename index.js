const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8001;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const coustomMiddleWare = require("./config/middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());

app.use(cookieParser());

//Static file call
app.use(express.static("./assets"));

//Use ejs Layouts for every route or views
app.use(expressLayouts);

//Extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//use View Engine
app.set("view engine", "ejs");
app.set("views", "./views");


//use express router
app.use("/", require("./routes"));

// Listening on port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error to listen: ${err}`);
  }
  console.log(`Express server listening on port: ${port}`);
});

//Fisrt we have to set session then call routes.
