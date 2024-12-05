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

// POST /api/trips
async function tripsAddTrip(req, res) {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
    });

    const q = await newTrip.save();

    if (!q) {
        return res.status(400).json(q);
    } else {
        return res.status(201).json(q);
    }
}

// PUT /trips/:tripCode Edits an existing trip
async function tripsUpdateTrip(req, res) {
    const q = await Model.findOneAndUpdate(
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
    ).exec();

    if (!q) {
        return res.status(400).json(q);
    } else {
        return res.status(201).json(q);
    }
}

module.exports = { getTrips, getTrip, tripsAddTrip, tripsUpdateTrip };
