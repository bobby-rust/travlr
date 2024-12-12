const mongoose = require("mongoose");
const Trip = require("../models/travlr");
const Model = mongoose.model("trips");
const User = require("../models/user");

// GET /trips
// returns all trips
async function getTrips(req, res) {
    try {
        const q = await Model.find({}).exec();
        console.log(q);
        return res.status(200).json(q);
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
}

// GET /trips/:tripCode
// returns a single trip identified by tripCode
async function getTrip(req, res) {
    try {
        console.log(req.params.tripCode);
        const trip = await Model.find({ code: req.params.tripCode }).exec();
        console.log(trip);
        return res.status(200).json(trip);
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
}

// POST /api/trips
async function tripsAddTrip(req, res) {
    getUser(req, res, (req, res) => {
        try {
            Trip.create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
            });
            return res.status(200).json({ message: "Trip added" });
        } catch (e) {
            console.error(e);
            return res.status(500).json(e);
        }
    });
}

// PUT /trips/:tripCode Edits an existing trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
            },
            { new: true },
        )
            .then((trip) => {
                if (!trip) {
                    return res.status(404).send({
                        message:
                            "Trip not found with code" + req.params.tripCode,
                    });
                }
                res.send(trip);
            })
            .catch((err) => {
                if (err.kind === "ObjectId") {
                    return res.status(404).send({
                        message:
                            "Trip not found with code" + req.params.tripCode,
                    });
                }
                return res
                    .status(500) // server error
                    .json(err);
            });
    });
};

const tripsDeleteTrip = async (req, res) => {
    console.log("Trips delete trip called");
    getUser(req, res, (req, res) => {
        Trip.findOneAndDelete({ code: req.params.tripCode })
            .then((trip) => {
                if (!trip) {
                    return res.status(404).send({
                        message:
                            "Trip not found with code" + req.params.tripCode,
                    });
                }
                res.send({ message: "Trip deleted successfully!" });
            })
            .catch((err) => {
                if (err.kind === "ObjectId" || err.name === "NotFound") {
                    return res.status(404).send({
                        message:
                            "Trip not found with code" + req.params.tripCode,
                    });
                }
                return res
                    .status(500) // server error
                    .json(err);
            });
    });
};
const getUser = async (req, res, callback) => {
    if (req.auth && req.auth.email) {
        try {
            const user = await User.findOne({ email: req.auth.email }).exec();
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            callback(req, res, user.name);
        } catch (e) {
            console.error(e);
            return res.status(401).json(e);
        }
    } else {
        return res
            .status(400)
            .json({ message: "No payload or no payload email" });
    }
};

module.exports = {
    getTrips,
    getTrip,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip,
    getUser,
};
