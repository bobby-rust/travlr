const express = require("express");
const router = express.Router();
var { expressjwt: jwt } = require("express-jwt");

const authController = require("../controllers/authentication");
const tripsController = require("../controllers/trips");

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["HS256"],
});

router
    .route("/trips")
    .get(tripsController.getTrips)
    .post(auth, tripsController.tripsAddTrip);

router
    .route("/trips/:tripCode")
    .get(tripsController.getTrip)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);
router.route("/user").get(auth, tripsController.getUser);

module.exports = router;
