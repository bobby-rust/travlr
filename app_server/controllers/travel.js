var fs = require("fs");
var trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf-8")).data;
console.log("TRIPS: ", trips);
// GET travel view
const travel = (req, res) => {
    res.render("travel", { data: trips });
};

module.exports = { travel };
