var express = require('express')
var app = express()
var path = require("path");
var fs = require("fs-extra");

fs.copy(path.join(__dirname, "carsJsonDB","carsOrg.json"), path.join(__dirname, "carsJsonDB","cars.json"), err => {
    console.log("Data was reset");
  });

app.use(express.static(__dirname));

app.get("/reset", (req, res) => {

  fs.copy(path.join(__dirname, "carsJsonDB","carsOrg.json"), path.join(__dirname,"carsJsonDB", "cars.json"), err => {
    console.log("Data was reset to original values");
    err ? res.end(500) : res.redirect("/");
  });
});

var PORT = 3000;
app.listen(PORT, function () {
  console.log(`
  #########################################################
  ##                                                     ##
  ## Started Client Server (running on Port: 3000)       ##
  ## Open a browser with the URL: http://localhost:3000/ ##
  ##                                                     ##
  ## Make sure you have started the REST Backend using:  ##
  ## npm run backend (in a separate termimal)            ##
  ##                                                     ##
  ## While testing you can reset data (without restart), ##
  ## using the URL: http://localhost/3000/reset          ##
  ##                                                     ##
  ##              HAPPY TESTING :-)                      ##
  #########################################################
  `)
});