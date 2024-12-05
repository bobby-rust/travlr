const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

router
    .route("/trips")
    .get(tripsController.getTrips)
    .post(tripsController.tripsAddTrip);
router
    .route("/trips/:tripCode")
    .get(tripsController.getTrip)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;
