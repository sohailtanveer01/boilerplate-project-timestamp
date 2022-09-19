// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/:date?", function(req,res){
  let date = new Date();

    // Check if the optional date parameter was provided
    if (req.params.date) {
        // Convert the date parameter to a string
        let unixDate = +req.params.date;

        // Check if the date passed is unix time. If it's not, use the date string provided
        date = isNaN(unixDate) ? new Date(req.params.date) : new Date(unixDate);

        // Check if the date created is valid. Throw an error if it's an invalid date
        if (!(date instanceof Date) || isNaN(date.getTime())) return res.json({ error: "Invalid Date" });
    }

    // Return the unix and UTC time
    return res.json({ unix: date.getTime(), utc: date.toUTCString() });
})





//empt date parameter
app.get("/api/", function(req,res){
  const date = new Date()
  const unix = date.getTime()
  const utc = date.toUTCString()
  res.json({
    "unix" : unix,
    "utc" : utc
  })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
