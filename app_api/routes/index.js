const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

router.route("/trips").get(tripsController.getTrips);
router.route("/trips/:tripCode").get(tripsController.getTrip);

module.exports = router;
