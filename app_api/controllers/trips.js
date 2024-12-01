const mongoose = require("mongoose");
const Trip = require("../models/travlr");
const Model = mongoose.model("trips");

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

module.exports = { getTrips, getTrip };
