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

app.get(
  "/api/:date?",
  (req, res, next) => {
    //TODO parse time and add time key to req
    try {
      let inputDate;
      req.params.date
        ? (inputDate = new Date(req.params.date))
        : (inputDate = new Date());
      req.utc = inputDate.toUTCString();
      req.unix = inputDate.getTime();
      req.error = "";
    } catch (e) {
      req.error = "invalid date";
    } finally {
      next();
    }
  },
  (req, res) => {
    //TODO use time key from req to send correct time
    req.error == ""
      ? res.json({ unix: req.unix, utc: req.utc })
      : res.json({ error: req.error });
  }
);

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
