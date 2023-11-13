// Import dependencies
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");

// Setup the express server router
const router = express.Router();

// On post
router.post("/login", async (req, res) => {

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
    if (user.rows.length === 0) {
        res.status(400).send({
            ok: false,
            message: "Invalid email or password."
        });
        return;
    }
    console.log(user.rows[0])
    const valid = await bcrypt.compare(req.body.password, user.rows[0].password)
    if (!valid) {
        res.status(400).send({
            ok: false,
            message: "Invalid email or password."
        });
        return;
    }

    const token = jwt.sign({
        id: user._id,
    }, "jwtPrivateKey", { expiresIn: "15m" });

    res.send({
        ok: true,
        token: token
    });
});


router.post("/register", async (req, res) => {
    let valid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
        req.body.password
    );
    if (!valid && !req.body.vulnerable) {
        res.status(400).send({
            ok: false,
            message: "Password must be at least 8 characters long and contain at least one number and one special character."
        });
        return;
    }
    const user = await pool.query("SELECT email FROM users WHERE email = $1", [req.body.email]);
    if (user.rows.length > 0) {
        res.status(400).send({
            ok: false,
            message: "User with that email address already exists."
        });
        return;
    }

    // Hash the password
    console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create the user
    const newUser = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [req.body.email, hashedPassword]);

    // Create the token
    const token = jwt.sign({
        id: newUser._id,
    }, "jwtPrivateKey", { expiresIn: "15m" });

    // Send response
    res.send({
        ok: true,
        token: token
    });
});

// Export the router
module.exports = router;