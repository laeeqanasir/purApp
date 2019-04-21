var express = require("express");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var purRouter = require("./routes/purRoutes");
const fileRouter = require("./routes/fileRouter");

var app = express();

/*cross origin call allow*/
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "cache-control,X-Requested-With,Content-Type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//setting up middlewares
app.use(logger("dev"));
app.use(express.json()); //for data transfer in JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); //serving the public dir static for CSV files and other resources
app.use(cors());
app.options("*", cors());

// Defining routes & Redirecting them to their sub routes if needed
app.use("/", indexRouter);
app.use("/pur", purRouter);
app.use("/file", fileRouter());

module.exports = app;
// "start": "nodemon --max-old-space-size=4096 ./bin/www"
