// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function (req, res) { 
  res.json({"unix":(new Date()).getTime(), "utc": (new Date()).toUTCString()});
});

app.get("/api/timestamp/:date_string", function (req, res) {
  
  if(req.params.date_string.match(/^(\d{4}-\d{2}-\d{2}$)/)){
    let arr = req.params.date_string.split('-');
    if(1 <= arr[1] && arr[1] <= 12 && 1 <= arr[2] && arr[2] <= 31 )
      res.json({"unix":(new Date(req.params.date_string)).getTime(), "utc": (new Date(req.params.date_string)).toUTCString()});
    else
      res.json({"unix": null, "utc" : "Invalid Date" });
  }else if (req.params.date_string.match(/(\d)/)){
    res.json({"unix": (new Date(req.params.date_string*1000)).getTime(), "utc": (new Date(req.params.date_string*1000)).toUTCString()});
  }else{
    res.json({"unix": null, "utc" : "Invalid Date" });
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});