// var fs = require("fs");
// var trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf-8")).data;
// console.log("TRIPS: ", trips);
//

// GET travel view
const travel = async (req, res) => {
    await fetch("http://localhost:3000/api/trips", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            res.json();
        })
        .then((trips) => {
            let message = null;
            if (!(trips instanceof Array)) {
                message = "API lookup error";
                trips = [];
            } else {
                if (!trips.length) {
                    message = "No trips found";
                }
            }

            res.render("travel", { data: trips });
        })
        .catch((e) => res.status(500).send(e));
};

module.exports = { travel };
