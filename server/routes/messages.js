const express = require("express");

// Import middlewares
const auth = require("../middleware/auth");
const pool = require("../db");


// Setup the router for express
const router = express.Router();

// *************************
// Set up the route handlers
// *************************


router.get("/:id", async (req, res) => {
    console.log(req.params.id)
    try {
        const message = await pool.query("SELECT * FROM messages WHERE id = $1", [req.params.id]);
        console.log(message);
        res.send({
            ok: true,
            result: message.rows[0]
        });
    }
    catch (error) {
        res.status(400).send({
            ok: false,
            message: "Invalid message id. Must be an integer."
        });
    }
});


router.get("/vulnerable/:id", async (req, res) => {
    try {
        const query = "SELECT * FROM messages WHERE id = " + req.params.id;
        const message = await pool.query(query);
        res.send({
            ok: true,
            result: message.rows
        });
    }
    catch (error) {
        res.status(400).send({
            ok: false,
            message: "Error in SQL syntax."
        });
    }
});


// Export the router
module.exports = router;