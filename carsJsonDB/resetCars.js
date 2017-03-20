var path = require("path");
var fs = require("fs-extra");

fs.copy(path.join(__dirname, "carsOrg.json"), path.join(__dirname, "cars.json"), err => {
    console.log("Data was reset");
  });