// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const e = require("express");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Solution
app.get(
  "/api/:date?",
  (req, res, next) => {
    let inputDate;
    let urlDate = req.params.date;
    if (urlDate) {
      if (new Date(urlDate) != "Invalid Date") {
        inputDate = new Date(urlDate);
        req.error = "";
      } else {
        if (new Date(Number(urlDate)) != "Invalid Date") {
          inputDate = new Date(Number(urlDate));
          req.error = "";
        } else {
          req.error = "Invalid Date";
        }
      }
    } else {
      inputDate = new Date();
      req.error = "";
    }
    req.inputDate = inputDate;
    next();
  },
  (req, res) => {
    //TODO use time key from req to send correct time
    req.error == ""
      ? res.json({
          unix: req.inputDate.getTime(),
          utc: req.inputDate.toUTCString(),
        })
      : res.json({ error: req.error });
  }
);

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
