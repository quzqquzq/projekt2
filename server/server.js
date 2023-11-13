// Import dependencies
const express = require("express");
const pool = require("./db.js");

// Setup the express server
const app = express();
const port = 5000;

// Import middlewares into express
app.use(express.json({ limit: "100mb" }));

// Import routes
const authRouter = require("./routes/auth");
const messagesRouter = require("./routes/messages");

// Setup all the routes
app.use("/api/messages", messagesRouter);
app.use("/api/auth", authRouter);



// Start the server
app.listen(port, () => {

    console.log(`Server is running on port ${port}.`);

    pool.query("DROP TABLE IF EXISTS users", (err, res) => {
        pool.query("CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)", (err, res) => {
            pool.query("INSERT INTO users (email, password) VALUES ('secret@mail.com', 'secret-password')");
        });
    });


    pool.query("DROP TABLE IF EXISTS messages", (err, res) => {
        pool.query("CREATE TABLE messages (id SERIAL PRIMARY KEY, message VARCHAR(255) NOT NULL)", (err, res) => {
            pool.query("INSERT INTO messages VALUES (1, 'This is not sql injection')");
            pool.query("INSERT INTO messages VALUES (2, 'Hello, wrong sql injection')");
        });
    });
});