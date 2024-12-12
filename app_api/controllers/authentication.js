const passport = require("passport");
const User = require("../models/user");

const register = async (req, res) => {
    console.log("Register authentication api called");
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields required" });
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    try {
        await user.save();
        const token = user.generateJwt();
        res.status(200).json({ token });
    } catch (err) {
        return res.status(400).json(err);
    }
};

const login = (req, res) => {
    console.log("login authentication api called");
    if (!req.body.email || !req.body.password) {
        console.log("No email or password");
        return res.status(400).json({ message: "All fields required" });
    }
    passport.authenticate("local", (err, user, info) => {
        console.log("Authenticating");
        if (err) {
            console.log("ERROR: ", err);
            return res.status(404).json(err);
        }
        if (user) {
            console.log("User: ", user);
            const token = user.generateJwt();
            res.status(200).json({ token });
        } else {
            console.log("INFO: ", info);
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login,
};
